import axios from "axios";
import { useEffect, useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useNavigate } from "react-router-dom";
import "./Join.css";

function Join() {

    let [id, setId] = useState("");
    let [password, setPassword] = useState("");
    let [passwordChkState, setPasswordChkState] = useState("white")
    let [name, setName] = useState("")
    let [phone, setPhone] = useState("")
    let [addr, setAddr] = useState("")
    const [addr2, setAddr2] = useState("");
    let navigate = useNavigate();
    let [idChkState, setIdChkState] = useState("white");
    let [idChkStateOk, setIdChkStateOk] = useState(0);
    let [postPopUpState, setPostPopUpState] = useState(false);

    // 번호 자동 하이픈(-) 추가
    useEffect(() => {
        if (phone.length === 10) {
            setPhone(phone.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3'));
        }
        if (phone.length === 13) {
            setPhone(phone.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }, [phone]);

    const onSubmit = (e) => {
        e.preventDefault();
        let body = {
            id: id,
            pw: password,
            name: name,
            tel: phone,
            address1: addr,
            address2: addr2,
        }
        axios.post('/join', body)
            .then((response) => {
            })
            .catch((response) => {
            })
        navigate("/");
    }

    const onChangePasswordChk = (e) => {
        if (e.target.value !== password) {
            setPasswordChkState("gray");
        } else {
            setPasswordChkState("white");
        }
    }

    const idChk = (e) => {
        e.preventDefault();
        axios.get("/join/idCheck", {
            params: {
                id: id
            }
        })
            .then((response) => {
                if (response.data === 1) {
                    setIdChkState("black")
                    setIdChkStateOk(0)
                } else if (response.data === -1) {
                    setIdChkState("black")
                    setIdChkStateOk(1)
                }
            })
            .catch((response) => {
                setIdChkState("white")
                setIdChkStateOk(1)
            })
    }


    return (
        <div className="container_join">
            <div className="joinTitle">회원가입</div>
            <div className="joinFormBox">
                <form className="joinForm" onSubmit={onSubmit}>
                    <div className="joinIdBox">
                        <input type="text" placeholder="아이디" onChange={(e) => {
                            setId(e.target.value);
                        }} id="joinIdInput" required />
                        <button type="button" onClick={idChk} id="idChkButton">중복 확인</button>
                    </div>
                    <div className="idChkMsgBox">
                        <IdChkMsg idChkState={idChkState} idChkStateOk={idChkStateOk} />
                    </div>
                    <input type="password" placeholder="비밀번호" onChange={(e) => {
                        setPassword(e.target.value)
                    }} id="joinPasswordInput" required />
                    <input type="password" placeholder="비밀번호 확인"
                        onChange={onChangePasswordChk} id="joinPasswordChkInput" />
                    <PasswordChkMsg passwordChkState={passwordChkState} required />
                    <input type="text" placeholder="이름" onChange={(e) => {
                        setName(e.target.value)
                    }} id="joinNameInput" required />
                    <input type="tel" placeholder="핸드폰 *(-) 없이 입력" onChange={(e) => {
                        const regex = /^[0-9\b -]{0,13}$/;
                        if (regex.test(e.target.value)) {
                            setPhone(e.target.value)
                        }
                    }} value={phone} id="joinPhoneInput" required />
                    <div className="postBox">
                        <button onClick={(e) => {
                            e.preventDefault();
                            setPostPopUpState(!postPopUpState);
                        }} id="postSearchButton">주소 검색</button>
                        <input type="text" placeholder="주소" defaultValue={addr || ""}
                            id="joinAddrInput" required />
                    </div>
                    <input type="text" placeholder="상세주소" onChange={(e) => {
                        setAddr2(e.target.value)
                    }} id="joinAddr2Input" required />
                    {
                        postPopUpState && <PostPopUp setPostPopUpState={setPostPopUpState}
                            postPopUpState={postPopUpState} setAddr={setAddr} />
                    }
                    <button type="submit" id="joinSubmitButton">작성 완료</button>
                </form>
            </div>
        </div>
    )
}

export default Join;

function PasswordChkMsg(props) {
    return (
        <div className="passwordChkMsg" style={{ color: props.passwordChkState }}>
            비밀번호 확인이 다릅니다.
        </div>
    )
}

function IdChkMsg(props) {
    if (props.idChkStateOk === 0) {
        return (
            <div className="idChkMsg" style={{ color: props.idChkState }}>
                사용 가능한 아이디입니다.
            </div>
        )
    } else if (props.idChkStateOk === 1) {
        return (
            <div className="idChkMsg" style={{ color: props.idChkState }}>
                사용할 수 없는 아이디입니다.
            </div>
        )
    }
}

function PostPopUp(props) {

    const postPopUpStyle = {
        border: "1.5px solid gray",
        width: "430px"
    }
    const onCompletePost = (data) => {
        props.setAddr(data.address);
        props.setPostPopUpState(!props.postPopUpState);
    }

    return (
        <div className="postPopUpBox" onClick={() => {
            props.setPostPopUpState(!props.postPopUpState)
        }} style={{ backgroundColor: "" }}>
            <DaumPostcodeEmbed style={postPopUpStyle} onComplete={onCompletePost} />
        </div>
    )
}

export {PostPopUp};