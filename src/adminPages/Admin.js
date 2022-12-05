import { useState } from "react"
import MemberList from "./MemberList";
import "./Admin.css"
import ReviewList from "./ReviewList";

function Admin() {

    const [adminTabState, setAdminTabState] = useState(0);

    return (
        <div className="container_admin">
            <div className="adminSideTabArea">
                <div className="adminSideTabBox">
                    <button className="adminSideProductBtn" onClick={() => {
                        setAdminTabState(0)
                    }} >
                        상품 관리
                    </button>
                    <button className="adminSideMemberBtn" onClick={() => {
                        setAdminTabState(1)
                    }} >
                        멤버 관리
                    </button>
                    <button className="adminSideReviewBtn" onClick={() => {
                        setAdminTabState(2)
                    }} >
                        리뷰 관리
                    </button>
                </div>
            </div>
            <div className="adminContentArea">
                {/* 여기에 이제 텝에 따라서 내용물 비추자 */}
                {
                    adminTabState === 1 && <MemberList />
                }
                {
                    adminTabState === 2 && <ReviewList />
                }
            </div>
        </div>
    )
}

export default Admin;