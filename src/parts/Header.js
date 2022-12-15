import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import LoginPage from "./../pages/LoginPage.js"
import axios from "axios";
import { changeHeaderOnClickState, changeKeyword, changeLoginModalState, changeLoginState, changeSearchEnterState } from "../store";

function Header(props) {
    let navigate = useNavigate();
    let reduxState = useSelector((state) => { return state });
    let dispatch = useDispatch();
    const [userModal, setUserModal] = useState(false);
    return (
        <div className="container_header">
            <div className="headerLogo" onClick={() => {
                navigate('/');
                props.setTagState("all");
                sessionStorage.setItem('tab', 'all');
                dispatch(changeHeaderOnClickState(!reduxState.headerOnClickState));
                dispatch(changeKeyword(""));
                document.getElementById("searchInput").value = "";
            }}>
                풋사과
            </div>
            <div className="searchInputArea">
                <input type="text" onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        dispatch(changeKeyword(e.target.value))
                        dispatch(changeSearchEnterState(reduxState.searchEnterState + 1))
                        navigate('/')
                        sessionStorage.setItem('tab', 'all');
                    }
                }} placeholder="검색" id="searchInput" />
                <div className="loupeIconBox">
                    <img src="/icons/loupeGray.png" alt="" id="loupeIcon" />
                </div>
            </div>
            <div className="headerRight">
                <SwitchUser setUserModal={setUserModal} />
                {
                    userModal ? <Userbar setUserModal={setUserModal} /> : null
                }
            </div>
            {
                reduxState.loginModalState ? <LoginPage /> : null
            }
        </div>
    )
}

export default Header;

function SwitchUser(props) {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let reduxstate = useSelector((state) => {
        return state;
    })

    if (reduxstate.loginState === "false") {
        return (
            <div className="logInOutBox">
                <button id="headerLogin" onClick={() => {
                    dispatch(changeLoginModalState(true));
                }}>
                    로그인
                </button>
                <button id="headerJoin" onClick={() => {
                    navigate('/join');
                }}>
                    회원가입
                </button>


            </div>
        )
    } else if (reduxstate.loginState === "true") {
        return (
            <div className="headerUserBox">
                <div className="cartIconBox" onClick={() => {
                    navigate("/cart")
                }}>
                    <img src="/icons/cartIcon.png" alt="" className="cartIconImageHeader" />
                </div>
                <div className="userIconBox" onMouseEnter={() => { props.setUserModal(true) }}
                    onMouseLeave={() => { props.setUserModal(false) }}>
                    <img src="/icons/userIcon_Bear.png" alt="" className="userIconImage" />
                </div>
                {
                    localStorage.getItem('id') === "admin" &&
                    <div className="adminBtnBox">
                        <button className="adminBtn" onClick={() => {
                            navigate("/admin")
                        }}>
                            ADMIN
                        </button>
                    </div>
                }
            </div>
        )
    }
}


function Userbar(props) {

    let dispatch = useDispatch();
    let navigate = useNavigate();

    return (
        <div className="userBar_container" onMouseEnter={() => { props.setUserModal(true) }}
            onMouseLeave={() => { props.setUserModal(false) }} >
            <div className="userBar">
                <div className="userBarTop" onClick={() => {
                    navigate("/updatePage");
                }}>
                    <img src="/icons/userIcon.png" id="userIcon" alt="" />
                    <span id="userIconText">정보수정</span>
                </div>
                <div className="userBarMiddle" onClick={() => {
                    navigate("/myOrder");
                }}>
                    <img src="/icons/payment.png" id="paymentIcon" alt="" />
                    <span id="userIconText">결제내역</span>
                </div>
                <div className="userBarBottom" onClick={() => {
                    axios.get('/logout')
                        .then(() => {
                            localStorage.removeItem('id')
                            dispatch(changeLoginState("false"));
                            navigate("/");
                        })
                }}>
                    <img src="/icons/logout.png" id="logout" alt="" />
                    <span id="logoutText">로그아웃</span>
                </div>
            </div>
        </div>
    )
}