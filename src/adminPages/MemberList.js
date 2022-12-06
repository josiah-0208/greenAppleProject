import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import "./MemberList.css"

function MemberList() {
    //페이징
    const [pagePerBlock, setPagePerBlock] = useState(5)
    const [pageNum, setPageNum] = useState(1);
    const [startPage, setStartPage] = useState();
    const [endPage, setEndPage] = useState()
    const [totalPage, setTotalPage] = useState();

    const [memberList, setMemberList] = useState([]);
    const [memberListSelectValue, setMemberListSelectValue] = useState("id") // 검색 태그
    const [memberListSearch, setMemberListSearch] = useState(""); // 검색 스테이트

    useEffect(() => {          // 페이지 시작 시, 멤버 목록을 서버에서 불러온다.

        let body = {
            keyword: memberListSearch,
            tag: memberListSelectValue,
            pageNum: pageNum
        }

        axios.post("/admin/memberList", body)
            .then((res) => {
                console.log(res.data)
                console.log(typeof res.data.endPage)
                setMemberList(res.data.memberList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }, [])


    const memberListSearchBtn = () => {
        let body = {
            keyword: memberListSearch,
            tag: memberListSelectValue,
            pageNum: 1,
        }

        axios.post("/admin/memberList", body)
            .then((res) => {
                console.log(res.data)
                setMemberList(res.data.memberList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    const pagination = () => {                      // 페이지 숫자 버튼들
        var paginationArr = [];
        for (let i = startPage; i <= endPage; i++) {
            if (i === pageNum) {
                paginationArr.push(
                    <button key={i} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        paginationOnClick(i)
                    }}
                        style={{ border: "2px solid #419ae8", color: "#419ae8" }} >
                        {i}
                    </button>
                )
            } else {
                paginationArr.push(
                    <button key={i} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        paginationOnClick(i)
                    }} >
                        {i}
                    </button>
                )
            }
        }

        return paginationArr
    }

    const paginationOnClick = (pageNum) => {    // 페이지 버튼 눌렀을 때 가는 것

        let body = {
            keyword: memberListSearch,
            tag: memberListSelectValue,
            pageNum: pageNum
        }

        axios.post("/admin/memberList", body)
            .then((res) => {
                console.log(res.data)
                console.log(typeof res.data.endPage)
                setMemberList(res.data.memberList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    const paginationLeftDoubleArrow = () => {   // 왼쪽 두개 화살표 버튼 눌렀을 때 일어나는 일
        let body = {
            keyword: memberListSearch,
            tag: memberListSelectValue,
            pageNum: startPage - 1,
        }

        axios.post("/admin/memberList", body)
            .then((res) => {
                console.log(res.data)
                console.log(typeof res.data.endPage)
                setMemberList(res.data.memberList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    const paginationLeftArrow = () => { // 왼쪽 하나의 화살표 버튼 눌렀을 때 일어나는 일
        let body = {
            keyword: memberListSearch,
            tag: memberListSelectValue,
            pageNum: pageNum - 1,
        }

        axios.post("/admin/memberList", body)
            .then((res) => {
                console.log(res.data)
                console.log(typeof res.data.endPage)
                setMemberList(res.data.memberList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    const paginationRightArrow = () => { // 오른쪽 하나의 화살표 버튼 눌렀을 때 일어나는 일
        let body = {
            keyword: memberListSearch,
            tag: memberListSelectValue,
            pageNum: pageNum + 1,
        }

        axios.post("/admin/memberList", body)
            .then((res) => {
                console.log(res.data)
                setMemberList(res.data.memberList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    const paginationRightDoubleArrow = () => { // 오른쪽 두개의 화살표 버튼 눌렀을 때 일어나는 일
        let body = {
            keyword: memberListSearch,
            tag: memberListSelectValue,
            pageNum: endPage + 1,
        }

        axios.post("/admin/memberList", body)
            .then((res) => {
                console.log(res.data)
                setMemberList(res.data.memberList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    const memberListAftDelete = () => {
        let body = {
            keyword: memberListSearch,
            tag: memberListSelectValue,
            pageNum: pageNum,
        }

        axios.post("/admin/memberList", body)
            .then((res) => {
                console.log(res.data)
                setMemberList(res.data.memberList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    return (
        <div className="container_memberlist">
            <div className="memberListBox">
                <div className="memberListTop">
                    <div className="memberListTitle">
                        멤버 목록
                    </div>
                    <div className="memberListSearchArea">
                        <div>
                            <select className="memberListSelect" onChange={(e) => {
                                setMemberListSelectValue(e.target.value)
                            }} defaultValue={memberListSelectValue} >
                                <option key="id" value="id">아이디</option>
                                <option key="name" value="name">이름</option>
                                <option key="tel" value="tel">전화번호</option>
                                <option key="address1" value="address1">주소</option>
                            </select>{memberListSelectValue}
                        </div>
                        <div>
                            <input type="text" className="memberListSearchInput"
                                onChange={(e) => {
                                    setMemberListSearch(e.target.value)
                                }} /> {memberListSearch}
                        </div>
                        <div>
                            <button onClick={memberListSearchBtn}>검색</button>
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
                                            key={"memberListDetail" + idx}
                                            memberListAftDelete={memberListAftDelete} />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="memberListBottom">
                    <div className="">
                        <div>
                            {
                                startPage > pagePerBlock && // 스타트페이지가 기준페이지보다 크면
                                <div className="memberListLeftDoubleArrowBox">
                                    <img className="memberListLeftDoubleArrow" src="/icons/leftDoubleArrow.png"
                                        onClick={() => {
                                            paginationLeftDoubleArrow();
                                        }}
                                        alt="" />
                                </div>
                            }
                            {
                                pageNum > 1 && // 페이지넘이 1보다 클 때
                                <div className="memberListLeftArrowBox">
                                    <img className="memberListLeftArrow" src="/icons/leftArrow.png"
                                        onClick={() => {
                                            paginationLeftArrow();
                                        }}
                                        alt="" />
                                </div>
                            }
                        </div>
                        <div>
                            {pagination()}
                        </div>
                        <div>
                            {
                                pageNum < totalPage && // 페이지넘이 전체페이지보다 작을 때
                                <div className="memberListRightArrowBox">
                                    <img className="memberListRightArrow" src="/icons/rightArrow.png"
                                        onClick={() => {
                                            paginationRightArrow();
                                        }}
                                        alt="" />
                                </div>
                            }
                            {
                                endPage < totalPage && // 끝페이지가 전체페이지보다 작을 때
                                <div className="memberListRightDoubleArrowBox">
                                    <img className="memberListRightDoubleArrow" src="/icons/rightDoubleArrow.png"
                                        onClick={() => {
                                            paginationRightDoubleArrow();
                                        }}
                                        alt="" />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberList;

function MemberListDetail(props) {

    const MemberListDetailDelteBtn = () => {
        let body = {
            id: props.member.id
        }
        axios.post("/admin/memberDelete", body)
            .then((res) => {
                if (res.data === 1) {
                    props.memberListAftDelete();
                }
                console.log(res.data)
            })
    }

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
                    <div>
                        {props.member.del}
                    </div>
                    <div>
                        {
                            props.member.del === "n" && <button onClick={() => {
                                if (window.confirm("정말로 삭제하시겠습니까?")) {
                                    MemberListDetailDelteBtn();
                                }
                            }}>
                                삭제
                            </button>
                        }
                    </div>
                </div>
            </td>
        </tr>
    )
}