import axios from "axios"
import { useState } from "react";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function ProductList() {

    //페이징
    const [pagePerBlock, setPagePerBlock] = useState(5)
    const [pageNum, setPageNum] = useState(1);
    const [startPage, setStartPage] = useState();
    const [endPage, setEndPage] = useState()
    const [totalPage, setTotalPage] = useState();

    const [productList, setProductList] = useState([]);
    const [productListSelectValue, setProductListSelectValue] = useState("") // 검색 태그
    const [productSearch, setProductListSearch] = useState(""); // 검색 스테이트

    useEffect(() => {
        let body = {
            keyword: productSearch,
            tag: productListSelectValue,
            pageNum: pageNum,
        }

        axios.post("/admin/productList", body)
            .then((res) => {
                console.log(res.data)
                console.log(typeof res.data.endPage)
                setProductList(res.data.productList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }, [])
    return (
        <div className="container_productlist">

            {
                productList.map((product, idx) => {
                    return (
                        <ProductListDetail product={product}
                            key={"productListDetail" + idx}
                             />
                    )
                })
            }
        </div>
    )
}

export default ProductList;

function ProductListDetail(props) {

    const navigate = useNavigate();

    const productListUpdateBtn = () => {
        navigate("/productUpdate")
        sessionStorage.setItem("updateProductCode", props.product.productCode)
    }

    return (
        <div>
            {props.product.productCode}
            <button onClick={() => {
                productListUpdateBtn();
            }}>
                수정
            </button>
        </div>
    )
}