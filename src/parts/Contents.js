import "./Contents.css";
import Products from "../contents/Products";
import { useEffect, useState } from "react";
import axios from "axios";

function Contents(props) {

    let [fruits, setFruits] = useState([]);
    let seasonalValue = "";
    if (props.tagState === 0) {
        seasonalValue = "spring";
    } else if (props.tagState === 1) {
        seasonalValue = "summer";
    } else if (props.tagState === 2) {
        seasonalValue = "autumn";
    } else if (props.tagState === 3) {
        seasonalValue = "winter";
    }

    useEffect(() => {
        axios.get("/products/seasonal", {params: {
            seasonal : seasonalValue
        }})
        .then((data) => {
            setFruits(data.data);
        })
        .catch(() => {
            console.log('상품 로드 실패 실패하였습니다.');
          })
    }, [props.tagState]);

    return (
        <div className="container_contents">
            <Products />
        </div>
    )
}


export default Contents;