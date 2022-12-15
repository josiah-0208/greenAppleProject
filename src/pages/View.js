import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeLoginModalState, changeReviewId, changeReviewListState, changeUpdateReviewText, changeUpdateWatched } from "../store";
import './View.css';

function View() {

    let reduxstate = useSelector((state) => { return state })
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState("");
    const [viewBottomState, setViewBottomState] = useState(1);
    const [boderBottomState1, setBorderBottomState1] = useState("none");
    const [boderBottomState2, setBorderBottomState2] = useState("none");
    const [productPrice, setProductPrice] = useState("");
    let [reviewAmount, setReviewAmount] = useState(0);
    console.log(product);
    useEffect(() => {
        axios.get("/product/view/" + sessionStorage.getItem("productCode"))
            .then((response) => {
                console.log(response.data)
                setProduct(response.data)
                setProductPrice(response.data.price.toLocaleString('ko-KR'));
                // 최근 본상품
                let watched = sessionStorage.getItem('watched');
                watched = JSON.parse(watched);
                watched.unshift(response.data.productCode);
                watched = new Set(watched); // set으로 중복 제거
                watched = Array.from(watched);
                if (watched.length > 3) {
                    watched.splice(watched.length - 1);
                }
                sessionStorage.setItem('watched', JSON.stringify(watched));
                dispatch(changeUpdateWatched(reduxstate.updateWatched + 1))
                // 리뷰 개수 호출
                axios.get("/review/reviewNum", {
                    params: {
                        productCode: response.data.productCode,
                    }
                })
                    .then((response) => {
                        setReviewAmount(response.data)
                    })
            })
    }, [reduxstate.watchedState])


    useEffect(() => {
        setTotalPrice((quantity * product.price).toLocaleString('ko-KR'))
    }, [quantity, product.price])

    useEffect(() => {
        if (viewBottomState === 0) {
            setBorderBottomState1("1.1px solid gray")
            setBorderBottomState2("none")
        } else if (viewBottomState === 1) {
            setBorderBottomState1("none")
            setBorderBottomState2("1.1px solid gray")
        }
    }, [viewBottomState])

    // 처음에 데이터가 없어서 실행안되게 하려했는데 totalprice를 준 이유는
    // product를 주면 빈 배열일 때 걸러내는게 어려워서
    useEffect(() => {
        if (totalPrice !== "") {
            axios.get("/review/reviewNum", {
                params: {
                    productCode: product.productCode,
                }
            })
                .then((response) => {
                    setReviewAmount(response.data)
                })
        }
    }, [reduxstate.reviewListState])


    const onCartSubmit = (e) => {

        e.preventDefault();
        // 로그인 상태가 아니면 눌렀을 때 로그인 모달 띄우게
        if (localStorage.getItem("id") !== null) {
            let body = {

                id: localStorage.getItem('id'),
                productCode: product.productCode,
                amount: quantity,

            }
            axios.post("/cart/add", body)
                .then((response) => {
                    console.log(response.data);
                })
                .catch((response) => {
                    console.log("장바구니 추가를 실패하였습니다.")
                })
        } else {
            alert("로그인을 해주세요.")
        }

    }

    const onNowOrder = (e) => {
        e.preventDefault();
        if (localStorage.getItem("id") !== null) {
            sessionStorage.setItem("productCodeNowOrder", product.productCode);
            sessionStorage.setItem("amount", quantity);
            navigate("/order");
        } else {
            alert("로그인을 해주세요.")
        }
    }


    return (
        <div className="container_view">
            <div className="viewTop">
                <div className="titleImageBox">
                    <img src={"http://13.124.91.28:8080/pdImages/" + product.thumbnail} alt="" id="titleImage" />
                </div>
                <div className="detailOrderBox">
                    <div className="orderBoxReviewCount">
                        상품평: {reviewAmount} 개
                    </div>
                    <div className="orderBoxProductName">
                        {product.productName}
                    </div>
                    <div className="orderBoxOrigin">
                        원산지: {product.origin}
                    </div>
                    <div className="orderBoxPriceBox">
                        <span className="orderBoxPrice">
                            {productPrice}
                        </span>
                        <span className="orderBoxWon">
                            원
                        </span>
                    </div>
                    <div className="orderBoxDelivery">
                        배송정보: 무료배송
                    </div>
                    <div className="orderCountBox">
                        <div className="orderCountBoxProductName">
                            {product.productName}
                        </div>
                        <div className="orderBoxMiddle">
                            <div className="countBox">
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    if (quantity > 1) {
                                        setQuantity(quantity - 1)
                                        document.getElementById("inputQuantity").value = quantity - 1
                                    }
                                }} id="buttonCountDown">-</button>
                                <input type="number" defaultValue={quantity} onChange={(e) => {
                                    if (e.target.value < 0 || e.target.value === "0") {
                                        alert("1개 이상 선택해주세요.")
                                        setQuantity(1)
                                        document.getElementById("inputQuantity").value = 1;
                                    } else if (e.target.value > product.stock) {
                                        alert(`'${product.productName}' 상품의 재고는 '${product.stock}'개 입니다.`)
                                        setQuantity(1);
                                        document.getElementById("inputQuantity").value = 1;
                                    } else {
                                        setQuantity(parseInt(e.target.value))
                                    }
                                }} min="0" id="inputQuantity" />
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    if (product.stock > quantity) {
                                        setQuantity(parseInt(quantity) + 1)
                                        document.getElementById("inputQuantity").value = quantity + 1
                                    } else {
                                        alert(`'${product.productName}' 상품의 재고는 '${product.stock}'개 입니다.`)
                                    }
                                }} id="buttonCountUp">+</button>
                            </div>
                            <div className="orderBoxTotalBox">
                                합계: <span id="orderBoxTotal">{isNaN(parseInt(totalPrice)) ? 0 : totalPrice}</span>
                                <span id="orderBoxTotalWon">원</span>
                            </div>
                        </div>
                    </div>
                    <div className="orderBoxBottomButton">
                        <button className="orderBoxCartButton" onClick={onCartSubmit}>
                            장바구니
                        </button>
                        <button className="orderBoxPaymentButton" onClick={onNowOrder}>
                            바로구매
                        </button>
                    </div>
                </div>
            </div>
            <div className="viewBottom" >
                <div className="viewBottomTopButtonBox">
                    <button onClick={() => {
                        setViewBottomState(1)
                    }} id="productDetailButton" style={{ borderBottom: boderBottomState1 }}>
                        상세정보
                    </button>
                    <button onClick={() => {
                        setViewBottomState(0)
                    }} id="productReviewButton" style={{ borderBottom: boderBottomState2 }}>
                        상품평
                    </button>
                </div>
                {
                    viewBottomState ? <ProductDetail productDescription={product.productDescription}
                        fileName={product.fileName} />
                        : <Review productCode={product.productCode} />
                }
            </div>
        </div>
    )
}

