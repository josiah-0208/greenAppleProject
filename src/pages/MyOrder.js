import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./MyOrder.css";

function MyOrder() {

    return (
        <div className="container_myorder">
            <div className="myOrderBox">
                <div className="myOrderTtile">
                    주문내역
                </div>
                <div>
                    <MyorderObject />
                </div>

            </div>
        </div>
    )
}

export default MyOrder;

function MyorderObject() {

    let [orderList, setOrderList] = useState([]);
    let [orderListState, setOrderListState] = useState(0);

    useEffect(() => {
        axios.post("/order/orderList")
            .then((response) => {
                const reverse = response.data.reverse();
                setOrderList(reverse);
            })
    }, [orderListState])

    return (
        <div className="container_myorderobject">
            <div className="myOrderObjectBox">
                {
                    orderList.map((order, i) => {
                        return (
                            <MyorderDetail order={order} key={order.orderId}
                                orderListState={orderListState}
                                setOrderListState={setOrderListState} />
                        )
                    })
                }
            </div>
        </div>
    )
}

function MyorderDetail(props) {

    const [closeList, setCloseList] = useState(false); // 열고 닫는 스위치
    const listRef = useRef(null); // ref로 특정 DOM에 접근

    let [orderDetailList, setOrderDetailList] = useState([]);

    // 오더 들어온거로 오더 리스트 받기
    useEffect(() => {

        listRef.current.style.maxHeight = "0";

        axios.post("/order/orderDetailList", props.order)
            .then((response) => {
                setOrderDetailList(response.data);
            })

    }, [props.order])

    // 클릭시 실행되는 함수
    function foldList() {
        if (!listRef || !listRef.current) {
            return;
        } // useRef 변수가 비었을 때 그냥 리턴하도록 예외처리

        const style = listRef.current.style; // 접근할 DOM요소의 스타일 속성을 미리 선언

        if (closeList) {                        // closeAllList 상태변수가 true 일 때 
            style.maxHeight = "0";              // maxHeight 는 0이 되고 접힌다.
        } else if (!closeList) {                // closeAllList 상태변수가 false 면 
            style.maxHeight = `${listRef.current.scrollHeight}px`;  // maxHeight = scroll 길이가 되고 메뉴가 열린다.
        }
        setCloseList(!closeList);                   // 클릭할 때마다 상태를 반대로 바꾼다.
    }

    return (
        <div className="myOrderObjectContainer">
            <div className="myOrderObjectContainerTop">
                <div className="myOrderObjectContainerRealTop">
                    {props.order.orderDate}
                    <div className={`${closeList ? "close" : "open"}`} onClick={foldList}>
                        <img src="/icons/directionDown.png"
                            id="myOrderToggleButton" alt="" />
                    </div>
                </div>
                <div className="orderDetailState" ref={listRef}>
                    {/* ref로 지정해주면 직접 이 요소에 접근한다. */}
                    <OrderDetailDescribe order={props.order}
                        orderListState={props.orderListState}
                        setOrderListState={props.setOrderListState}
                        orderDetailList={orderDetailList} />
                </div>
            </div>
            {
                orderDetailList.map((orderDetail, i) => {
                    return (
                        <MyorderDetailObject orderDetail={orderDetail}
                            order={props.order} key={orderDetail.detailNo} />
                    )
                })
            }
        </div>

    )
}

function MyorderDetailObject(props) {

    let [fruit, setFruit] = useState({});
    console.log(props.order)

    useEffect(() => {
        axios.get("/product/view/" + props.orderDetail.productCode)
            .then((response) => {
                setFruit(response.data)
            })
    }, [])

    return (
        <div className="container_myorderdetail">
            <div className="myOrderDetailBox">
                <div className="myOrderDetailTop">
                    <div className="myOrderDetailImageBox">
                        <img src={"/fruits/" + fruit.thumbnail} alt="" id="myOrderDetailImage" />
                    </div>
                </div>
                <div className="myOrderDetailMiddle">
                    <div className="myOrderDetailName">
                        {fruit.productName}
                    </div>
                    <div className="myOrderDetailMiddleBottom">
                        <div className="myOrderDetailPrice">
                            {(props.orderDetail.price * props.orderDetail.amount).toLocaleString('ko-KR')}원
                        </div>
                        <div className="myOrderDetailAmount">
                            {props.orderDetail.amount}개
                        </div>
                    </div>
                </div>
                <div className="myOrderDetailBottom">
                    <div className="myOrderDetailState">
                        {(props.order.orderDel === "y") ? "취소완료" : "결제완료"}
                    </div>
                </div>
            </div>
        </div>
    )
}

function OrderDetailDescribe(props) {

    console.log(props.order.orderDel)
    const onClickOrderDetail = (e) => {
        e.preventDefault();
        if (window.confirm("정말로 주문을 취소하시겠습니까?")) {
            axios.post("/order/orderDelete", props.order)
                .then((response) => {
                    props.setOrderListState(props.orderListState + 1);
                })
        }

    }

    return (
        <div className="container_orderdetaildescribe">
            <div className="orderDetailDescribeBox">
                <div className="orderDetailDescribeTop">
                    <div className="orderDetailDescribeTopTitle">
                        ORDERID:&nbsp;
                    </div>
                    <div className="orderDetailDescribeTopOrderId">
                        {props.order.orderId}
                    </div>
                </div>
                <div className="orderDetailDescribeMiddle">
                    <div className="orderDetailDescribeFirstArea">
                        <div className="orderDetailDescribeOrderNameBox">
                            <div className="orderDetailDescribeOrderNameTitle">
                                수령인:&nbsp;
                            </div>
                            <div className="orderDetailDescribeOrderName">
                                {props.order.recipient}
                            </div>
                        </div>
                        <div className="orderDetailDescribeTelBox">
                            <div className="orderDetailDescribeTelTitle">
                                연락처:&nbsp;
                            </div>
                            <div className="orderDetailDescribeTel">
                                {props.order.recipientTel}
                            </div>
                        </div>
                        <div className="orderDetailDescribeAddressBox">
                            <div className="orderDetailDescribeAddressTitle">
                                배송지 주소:&nbsp;
                            </div>
                            <div className="orderDetailDescribeAddress">
                                {props.order.address1}
                            </div>
                        </div>
                        <div className="orderDetailDescribeMemoBox">
                            <div className="orderDetailDescribeMemoTitle">
                                요청사항:&nbsp;
                            </div>
                            <div className="orderDetailDescribeMemo">
                                {props.order.orderMemo}
                            </div>
                        </div>
                    </div>
                    <div className="orderDetailDescribeSecondArea" >
                        <div className="orderDetailDescribeAmountBox" >
                            <div className="orderDetailDescribeAmountTitle" >
                                주문건수:&nbsp;
                            </div>
                            <div className="orderDetailDescribeAmount">
                                {props.orderDetailList.length}개
                            </div>
                        </div>
                        <div className="orderDetailDescribePayMoneyBox">
                            <div className="orderDetailDescribePayMoneyTitle">
                                결제금액:&nbsp;
                            </div>
                            <div className="orderDetailDescribePayMoney">
                                {props.order.payMoney.toLocaleString('ko-KR')}원
                            </div>
                        </div>
                    </div>
                    <div className="orderDetailDescribeThirdArea">
                        {
                            props.order.orderDel !== "y" ?
                                <div className="orderDetailDescribeDeleteBox">
                                    <button className="orderDetailDescribeDeleteButton" onClick={onClickOrderDetail}>
                                        주문취소
                                    </button>
                                </div> : "취소완료"
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}