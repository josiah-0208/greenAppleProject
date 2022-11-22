import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostPopUp } from "./Join";
import './UpdatePage.css';

function UpdatePage() {

    let [member, setMember] = useState({});
    let [pw, setPw] = useState("");
    let [tel, setTel] = useState("");
    let [addr, setAddr] = useState(member.address1);
    let [postPopUpState, setPostPopUpState] = useState(false);

    let navigate = useNavigate();

    const sessionId = localStorage.getItem('id')

    useEffect(() => {
        axios.get('/member/information', {
            params: {
                id: sessionId
            }
        })
            .then((response) => {
                setMember(response.data)
                setTel(response.data.tel)
                setAddr(response.data.address1)
            })
            .catch(() => {
                console.log("회원정보가 존재하지 않습니다.");
            })
    }, [sessionId])

    useEffect(() => {
        if (tel.length === 10) {
            setTel(tel.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3'));
        }
        if (tel.length === 13) {
            setTel(tel.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }, [tel]);

    const onSubmit = (e) => {
        e.preventDefault();
        let body = {
            id: member.id,
            pw: pw,
            name: member.name,
            tel: tel,
            address1: addr,
            address2: ""
        }
        axios.post("/member/update", body)
            .then((response) => {
                console.log(response.data)
                navigate("/updatePage")
                alert("회원 수정 완료.")
                document.getElementById("passwordInput").value = ""
            })
            .catch((response) => {
                console.log('정보 수정을 실패하였습니다.')
            })
    }

    return (
        <div className="container_update">
            <div className="updateBox">
                <div className="updateTitle">
                    내정보
                </div>
                <form className="updateForm" onSubmit={onSubmit}>
                    <div className="nameBox">
                        <div id="nameLabel">이름</div>
                        <div id="userName">{member.name}</div>
                    </div>
                    <div className="idBox">
                        <div id="idLabel">아이디</div>
                        <div id="userId">{member.id}</div>
                    </div>
                    <div className="passwordBox">
                        <div id="passwordLabel">비밀번호</div>
                        <input type="password" placeholder="새 비밀번호" id="passwordInput"
                            onChange={(e) => { setPw(e.target.value) }} required/>
                    </div>
                    <div className="telBox">
                        <div id="telLabel">휴대전화</div>
                        <input type="tel" id="telInput" onChange={(e) => {
                                const regex = /^[0-9\b -]{0,13}$/;
                                if (regex.test(e.target.value)) {
                                    setTel(e.target.value);
                                }
                            }} value={tel}/>
                    </div>
                    {/* tel, text는 null이어도 괜찮은데, address는 내가 값을 입력 안했을 때
                    null값이 서버로 전달되어서 입력이 안됨, 그래서 입력값이 없다면
                    초기값을 보내주는 코드를 짜고, tell과 암호는 4자리 이상??
                */}
                    <div className="postBoxUpdate">
                        <div style={{ display: "flex" }}>
                            <div id="addressLabel">주소</div>
                            <button onClick={(e) => {
                                e.preventDefault();
                                setPostPopUpState(!postPopUpState);
                            }} id="postSearchButtonUpdate">검색</button>
                        </div>
                        <input type="text" defaultValue={addr || ""} id="addressInput"
                            onChange={(e) => {
                                setAddr(e.target.value)
                            }} />
                    </div>
                    <div className="updateFormBottom">
                        <button className="updateButton" type="submit" >수정 완료</button>
                        <button className="deleteButton" onClick={() => {
                            navigate("/deleteChk")
                        }}>회원 탈퇴
                        </button>
                    </div>

                </form>
                {
                    postPopUpState && 
                    <div className="postPopUpUpdatePage">
                    <PostPopUp setPostPopUpState={setPostPopUpState}
                        postPopUpState={postPopUpState} setAddr={setAddr} />
                    </div>
                }
            </div>
        </div>
    )
}

export default UpdatePage;