import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changeLoginState } from "../store";
import "./DeleteChk.css"

axios.defaults.withCredentials = true;

function DeleteChk() {

    let [password, setPassword] = useState();
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post("/member/delete", {
            pw: password
        })
            .then((response) => {
                if(response.data === 1) {
                    localStorage.removeItem('id')
                    dispatch(changeLoginState("false"));
                    alert("탈퇴를 성공하였습니다.")
                    navigate("/");
                } else if(response.data === -1) {
                    alert("비밀번호를 확인해주세요.")
                }
            })
            .catch((response) => {
                alert("비밀번호를 확인해주세요.")
                
            })
    }

    return (
        <div className="container_deleteChk">
            <div className="deleteFormBox">
                <form className="deleteForm" onSubmit={onSubmit}>
                    <div className="deleteTitle1"> 회원 탈퇴를 위해, </div>
                    <div className="deleteTitle2"> 비밀번호를 입력해주세요. </div>
                    <input type="password" className="passwordInputDelete" required onChange={(e) => {
                        setPassword(e.target.value)
                    }} />
                    <button type="submit" id="deleteFormButton">탈퇴</button>
                </form>
            </div>
        </div>
    )
}

export default DeleteChk;