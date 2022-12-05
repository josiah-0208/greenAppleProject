import { useState } from "react";

function ReviewList() {

    const [reviewList, setReviewList] = useState([]);

    return (
        <div className="container_reviewlist">
            <div className="reviewListBox">
                <div className="reviewListTop">
                    <div className="reviewListTitle">
                        리뷰 목록
                    </div>
                    <div className="reviewListSearchArea">
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
                <div className="reviewListMiddle">
                    <table className="reviewListTable">
                        <thead>
                            <tr>
                                <th>
                                    리뷰NO
                                </th>
                                <th>
                                    구매상품
                                </th>
                                <th>
                                    ID
                                </th>
                                <th>
                                    리뷰 내용
                                </th>
                                <th>
                                    작성일
                                </th>
                                <th>
                                    삭제여부
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                reviewList.map((review, idx) => {
                                    return (
                                        <ReviewListDetail review={review}
                                            key={"reviewListDetail" + idx} />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ReviewList;

function ReviewListDetail(props) {
    return (
        <tr>
            <td>
                <div>
                    
                </div>
            </td>
        </tr>
    )
}