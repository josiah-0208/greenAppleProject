import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeCartTotalReduxStateMinus, changeCartTotalReduxStatePlus, changeCartTotalReduxStateReset } from "../store";
import "./Cart.css";

function Cart() {

    let navigate = useNavigate();

    let reduxState = useSelector((state) => { return state });
    let dispatch = useDispatch();

    let [carts, setCarts] = useState([]);
    let [cartListState, setCartListState] = useState(0);
    const [cartTotalPriceState, setCartTotalPriceState] = useState(0);
    const [cartDetailPriceArr, setCartDetailPriceArr] = useState([]);
    useEffect(() => {
        axios.get("/cart")
            .then((response) => {
                setCarts(response.data);
            })
            .catch((response) => {
                console.log("장바구니 조회 실패")
            })
    }, [cartListState])

    // 데이터를 어떻게 다룰지 정하고

    // const orderOnclick = () => {
    //     // sessionStorage.setItem
    // }

    useEffect(() => {
        dispatch(changeCartTotalReduxStateReset());
    }, [])

    // useEffect(() => {
    //     console.log(reduxState.cartDetailPriceArr)
    //     setCartTotalPriceState(reduxState.cartDetailPriceArr.reduce((acc, cur) => {
    //         return acc + cur;
    //     }))
    // }, [reduxState.cartDetailPriceArr])

    return (
        <div className="container_cart">
            <div className="cartBox">
                <div className="cartTitle">
                    장바구니
                </div>
                <div className="cartTopBar">
                    <div id="cartBarCheck">
                        선택
                    </div>
                    <div id="cartBarImage">
                        이미지
                    </div>
                    <div id="cartBarName">
                        이름
                    </div>
                    <div id="cartBarPrice">
                        가격
                    </div>
                    <div id="cartBarAmount">
                        수량
                    </div>
                    <div id="cartBarTotal">
                        합계
                    </div>
                    <div id="cartBarDelete">
                        삭제
                    </div>
                </div>
                <div className="cartDetailArea">
                    {
                        carts && carts.map((cart, i) => {
                            return (
                                <CartDetail cart={cart} key={cart.cartNo} i={i}
                                    cartListState={cartListState}
                                    setCartListState={setCartListState} />
                            )
                        })

                    }
                </div>
                <div className="cartPageBottomArea">
                    <div className="cartTotalBox">
                        <span id="cartTotalBoxFont">
                            총 합계:
                        </span>
                        <span id="cartTotalBoxPrice">
                            {reduxState.cartTotalReduxState.toLocaleString('ko-KR')}
                        </span>
                        <span id="cartTotalBoxWon">
                            원
                        </span>
                    </div>
                    <div>
                        <button id="cartOrderButton" onClick={() => {
                            console.log(carts)
                            if (carts.length === 0) {
                                alert("장바구니가 비었습니다.")
                            } else {
                                navigate("/order");
                                // 바로구매에 대한 세션스토리지 삭제
                                sessionStorage.removeItem("productCodeNowOrder");
                                sessionStorage.removeItem("amount");
                            }
                        }}>
                            주문하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;


function CartDetail(props) {

    let reduxState = useSelector((state) => { return state });
    let dispatch = useDispatch();

    let [quantity, setQuantity] = useState(props.cart.amount);
    let [semiTotalPrice, setSemiTotalPrice] = useState(props.cart.price * props.cart.amount);
    let [checked, setChecked] = useState(0);

    const [isChecked, setIsChecked] = useState(true);

    const checkboxOnchange = () => {
        if (isChecked === 1 || isChecked === true) {
            setIsChecked(false);
        } else if (isChecked === 0 || isChecked === false) {
            setIsChecked(true);
        }
    }

    useEffect(() => {
        if (isChecked === 1 || isChecked === true) {
            console.log(props.i)
            dispatch(changeCartTotalReduxStatePlus(semiTotalPrice))
            setChecked(1)
            let body = {
                cartNo: props.cart.cartNo,
                amount: quantity,
                checkStatus: 1,
            }
            axios.post("/cart/update", body)
                .then((response) => {
                })
        } else if (isChecked === false) {
            dispatch(changeCartTotalReduxStateMinus(semiTotalPrice))
            let body = {
                cartNo: props.cart.cartNo,
                amount: quantity,
                checkStatus: 0,
            }
            axios.post("/cart/update", body)
                .then((response) => {
                })
        }
    }, [isChecked])

    useEffect(() => {
        setSemiTotalPrice(props.cart.price * quantity)
    }, [quantity, props.cart.price])


    // 수량을 바꿀 때마다 서버에 수량 확정 실행되게,
    const setServerQuantityUp = () => {
        let body = {
            cartNo: props.cart.cartNo,
            amount: quantity + 1,
            checkStatus: checked,
        }
        axios.post("/cart/update", body)
            .then((response) => {
                console.log(response)
            })
    }
    const setServerQuantityDown = () => {
        let body = {
            cartNo: props.cart.cartNo,
            amount: quantity - 1,
            checkStatus: checked,
        }
        axios.post("/cart/update", body)
            .then((response) => {
            })
    }
    const setServerQuantityOne = () => {
        let body = {
            cartNo: props.cart.cartNo,
            amount: 1,
            checkStatus: checked,
        }
        axios.post("/cart/update", body)
            .then((response) => {
            })
    }
    const setServerQuantity = (qunatityEnter) => {
        let body = {
            cartNo: props.cart.cartNo,
            amount: qunatityEnter,
            checkStatus: checked,
        }
        axios.post("/cart/update", body)
            .then((response) => {
            })
    }

    const cartDelete = () => {
        axios.get("/cart/delete", {
            params: {
                cartNo: props.cart.cartNo,
            }
        }
        )
            .then((response) => {
                props.setCartListState(props.cartListState + 1);
                if (isChecked === 1 || isChecked === true) {
                    dispatch(changeCartTotalReduxStateMinus(semiTotalPrice))
                }
            })
    }



    return (
        <div className="conatiner_cartdetail">
            <div className="cartDetailBox">
                <div className="cartDetailCheckBox">
                    <input type="checkbox" checked={isChecked} onChange={checkboxOnchange}
                        id="cartCheckbox" />
                </div>
                <div className="cartDetailFruitImageBox">
                    <img src={"http://localhost:8080/pdImages/" + props.cart.thumbnail} alt="" id="cartDetailFruitImage" />
                </div>
                <div className="cartDetailFruitName">
                    {props.cart.productName}
                </div>
                <div className="cartDetailProductPrice">
                    {props.cart.price.toLocaleString('ko-KR')}원
                </div>
                <div className="cartDetailQuantityBox">
                    <button onClick={(e) => {
                        e.preventDefault();
                        if (quantity > 1) {
                            setQuantity(quantity - 1)
                            document.getElementById("inputQuantity" + props.i).value = quantity - 1;
                            setServerQuantityDown();
                            if (isChecked === true) {
                                dispatch(changeCartTotalReduxStateMinus(props.cart.price))
                            }
                        }
                    }} id="buttonCountDown">-</button>
                    <input type="number" defaultValue={props.cart.amount} onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            if (e.target.value < 0 || e.target.value === "0") {
                                alert("1개 이상 선택해주세요.")
                                setQuantity(1)
                                document.getElementById("inputQuantity" + props.i).value = 1;
                                setServerQuantityOne();
                                dispatch(changeCartTotalReduxStatePlus((1*props.cart.price)-(quantity*props.cart.price)))
                            } else {
                                setQuantity(parseInt(e.target.value))
                                setServerQuantity(e.target.value);
                                if (isChecked === 1 || isChecked === true) {
                                    console.log(e.target.value*props.cart.price)
                                    console.log(quantity*props.cart.price)
                                    dispatch(changeCartTotalReduxStatePlus((e.target.value*props.cart.price)-(quantity*props.cart.price)))
                                }
                            }
                        }
                    }} min="0" id={"inputQuantity" + props.i} className="cartInputQuantity" />
                    <button onClick={(e) => {
                        e.preventDefault();
                        setQuantity(quantity + 1)
                        document.getElementById("inputQuantity" + props.i).value = quantity + 1;
                        setServerQuantityUp();
                        if (isChecked === true) {
                            dispatch(changeCartTotalReduxStatePlus(props.cart.price))
                        }
                    }} id="buttonCountUp">+</button>
                </div>
                <div className="cartDetailSemiTotalPrice">
                    {isNaN(parseInt(semiTotalPrice)) ? 0 : semiTotalPrice.toLocaleString('ko-KR')}원
                </div>
                <div className="cartDeleteImageBox" onClick={cartDelete}>
                    <img src="/icons/trashBin.png" alt="" id="cartDeleteImage" />
                </div>

            </div>
        </div>
    )
}