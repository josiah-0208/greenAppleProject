import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeLoginModalState, changeLoginState } from "../store";
import "./LoginPage.css";

function Loginpage(props) {

    let navigate = useNavigate();
    let [id, setId] = useState("");
    let [password, setPassword] = useState("");
    let [tryalert, setTryalert] = useState(false);
    let dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        setTryalert(false);
        let body = {
            id: id,
            pw: password
        }
        axios.post('/login', body)
            .then((response) => {
                if (response.data === 1) {
                    localStorage.setItem('id', id);
                    dispatch(changeLoginState("true"));
                    dispatch(changeLoginModalState(false));
                    navigate('/')
                } else if (response.data === -1) {
                    setTryalert(true);
                } else if (response.data === 0) {
                    setTryalert(true);
                }
            })
            .catch((response) => {
                alert('로그인 실패');
                navigate("/loginPage")
            })

    }


    return (
        <div className="loginBox">
            <div className="loginModalBackground" onClick={() => {
                dispatch(changeLoginModalState(false));
            }}>
            </div>
            <div className="loginFormBox">
                <div className="loginFormBoxTop">&nbsp;로그인
                    <img src="/icons/closeIcon.png" alt="" id="closeIcon" onClick={() => {
                        dispatch(changeLoginModalState(false));
                    }} />
                </div>
                <form className="loginForm" onSubmit={onSubmit}>
                    <input type="text" placeholder="아이디" required onChange={(e) => {
                        setId(e.target.value)
                    }} id="loginIdInput" />
                    <input type="password" placeholder="비밀번호" required onChange={(e) => {
                        setPassword(e.target.value)
                    }} id="loginPasswordInput" />
                    {
                        tryalert ? <div className="loginAlert">
                            아이디와 비밀번호가 일치하지 않습니다.</div> : null
                    }
                    <button type="submit" id="loginButton">로그인</button>
                </form>
                <div className="loginFormBoxBottom" onClick={() => {
                    dispatch(changeLoginModalState(false));
                    navigate("/join")
                }}>아직 회원이 아니신가요?&nbsp;&nbsp;&nbsp;&nbsp; 회원가입</div>
            </div>
        </div>
    )
}

export default Loginpage;