export default View;

function ProductDetail(props) {
    return (
        <div className="container_productdetail">
            <div className="productDetailTitle">
                상품상세정보
            </div>
            <div className="productDetailImgBox">
                <img className="productDetailImg"
                    src={"/icons/deliveryInformation.jpg"} />
            </div>
            <div className="productDetailImgBox">
                <img className="productDetailImg"
                    src={"http://13.124.91.28:8080/pdImages/" + props.fileName} />
            </div>
            <div className="productDetailDescription">
                {props.productDescription}
            </div>
        </div>
    )
}

function Review(props) {

    const [productReviews, setProductReviews] = useState([]);
    const [reviewListOnChange, setReviewListOnChange] = useState(0);
    const [updateState, setUpdateState] = useState(1);

    useEffect(() => {
        axios.get("/review/list/" + props.productCode, {
            params: {
                productCode: props.productCode,
            }
        })
            .then((response) => {
                setProductReviews(response.data)
            })
            .catch(() => {
                console.log("리뷰 로드 실패")
            })
    }, [reviewListOnChange, props.productCode])

    return (
        <div className="container_review">
            <div>
                <ImageFile productCode={props.productCode}
                    setReviewListOnChange={setReviewListOnChange} reviewListOnChange={reviewListOnChange}
                    updateState={updateState} />
            </div>
            <div className="reviewExpressionArea">
                {
                    productReviews && productReviews.map((review, i) => {
                        return (
                            <ReviewExpression review={review} key={review.reviewId}
                                reviewListOnChange={reviewListOnChange}
                                setReviewListOnChange={setReviewListOnChange}
                                setUpdateState={setUpdateState} />
                        )
                    })
                }
            </div>
        </div>
    )
}


