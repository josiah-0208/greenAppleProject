import axios from "axios";
import { useRef } from "react";
import { useEffect, useState } from "react";
import "./ReviewList.css";

function ReviewList() {

    const searchSubmitBtnReviewList = useRef();  // 검색 엔터누르면 버튼 눌러지게
    //페이징
    const [pagePerBlock, setPagePerBlock] = useState(5)
    const [pageNum, setPageNum] = useState(1);
    const [startPage, setStartPage] = useState();
    const [endPage, setEndPage] = useState()
    const [totalPage, setTotalPage] = useState();

    const [reviewList, setReviewList] = useState([]);
    const [reviewListSelectValue, setReviewListSelectValue] = useState("id") // 검색 태그
    const [reviewListSearch, setReviewListSearch] = useState(""); // 검색 스테이트

    useEffect(() => {          // 페이지 시작 시, 멤버 목록을 서버에서 불러온다.

        let body = {
            keyword: reviewListSearch,
            tag: reviewListSelectValue,
            pageNum: pageNum
        }

        axios.post("/admin/reviewList", body)
            .then((res) => {
                console.log(res.data)
                setReviewList(res.data.reviewList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }, [])

    const reviewListSearchBtn = () => {                 // 검색버튼 누르면 서버에서 받아오게
        let body = {
            keyword: reviewListSearch,
            tag: reviewListSelectValue,
            pageNum: 1,
        }

        axios.post("/admin/reviewList", body)
            .then((res) => {
                console.log(res.data)
                setReviewList(res.data.reviewList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    const reviewListAftDelete = () => {   // 삭제가 진행된 후에 서버에서 데이터 다시 받아옴.
        let body = {
            keyword: reviewListSearch,
            tag: reviewListSelectValue,
            pageNum: pageNum,
        }

        axios.post("/admin/reviewList", body)
            .then((res) => {
                console.log(res.data)
                setReviewList(res.data.reviewList);
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
                        style={{ border: "0.1rem solid #419ae8", color: "#419ae8" }}
                        className="paginationBtn" >
                        {i}
                    </button>
                )
            } else {
                paginationArr.push(
                    <button key={i} onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        paginationOnClick(i)
                    }} className="paginationBtn" >
                        {i}
                    </button>
                )
            }
        }

        return paginationArr
    }

    const paginationOnClick = (pageNum) => {    // 페이지 버튼 눌렀을 때 가는 것

        let body = {
            keyword: reviewListSearch,
            tag: reviewListSelectValue,
            pageNum: pageNum
        }

        axios.post("/admin/reviewList", body)
            .then((res) => {
                setReviewList(res.data.reviewList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    const paginationLeftDoubleArrow = () => {   // 왼쪽 두개 화살표 버튼 눌렀을 때 일어나는 일
        let body = {
            keyword: reviewListSearch,
            tag: reviewListSelectValue,
            pageNum: startPage - 1,
        }

        axios.post("/admin/reviewList", body)
            .then((res) => {
                setReviewList(res.data.reviewList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    const paginationLeftArrow = () => { // 왼쪽 하나의 화살표 버튼 눌렀을 때 일어나는 일
        let body = {
            keyword: reviewListSearch,
            tag: reviewListSelectValue,
            pageNum: pageNum - 1,
        }

        axios.post("/admin/reviewList", body)
            .then((res) => {
                setReviewList(res.data.reviewList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    const paginationRightArrow = () => { // 오른쪽 하나의 화살표 버튼 눌렀을 때 일어나는 일
        let body = {
            keyword: reviewListSearch,
            tag: reviewListSelectValue,
            pageNum: pageNum + 1,
        }

        axios.post("/admin/reviewList", body)
            .then((res) => {
                setReviewList(res.data.reviewList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    const paginationRightDoubleArrow = () => { // 오른쪽 두개의 화살표 버튼 눌렀을 때 일어나는 일
        let body = {
            keyword: reviewListSearch,
            tag: reviewListSelectValue,
            pageNum: endPage + 1,
        }

        axios.post("/admin/reviewList", body)
            .then((res) => {
                setReviewList(res.data.reivewList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }




    return (
        <div className="container_reviewlist">
            <div className="reviewListBox">
                <div className="reviewListTop">
                    <div className="reviewListTitle">
                        리뷰 목록
                    </div>
                    <div className="reviewListSearchArea">
                        <div>
                            <select className="reviewListSelect" onChange={(e) => {
                                setReviewListSelectValue(e.target.value)
                            }} defaultValue={reviewListSelectValue} >
                                <option key="id" value="id">아이디</option>
                                <option key="productCode" value="productCode">상품코드</option>
                                <option key="content" value="content">내용</option>
                            </select>
                        </div>
                        <div>
                            <input type="text" className="reviewListSearchInput"
                                onChange={(e) => {
                                    setReviewListSearch(e.target.value)
                                }} onKeyDown={(e) => {
                                    if (e.key === "Enter") {        // 엔터를 누르면
                                        searchSubmitBtnReviewList.current.click();    // 참조된 곳 누르기
                                    }
                                }} />
                        </div>
                        <div>
                            <button onClick={reviewListSearchBtn}
                                ref={searchSubmitBtnReviewList} style={{ cursor: "pointer" }}>검색</button>
                        </div>
                    </div>
                </div>
                <div className="reviewListMiddle">
                    <table className="reviewListTable">
                        <thead>
                            <tr>
                                <th className="tableHeadNoReviewList">
                                    리뷰ID
                                </th>
                                <th className="tableHeadIdReviewList">
                                    ID
                                </th>
                                <th className="tableHeadProductCodeReviewList">
                                    상품코드
                                </th>
                                <th className="tableHeadContentReviewList">
                                    리뷰 내용
                                </th>
                                <th className="tableHeadDateReviewList">
                                    작성일
                                </th>
                                <th className="tableHeadDelReviewList">
                                    삭제여부
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reviewList && reviewList.map((review, idx) => {
                                    return (
                                        <ReviewListDetail review={review}
                                            key={"reviewListDetail" + idx}
                                            reviewListAftDelete={reviewListAftDelete} />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="reviewListBottom">
                    <div>
                        {
                            startPage > pagePerBlock && // 스타트페이지가 기준페이지보다 크면
                            <div className="reviewListLeftDoubleArrowBox">
                                <img className="reviewListLeftDoubleArrow" src="/icons/leftDoubleArrow.png"
                                    onClick={() => {
                                        paginationLeftDoubleArrow();
                                    }}
                                    alt="" />
                            </div>
                        }
                        {
                            pageNum > 1 && // 페이지넘이 1보다 클 때
                            <div className="reviewListLeftArrowBox">
                                <img className="reviewListLeftArrow" src="/icons/leftArrow.png"
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
                            <div className="reviewListRightArrowBox">
                                <img className="reviewListRightArrow" src="/icons/rightArrow.png"
                                    onClick={() => {
                                        paginationRightArrow();
                                    }}
                                    alt="" />
                            </div>
                        }
                        {
                            endPage < totalPage && // 끝페이지가 전체페이지보다 작을 때
                            <div className="reviewListRightDoubleArrowBox">
                                <img className="reviewListRightDoubleArrow" src="/icons/rightDoubleArrow.png"
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
    )
}

export default ReviewList;

function ReviewListDetail(props) {

    const reviewListDetailDelteBtn = () => {
        let body = {
            reviewId: props.review.reviewId
        }
        axios.post("/admin/reviewDelete", body)
            .then((res) => {
                if (res.data === 1) {
                    props.reviewListAftDelete();
                }
            })
    }


    return (
        <tr>
            <td>
                <div className="reviewListDetailReviewId">
                    {props.review.reviewId}
                </div>
            </td>
            <td>
                <div className="reviewListDetailId">
                    {props.review.id}
                </div>
            </td>
            <td>
                <div className="reviewListDetailProductCode">
                    {props.review.productCode}
                </div>
            </td>
            <td>
                <div className="reviewListDetailContent">
                    {props.review.content}
                </div>
            </td>
            <td>
                <div className="reviewListDetailReviewDate">
                    {props.review.reviewDate}
                </div>
            </td>
            <td className="reviewListDetailDelTd">
                <div className="reviewListDetailDel">
                    <div>
                        {props.review.del}
                    </div>
                    {
                        props.review.del === "n" && <button style={{ cursor: "pointer" }}
                            onClick={() => {
                                if (window.confirm("정말로 삭제하시겠습니까?")) {
                                    reviewListDetailDelteBtn();
                                }
                            }} >
                            삭제
                        </button>
                    }
                </div>
            </td>
        </tr>
    )
}