import { useState } from "react"
import MemberList from "./MemberList";
import "./Admin.css"
import ReviewList from "./ReviewList";
import ProductList from "./ProductList";
import { useEffect } from "react";

function Admin() {

    const style = {
        borderRight: "none",
        backgroundColor: "white"
    }
    const [adminTabState, setAdminTabState] = useState(0);
    const [adminRightBorder, setAdminRightBorder] = useState({})
    const [adminRightBorder2, setAdminRightBorder2] = useState({})
    const [adminRightBorder3, setAdminRightBorder3] = useState({})

    useEffect(() => {                       // 탭스테이트에 따라서 배경색 바뀌게
        
        if (adminTabState === 0) {
            setAdminRightBorder(style)
            setAdminRightBorder2({})
            setAdminRightBorder3({})
        } else if (adminTabState === 1) {
            setAdminRightBorder({})
            setAdminRightBorder2(style)
            setAdminRightBorder3({})
        } else {
            setAdminRightBorder({})
            setAdminRightBorder2({})
            setAdminRightBorder3(style)
        }
    }, [adminTabState])


    return (
        <div className="container_admin">
            <div className="adminSideTabArea">
                <div className="adminSideTabBox">
                    <button id="adminSideProductBtn" onClick={() => {
                        setAdminTabState(0)
                    }} style={adminRightBorder} >
                        상품 관리
                    </button>
                    <button id="adminSideMemberBtn" onClick={() => {
                        setAdminTabState(1)
                    }} style={adminRightBorder2} >
                        멤버 관리
                    </button>
                    <button id="adminSideReviewBtn" onClick={() => {
                        setAdminTabState(2)
                    }} style={adminRightBorder3} >
                        리뷰 관리
                    </button>
                </div>
            </div>
            <div className="adminContentArea">
                {/* 여기에 이제 텝에 따라서 내용물 비추자 */}
                {
                    adminTabState === 0 && <ProductList />
                }
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