import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./MemberList.css"

function MemberList() {

    const [memberList, setMemberList] = useState([]);

    useEffect(() => {                       // 페이지 시작 시, 멤버 목록을 서버에서 불러온다.
        axios.post("/admin/memberList")
            .then((res) => {
                console.log(res.data)
                setMemberList(res.data);
            })
    }, [])

    return (
        <div className="container_memberlist">
            <div className="memberListBox">
                <div className="memberListTop">
                    <div className="memberListTitle">
                        멤버 목록
                    </div>
                    <div className="memberListSearchArea">
                        <div>
                            <select>
                                <option>이름</option>
                                <option>아이디</option>
                                <option>전화번호</option>
                                <option>주소</option>
                            </select>
                        </div>
                        <div>
                            <input />
                        </div>
                        <div>
                            <button>검색</button>
                        </div>
                    </div>
                </div>
                <div className="memberListMiddle">
                    <table className="memberListTable">
                        <thead>
                            <tr>
                                <th>
                                    ID
                                </th>
                                <th>
                                    이름
                                </th>
                                <th>
                                    전화번호
                                </th>
                                <th>
                                    주소
                                </th>
                                <th>
                                    가입일
                                </th>
                                <th>
                                    탈퇴여부
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                memberList.map((member, idx) => {
                                    return (
                                        <MemberListDetail member={member}
                                            key={"memberListDetail" + idx} />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="memberListBottom">
                                
                </div>
            </div>
        </div>
    )
}

export default MemberList;

function MemberListDetail(props) {
    return (
        <tr>
            <td>
                <div className="memberListDetailId">
                    {props.member.id}
                </div>
            </td>
            <td>
                <div className="memberListDetailName">
                    {props.member.name}
                </div>
            </td>
            <td>
                <div className="memberListDetailTel">
                    {props.member.tel}
                </div>
            </td>
            <td>
                <div className="memberListDetailAddress">
                    {props.member.address1}
                </div>
            </td>
            <td>
                <div className="memberListDetailJoinDate">
                    {props.member.joinDate}
                </div>
            </td>
            <td>
                <div className="memberListDetailDel">
                    {props.member.del}
                </div>
            </td>
        </tr>
    )
}