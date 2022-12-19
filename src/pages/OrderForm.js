import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeOrderFormTotalPrice, changeOrderFormTotalPricePlus, changeOrderFormTotalPriceReset } from "../store";
import { PostPopUp } from "./Join";
import "./OrderForm.css";

function OrderForm() {


    let reduxState = useSelector((state) => { return state });
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let [carts, setCarts] = useState([]);
    let [detailList, setDetailList] = useState([]);
    let [member, setMember] = useState({});
    let [name, setName] = useState("");
    let [tel, setTel] = useState("");
    let [email, setEmail] = useState("");
    let [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    let [memo, setMemo] = useState("");
    let [postPopUpState, setPostPopUpState] = useState(false);


    useEffect(() => {
        dispatch(changeOrderFormTotalPriceReset(0));
    }, [])

    // 처음에 로컬스토리지 아이디를 보내서 세션에 있는 멤버정보 받기
    useEffect(() => {

        // 멤버 정보 불러오기
        axios.get("/member/information", {
            params: {
                id: localStorage.getItem('id')
            }
        })
            .then((response) => {
                setMember(response.data);
                setTel(response.data.tel);
                setAddress1(response.data.address1);
                setAddress2(response.data.address2);
            })

        let body = {
            productCode: sessionStorage.getItem("productCodeNowOrder"),
            amount: sessionStorage.getItem("amount"),
        }
        // 세션스토리지에 수량에 관한 정보가 없으면 일반적으로 카트 불러오는 실행
        if (sessionStorage.getItem("amount") === null || sessionStorage.getItem("amount") === undefined) {
            axios.get("/cart/orderWish")
                .then((response) => {
                    setDetailList(response.data);
                    setCarts(response.data);
                })
        } else {
            axios.post("/product/nowOrder", body)
                .then((response) => {
                    let cart = response.data;
                    setDetailList([cart]);
                    setCarts([cart]);
                })
        }
    }, [])
    // 핸드폰 번호 하이픈(-) 달기
    useEffect(() => {
        if (tel.length === 10) {
            setTel(tel.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3'));
        }
        if (tel.length === 13) {
            setTel(tel.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }, [tel]);

    // pay먼트에서 결제를 성공하면 실행시킬 서버에 post 함수
    const paymentSuccess = () => {
        if (name === "") {
            name = member.name;
        }
        let body = {
            detailList: detailList,
            recipient: name,
            recipientTel: tel,
            address1: address1,
            address2: address2,
            orderMemo: memo,
            payment: "success",
            payMoney: reduxState.orderFormTotalPrice,
        }
        axios.post("/order/orderInsert", body)
            .then((response) => {
                navigate("/myOrder");
            })
    }


    return (
        <div className="container_orderform">
            <div className="orderFormBox">
                <div className="orderFormTopAndMiddle">
                    <div className="orderFormTop">
                        <div className="orderCartTitle">
                            주문서
                        </div>
                        <div className="orderCartCategory">
                            <div className="orderCartCategoryDetail">
                                상품정보
                            </div>
                            <div className="orderCartCategoryPrice">
                                개당가격
                            </div>
                            <div className="orderCartCategoryAmount">
                                수량
                            </div>
                            <div className="orderCartCategoryTotalPrice">
                                상품금액
                            </div>
                        </div>
                        <div className="orderList">
                            {
                                carts && carts.map((cart, i) => {
                                    return (
                                        <CartDetailOrder cart={cart} key={cart.cartNo} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="orderFormMiddle">
                        <div className="orderMemberTitle">
                            배송지정보
                            {
                                postPopUpState &&
                                <div>
                                    <PostPopUp setPostPopUpState={setPostPopUpState}
                                        postPopUpState={postPopUpState} setAddr={setAddress1} />
                                </div>
                            }
                        </div>
                        <div className="orderMemberNameBox">
                            <div className="orderMemberName">
                                수령인
                            </div>
                            <input type="text" defaultValue={member.name} onChange={(e) => {
                                setName(e.target.value)
                            }} id="orderMemberNameInput" />
                        </div>
                        <div className="orderTelEmailBox">
                            <div className="orderMemberTelBox">
                                <div className="orderMemberTel">
                                    연락처
                                </div>
                                <input type="text" value={tel} onChange={(e) => {
                                    const regex = /^[0-9\b -]{0,13}$/;
                                    if (regex.test(e.target.value)) {
                                        setTel(e.target.value);
                                    }
                                }} required id="orderMemberTelInput" />
                            </div>
                        </div>
                        <div className="orderMemberAddressBox">
                            <div>
                                <div className="orderMemberAddressBoxTop">
                                    <div className="orderMemberAddress">
                                        배송지 주소
                                    </div>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        setPostPopUpState(!postPopUpState);
                                    }} id="postSearchButtonOrderForm">주소 검색</button>
                                </div>
                                <div className="orderMemberAddressBoxBottom">
                                    <input type="text" value={address1 || ""} onChange={(e) => {
                                        setAddress1(e.target.value)
                                    }} required id="orderMemberAddressInput" />
                                </div>
                            </div>
                            <div className="orderMemberAddressRight">
                                <div className="orderMemberAddress2">
                                    상세 주소
                                </div>
                                <div className="orderMemberAddressBoxBottom2">
                                    <input type="text" value={address2 || ""} onChange={(e) => {
                                        setAddress2(e.target.value)
                                    }} id="orderMemberAddressInput2" />
                                </div>
                            </div>

                        </div>
                        <div className="orderMemoBox">
                            <div className="orderMemo">
                                배송 메모
                            </div>
                            <input type="text" onChange={(e) => {
                                setMemo(e.target.value)
                            }} placeholder="요청사항을 남겨주세요." id="orderMemoInput" />
                        </div>
                    </div>
                </div>
                <div className="orderFormBottom">
                    <div className="orderPaymentTitle">
                        결제상세
                    </div>
                    <div className="orderPaymentTotalBox">
                        <div>
                            주문금액
                        </div>
                        <div style={{ display: "flex" }}>
                            <div className="orderPaymentTotal">
                                {reduxState.orderFormTotalPrice.toLocaleString('ko-KR')}
                            </div>
                            <div>
                                원
                            </div>
                        </div>
                    </div>
                    <div className="orderPaymentDetailbox">
                        <div className="orderPaymentProductPriceBox">
                            <div className="orderPaymentProductPriceTitle">
                                상품금액
                            </div>
                            <div className="orderPaymentProductPrice">
                                {reduxState.orderFormTotalPrice.toLocaleString('ko-KR')}
                            </div>
                            <div className="orderPaymentProductPriceWon">원
                            </div>
                        </div>
                        <div className="orderPaymentExpressBox">
                            <div className="orderPaymentExpress">
                                배송비
                            </div>
                            <div className="orderPaymentExpressPrice">
                                0
                            </div>
                            <div className="orderPaymentExpressWon">
                                원
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                    <div>
                        <Payment carts={carts} paymentSuccess={paymentSuccess} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function CartDetailOrder(props) {

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeOrderFormTotalPricePlus(props.cart.amount * props.cart.price))
    }, [])

    return (
        <div className="container_cartdetailorder">
            <div className="cartDetailBoxOrder">
                <div className="cartDetailImageBoxOrder">
                    <img src={"http://13.124.91.28:8080/pdImages/" + props.cart.thumbnail} alt="" id="cartDetailImageOrder" />
                </div>
                <div className="cartDetailProductNameOrder">
                    {props.cart.productName}
                </div>
                <div className="cartDetailPriceOrder">
                    {props.cart.price.toLocaleString('ko-KR')}원
                </div>
                <div className="cartDetailAmountOrder">
                    {props.cart.amount}
                </div>
                <div style={{ display: "flex" }}>
                    <div className="cartDetailTotalOrder">
                        {(props.cart.amount * props.cart.price).toLocaleString('ko-KR')}
                    </div>
                    원
                </div>
            </div>
        </div>
    )
}

function Payment(props) {

    // 스크립트 언어 추가하는 것 같은데, 더 공부해보기
    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js"
        document.head.appendChild(jquery); document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        }
    }, []);

    // 가맹점 식별하는 함수
    const onClickPayment = () => {
        const { IMP } = window;
        IMP.init("imp71420700");
        const data = {
            pg: "html5_inicis",
            pay_method: "card",
            marchant_uid: "test" + new Date().getTime(),
            name: props.carts[0].productName + " 외 상품",
            amount: 101,
            buyer_name: "이현수",
            buyer_tel: "010-6711-8939",
            buyer_email: "rkeldjs224@naver.com",
            buyer_addr: "서울특별시 서초구 우면동 양재대로 2길 33",
        };
        IMP.request_pay(data, callback)
    }
    // request_pay에 콜백하는 함수
    const callback = (response) => {
        if (response.success) {
            props.paymentSuccess();
        } else {
        }
    }

    return (
        <div>
            <button id="orderPaymentButton" onClick={onClickPayment}>결제하기</button>
        </div>
    )

}

export default OrderForm;