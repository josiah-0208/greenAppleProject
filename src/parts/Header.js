import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
    let navigate = useNavigate();
    return (
        <div className="container_header">
            <div className="" onClick={() => {
                navigate('/');
            }}>
                로고
            </div>
            <div className="">
                로그인
            </div>
            <div className="">
                사용자 아이콘
            </div>
        </div>
    )
}

export default Header;