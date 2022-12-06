import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeLoginModalState } from "../store";
import './Products.css';

function Products(props) {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    let [reviewAmount, setReviewAmount] = useState(0);
    let [imageThumbnailBoxBottom, setImageThumbnailBoxBottom] = useState(0);
    let [detailIconState, setDetailIconState] = useState("viewDetailsGray.png");
    let [cartIconState, setCartIconState] = useState("shoppingCartGray.png");

    useEffect(() => {
        axios.get("/review/reviewNum", {
            params: {
                productCode: props.fruit.productCode,
            }
        })
            .then((response) => {
                setReviewAmount(response.data)
            })
    }, [props.fruit.productCode])

    const cartOnClick = (e) => {
        e.stopPropagation();
        if (localStorage.getItem("id") !== null) {
            let body = {

                id: localStorage.getItem('id'),
                productCode: props.fruit.productCode,
                amount: 1,
                
            }
            axios.post("/cart/add", body)
            .then((response) => {
            })
            .catch((response) => {
                console.log("장바구니 추가를 실패하였습니다.")
            })
        } else {
            alert("로그인을 해주세요.");
        }
        
    }


    return (
        <div className="container_products" onClick={() => {
            navigate('/product/view/' + props.fruit.productCode)
            sessionStorage.setItem('productCode', props.fruit.productCode)
        }}>
            <div className="imageThumbnailBox">
                <img className="imageThumbnail" src={"http://localhost:8080/pdImages/" + props.fruit.thumbnail} alt=""
                    onMouseEnter={() => { setImageThumbnailBoxBottom(1) }}
                    onMouseLeave={() => { setImageThumbnailBoxBottom(0) }} />
                {
                    imageThumbnailBoxBottom ?
                        <div className="imageThumbnailBoxBottom"
                            onMouseEnter={() => { setImageThumbnailBoxBottom(1) }}
                            onMouseLeave={() => { setImageThumbnailBoxBottom(0) }} >
                            <div className="detailIconImageBox">
                                <img src={"/icons/" + detailIconState} alt=""
                                    className="detailIconImage"
                                    onMouseEnter={() => { setDetailIconState("viewDetailsBrown.png") }}
                                    onMouseLeave={() => { setDetailIconState("viewDetailsGray.png") }} />
                            </div>
                            <div className="cartIconImageBox" onClick={cartOnClick}>
                            <img src={"/icons/" + cartIconState} alt=""
                                    className="cartIconImage"
                                    onMouseEnter={() => { setCartIconState("shoppingCartBrown.png") }}
                                    onMouseLeave={() => { setCartIconState("shoppingCartGray.png") }} />
                            </div>
                        </div>
                        : null
                }
            </div>
            <div className="productName">
                {props.fruit.productName}
            </div>
            <div>
                <span className="productPrice">{props.fruit.price.toLocaleString('ko-KR')}</span>
                <span className="productWon">원</span>
            </div>
            <div className="reviewAmountBox">
                (리뷰 : {reviewAmount}개)
            </div>
        </div>
    )
}

export default Products;