function ImageFile(props) {

    let reduxstate = useSelector((state) => { return state })
    let dispatch = useDispatch();
    const inputTag = useRef();
    let [fileImage, setFileImage] = useState("/icons/previewPhoto.png");

    useEffect(() => {
        dispatch(changeUpdateReviewText(""));
    }, [dispatch])

    const previewImage = (e) => {

        if (!e.target.files) {
            return;
        }

        setFileImage(URL.createObjectURL(e.target.files[0]));

    }

    const buttonImageUpload = () => {
        if (localStorage.getItem("id") === null) {
            alert("로그인을 해주세요.")
        } else {
            inputTag.current.click();
        }

    }

    const onSubmit = (e) => {

        e.preventDefault();
        if (props.updateState === 1) {

            let formData = new FormData();
            for (let i = 0; i < e.target.imageInput.files.length; i++) {
                formData.append("files", e.target.imageInput.files[i]);
            }
            formData.append("productCode", props.productCode);
            formData.append("content", reduxstate.updateReviewText);

            axios({
                url: '/review/insert',
                method: "POST",
                mode: "cors",
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(response => {
                    console.log(response.data);
                    if (response.data === 1 || response.data === 2) {
                        dispatch(changeUpdateReviewText(""));
                        setFileImage("/icons/previewPhoto.png");
                        document.getElementById("reviewTextInput").value = ""
                        setTimeout(() => {
                            props.setReviewListOnChange(props.reviewListOnChange + 1);
                        }, 500)
                        // props.setReviewListOnChange(props.reviewListOnChange + 1);
                        // dispatch(changeReviewListState(!reduxstate.reviewListState));
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        } else if (props.updateState === 0) {

            let formData = new FormData();
            for (let i = 0; i < e.target.imageInput.files.length; i++) {
                formData.append("files", e.target.imageInput.files[i]);
            }
            formData.append("productCode", props.productCode);
            formData.append("content", reduxstate.updateReviewText);
            formData.append("reviewId", reduxstate.updateReviewId);
            console.log(formData);

            axios({
                url: '/review/update',
                method: "POST",
                mode: "cors",
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                console.log("responsedata" + response.data)
                if (response.data === 1 || response.data === 2) {
                    dispatch(changeUpdateReviewText(""));
                    setFileImage("/icons/previewPhoto.png");
                    document.getElementById("reviewTextInput").value = ""
                    setTimeout(() => {
                        props.setReviewListOnChange(props.reviewListOnChange + 1);
                    }, 500)
                    dispatch(changeReviewId(""));
                    // dispatch(changeReviewListState(!reduxstate.reviewListState))
                }
            })
                .catch(error => {
                    console.error(error);
                })
        }
    }

    return (
        <div>
            <div className="insertReviewBox">
                <div className="insertReviewImageAndButtonBox">
                    <div className="insertReviewImageBox">
                        <img src={fileImage} alt="sample" className="insertReviewImage" />
                    </div>
                    <div>
                        <img src="/icons/research.png" alt="" id="researchIcon" />
                        <button onClick={buttonImageUpload} id="imageUploadButton">업로드</button>
                    </div>
                </div>
                <form onSubmit={onSubmit} className="insertReviewForm">
                    <input type="file" style={{ display: "none" }} ref={inputTag}
                        name="imageInput" onChange={previewImage} multiple />
                    <textarea type="text" placeholder="짧은 한마디를 남겨주세요." required
                        onClick={() => {
                            if (localStorage.getItem("id") === null) {
                                alert("로그인을 해주세요.")
                            }
                        }}
                        onChange={(e) => {
                            dispatch(changeUpdateReviewText(e.target.value));
                        }} id="reviewTextInput" />
                    <button type="submit" id="reviewSubmitButton" onClick={() => {
                        if (localStorage.getItem("id") === null) {
                            alert("로그인을 해주세요.")
                        }
                    }}>남기기</button>
                </form>

            </div>

        </div>
    )
}


function ReviewExpression(props) {

    let reduxstate = useSelector((state) => { return state })
    let dispatch = useDispatch();
    const [userChkState, setUserChkState] = useState(0);

    useEffect(() => {
        if (localStorage.getItem('id') === props.review.id) {
            setUserChkState(1)
        } else {
            setUserChkState(0)
        }
    }, [props.review.id])

    return (
        <div className="container_reviewexpression">
            <div className="reviewExpressionLeftArea">
                <div className="reviewExpressionReviewId">{props.review.id}</div>
                <div className="reviewExpressionReviewDate">{props.review.reviewDate}</div>
                <div className="reviewImageBox">
                    <img src={props.review.fileName === "" || props.review.fileName === "n"
                        ? "/icons/userIcon_Bear.png" :
                        "http://13.124.91.28:8080/rvImages/" + props.review.fileName} alt=""
                        id="reviewImages"></img>
                </div>
            </div>
            <div className="reviewExpressionContent">
                {props.review.content}
            </div>
            {
                userChkState ?
                    <div className="userChkArea">
                        <div className="reviewExpressionUpdateBox" onClick={() => {
                            props.setUpdateState(0);
                            console.log(props.review.reviewId)
                            document.getElementById("reviewTextInput").value = props.review.content;
                            dispatch(changeUpdateReviewText(props.review.content));
                            dispatch(changeReviewId(props.review.reviewId + ""));
                            window.scrollTo({ top: 650, left: 0, behavior: 'smooth' });

                        }} >
                            수정
                        </div>
                        <div className="reviewExpressiondeleteBox" onClick={() => {
                            if (window.confirm("정말 삭제하시겠습니까?")) {
                                axios.get("/review/delete", {
                                    params: {
                                        reviewId: props.review.reviewId,
                                    }
                                })
                                    .then((response) => {
                                        if (response.data === 1) {
                                            props.setReviewListOnChange(props.reviewListOnChange + 1);
                                            dispatch(changeReviewListState(!reduxstate.reviewListState));
                                        }
                                    })
                            }

                        }}>
                            <img src="/icons/trashBin.png" alt="" id="trashBinIcon" />
                        </div>
                    </div>
                    : null
            }

        </div>
    )
}


