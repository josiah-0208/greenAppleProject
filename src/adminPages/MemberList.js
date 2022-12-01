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
                </div>
                <div className="memberListMiddle">
                    <div>
                        {
                            memberList.map((member, idx) => {
                                return (
                                    <MemberListDetail member={member}
                                        key={"memberListDetail" + idx} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberList;

function MemberListDetail(props) {
    return (
        <div className="conatiner_memberlistdetail">
            <div className="memberListDetailBox">
                <div className="memberListDetailId">
                    {props.member.id}
                </div>
                <div className="memberListDetailName">
                    {props.member.name}
                </div>
                <div className="memberListDetailTel">
                    {props.member.tel}
                </div>
                <div className="memberListDetailAddress">
                    {props.member.address1}
                </div>
                <div className="memberListDetailJoinDate">
                    {props.member.joinDate}
                </div>
                <div className="memberListDetailDel">
                    {props.member.del}
                </div>
            </div>
        </div>
    )
}