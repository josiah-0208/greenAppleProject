import axios from "axios"
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import "./ProductList.css"

function ProductList() {

    const navigate = useNavigate();

    const searchSubmitBtnProductList = useRef();  // 검색 엔터누르면 버튼 눌러지게
    //페이징
    const [pagePerBlock, setPagePerBlock] = useState(5)
    const [pageNum, setPageNum] = useState(1);
    const [startPage, setStartPage] = useState();
    const [endPage, setEndPage] = useState()
    const [totalPage, setTotalPage] = useState();

    const [productList, setProductList] = useState([]);
    const [productListSelectValue, setProductListSelectValue] = useState("productName") // 검색 태그
    const [productListSearch, setProductListSearch] = useState(""); // 검색 스테이트

    useEffect(() => {
        let body = {
            keyword: productListSearch,
            tag: productListSelectValue,
            pageNum: pageNum,
        }

        axios.post("/admin/productList", body)
            .then((res) => {
                console.log(res.data)
                setProductList(res.data.productList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }, [])

    const productListSearchBtn = () => {
        let body = {
            keyword: productListSearch,
            tag: productListSelectValue,
            pageNum: 1,
        }

        axios.post("/admin/productList", body)
            .then((res) => {
                setProductList(res.data.productList);
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
            keyword: productListSearch,
            tag: productListSelectValue,
            pageNum: pageNum
        }

        axios.post("/admin/productList", body)
            .then((res) => {
                setProductList(res.data.productList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    const paginationLeftDoubleArrow = () => {   // 왼쪽 두개 화살표 버튼 눌렀을 때 일어나는 일
        let body = {
            keyword: productListSearch,
            tag: productListSelectValue,
            pageNum: startPage - 1,
        }

        axios.post("/admin/productList", body)
            .then((res) => {
                setProductList(res.data.productList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    const paginationLeftArrow = () => { // 왼쪽 하나의 화살표 버튼 눌렀을 때 일어나는 일
        let body = {
            keyword: productListSearch,
            tag: productListSelectValue,
            pageNum: pageNum - 1,
        }

        axios.post("/admin/productList", body)
            .then((res) => {
                setProductList(res.data.productList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    const paginationRightArrow = () => { // 오른쪽 하나의 화살표 버튼 눌렀을 때 일어나는 일
        let body = {
            keyword: productListSearch,
            tag: productListSelectValue,
            pageNum: pageNum + 1,
        }

        axios.post("/admin/productList", body)
            .then((res) => {
                setProductList(res.data.productList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    const paginationRightDoubleArrow = () => { // 오른쪽 두개의 화살표 버튼 눌렀을 때 일어나는 일
        let body = {
            keyword: productListSearch,
            tag: productListSelectValue,
            pageNum: endPage + 1,
        }

        axios.post("/admin/productList", body)
            .then((res) => {
                setProductList(res.data.productList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }

    const productListAftDelete = () => {   // 삭제가 진행된 후에 서버에서 데이터 다시 받아옴.
        let body = {
            keyword: productListSearch,
            tag: productListSelectValue,
            pageNum: pageNum,
        }

        axios.post("/admin/productList", body)
            .then((res) => {
                setProductList(res.data.productList);
                setPageNum(res.data.currentPage);
                setStartPage(res.data.startPage);
                setEndPage(res.data.endPage);
                setTotalPage(res.data.totalPage);
            })
    }



    return (
        <div className="container_productlist">
            <div className="productListBox">
                <div className="productListTop">
                    <div className="productListTitle">
                        상품 목록
                    </div>
                    <div className="productListSearchArea">
                        <div>
                            <select className="productListSelect" onChange={(e) => {
                                setProductListSelectValue(e.target.value)
                            }} defaultValue={productListSelectValue} >
                                <option key="productName" value="productName">상품명</option>
                                <option key="productCode" value="productCode">상품코드</option>
                            </select>
                        </div>
                        <div>
                            <input type="text" className="productListSearchInput"
                                onChange={(e) => {
                                    setProductListSearch(e.target.value)
                                }} onKeyDown={(e) => {
                                    if (e.key === "Enter") {        // 엔터를 누르면
                                        searchSubmitBtnProductList.current.click();    // 참조된 곳 누르기
                                    }
                                }} />
                        </div>
                        <div>
                            <button onClick={productListSearchBtn}
                                ref={searchSubmitBtnProductList} style={{ cursor: "pointer" }}>검색</button>
                        </div>
                    </div>
                </div>
                <div className="productListMiddle">
                    <table className="productListTable">
                        <thead>
                            <tr>
                                <th className="tableHeadProductCodeProductList">
                                    상품코드
                                </th>
                                <th className="tableHeadThumbnailProductList">
                                    썸네일
                                </th>
                                <th className="tableHeadProductNameProductList">
                                    상품명
                                </th>
                                <th className="tableHeadSeasonalProductList">
                                    계절
                                </th>
                                <th className="tableHeadOriginProductList">
                                    원산지
                                </th>
                                <th className="tableHeadPriceProductList">
                                    가격
                                </th>
                                <th className="tableHeadStockProductList">
                                    재고
                                </th>
                                <th className="tableHeadInputDateProductList">
                                    등록일
                                </th>
                                <th className="tableHeadDelProductList">
                                    상태
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                productList && productList.map((product, idx) => {
                                    return (
                                        <ProductListDetail product={product}
                                            key={"productListDetail" + idx}
                                            productListAftDelete={productListAftDelete} />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="productListBottom">
                    <div>
                        <button onClick={() => {
                            navigate("/productInsert")
                        }}>
                            상품 등록하기
                        </button>
                    </div>
                    <div>
                        {
                            startPage > pagePerBlock && // 스타트페이지가 기준페이지보다 크면
                            <div className="productListLeftDoubleArrowBox">
                                <img className="productListLeftDoubleArrow" src="/icons/leftDoubleArrow.png"
                                    onClick={() => {
                                        paginationLeftDoubleArrow();
                                    }}
                                    alt="" />
                            </div>
                        }
                        {
                            pageNum > 1 && // 페이지넘이 1보다 클 때
                            <div className="productListLeftArrowBox">
                                <img className="productListLeftArrow" src="/icons/leftArrow.png"
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
                            <div className="productListRightArrowBox">
                                <img className="productListRightArrow" src="/icons/rightArrow.png"
                                    onClick={() => {
                                        paginationRightArrow();
                                    }}
                                    alt="" />
                            </div>
                        }
                        {
                            endPage < totalPage && // 끝페이지가 전체페이지보다 작을 때
                            <div className="productListRightDoubleArrowBox">
                                <img className="productListRightDoubleArrow" src="/icons/rightDoubleArrow.png"
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

export default ProductList;


function ProductListDetail(props) {

    const navigate = useNavigate();

    const productListUpdateBtn = () => {
        navigate("/productUpdate")
        sessionStorage.setItem("updateProductCode", props.product.productCode)
    }

    const productListDetailDelteBtn = () => {
        let body = {
            productCode: props.product.productCode,
        }
        axios.post("/admin/productDelete", body)
            .then((res) => {
                if (res.data === 1) {
                    props.productListAftDelete();
                }
                console.log(res.data)
            })
    }

    return (
        <tr>
            <td>
                <div className="productListDetailProductCode">
                    {props.product.productCode}
                </div>
            </td>
            <td className="productListDetailThumbnailTd">
                <div className="productListDetailThumbnail">
                    <img src={"http://localhost:8080/pdImages/" + props.product.thumbnail} 
                    className="productListDetailThumbnailImg" alt="" />
                </div>
            </td>
            <td>
                <div className="productListDetailProductName">
                    {props.product.productName}
                </div>
            </td>
            <td className="productListDetailSeasonalTd">
                <div className="productListDetailSeasonal">
                    {props.product.seasonal}
                </div>
            </td>
            <td className="productListDetailoriginTd">
                <div className="productListDetailorigin">
                    {props.product.origin}
                </div>
            </td>
            <td className="productListDetailPriceTd">
                <div className="productListDetailPrice">
                    {props.product.price.toLocaleString('ko-KR')}원
                </div>
            </td>
            <td className="productListDetailStockTd">
                <div className="productListDetailStock">
                    {props.product.stock.toLocaleString('ko-KR')}개
                </div>
            </td>
            <td className="productListDetailInputDateTd">
                <div className="productListDetailInputDate">
                    {props.product.inputDate}
                </div>
            </td>
            <td className="productListDetailDelTd">
                <div className="productListDetailDel">
                    <div>
                        {props.product.del}
                    </div>
                    {
                        props.product.del === "n" && <button onClick={() => {
                            productListUpdateBtn();
                        }}>
                            수정
                        </button>
                    }
                    {
                        props.product.del === "n" && <button style={{ cursor: "pointer" }}
                            onClick={() => {
                                if (window.confirm("정말로 삭제하시겠습니까?")) {
                                    productListDetailDelteBtn();
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