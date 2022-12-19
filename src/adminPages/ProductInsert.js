import axios from 'axios';
import { useRef, useState } from 'react';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import './ProductInsert.css';

function ProductInsert() {

    const navigate = useNavigate();

    const [insertName, setInsertName] = useState("");
    const [insertOrigin, setInsertOrigin] = useState("");
    const [insertSeasonal, setInsertSeasonal] = useState("sp");
    const [insertPrice, setInsertPrice] = useState(0);
    const [insertStock, setInsertStock] = useState(0);
    const [insertProductDescription, setInsertProductDescription] = useState("");

    const [imgSrc, setImgSrc] = useState("/icons/previewImg.png");    // 파일 이미지 경로
    const [productImgSrc, setProductImgSrc] = useState(["/icons/previewImg.png"]);
    const [productImgMax, setProductImgMax] = useState(0);
    const inputTagThumbnail = useRef();           // 인풋태그 참조
    const inputTagProductImg = useRef();

    const thumbnailInputOnChange = (e) => {     // 인풋태그 변화 시, 썸네일 이미지 경로 수정

        if (!e.target.files) {
            return;
        }
        
        setImgSrc(URL.createObjectURL(e.target.files[0]));

    }

    const ProductImgInputOnChange = (e) => {     // 인풋태그 변화 시, 썸네일 이미지 경로 수정

        if (!e.target.files) {
            return;
        }
        let copy = [];
        for (let i = 0; i < document.getElementById("insertProductImgInput").files.length; i++) {
            copy.push(URL.createObjectURL(e.target.files[i]))
            setProductImgSrc(copy);
        }
        setProductImgMax(document.getElementById("insertProductImgInput").files.length);
    }

    const insertThumbnailBtn = () => {          // 버튼을 누르면 숨겨진 input 태그 클릭
        inputTagThumbnail.current.click();
    }

    const insertProductImgBtn = () => {          // 버튼을 누르면 숨겨진 input 태그 클릭
        inputTagProductImg.current.click();
    }

    const insertSubmit = () => {                // 작성 완료 후, 제출 함수

        let formData = new FormData();
    
        formData.append("productName", insertName);
        formData.append("thumbnailFile", document.getElementById("insertThumbnailInput").files[0])
        for (let i = 0; i < document.getElementById("insertProductImgInput").files.length; i++) {
            formData.append("files", document.getElementById("insertProductImgInput").files[i])
        } // filelist는 배열이 아니여서 이렇게 하나씩 넣어준다
        formData.append("origin", insertOrigin);
        formData.append("seasonal", insertSeasonal);
        formData.append("price", insertPrice);
        formData.append("stock", insertStock);
        formData.append("productDescription", insertProductDescription);
        

        axios(
            {
                url: "/admin/productInsert",
                method: "POST",
                mode: "cors",
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }
        ).then((res) => {
            if (res.data === 1 || res.data === 2) {
                navigate("/admin");
            }
        })

    }

    function stringNumberToInt(stringNumber) {                  // 컴마 찍힌 숫자를 정수로 반환 
        return parseInt(stringNumber.replace(/,/g, ''));
    }

    return (
        <div className="container_productinsert">
            <div className="productInsertBox">
                <div className="productInsertTopArea">
                    <div className="productInserTitle">
                        상품 등록
                    </div>
                </div>
                <div className="productInsertMiddleArea">
                    <div className="insertNameBox">
                        <div className="insertName">
                            상품명
                        </div>
                        <div className="insertNameInputBox">
                            <input type="text" id="insertNameInput" onChange={(e) => {
                                setInsertName(e.target.value);
                            }} required />
                        </div>
                    </div>
                    <div className="insertThumbnailBox">
                        <div className="insertThumbnail">
                            <div className='insertThumbnailTxt'>
                                썸네일
                            </div>
                            <button onClick={insertThumbnailBtn}
                                id="insertThumbnailBtn">업로드</button>
                        </div>
                        <div className="insertThumbnailRightArea">
                            <div className='insertThumbnailPreviewBox'>
                                <img src={imgSrc} alt="" id="insertThumbnailPreviewImg" />
                            </div>
                            <input type="file" multiple style={{ display: "none" }} ref={inputTagThumbnail}
                                onChange={thumbnailInputOnChange} id="insertThumbnailInput"
                                accept='image/*' required />
                        </div>
                        <div className="insertProductImg">
                            <div className='insertProductImgTxt'>
                                상세 이미지
                            </div>
                            <button onClick={insertProductImgBtn}
                                id="insertProductImgBtn" >업로드</button>
                            <div className='insertProductImgMax'>
                                권장 ({productImgMax}/3)개
                            </div>
                        </div>
                        <div className="insertProductImgRightArea">
                            {
                                productImgSrc && productImgSrc.map((val, idx) => {
                                    return (
                                        <div key={val+idx} className='insertProductImgPreviewBox'>
                                            <img src={val} alt="" id="insertProductImgPreviewImg" />
                                        </div>
                                    )
                                })
                            }

                            <input type="file" multiple style={{ display: "none" }} ref={inputTagProductImg}
                                onChange={ProductImgInputOnChange} id="insertProductImgInput"
                                accept='image/*' />
                        </div>
                    </div>
                    <div className='insertOriginSeasonalArea'>
                        <div className='insertOriginBox'>
                            <div className='insertOrigin'>
                                원산지
                            </div>
                            <div className='insertOriginInputBox'>
                                <input type="text" onChange={(e) => {
                                    setInsertOrigin(e.target.value)
                                }}
                                    id="insertOriginInput" />
                            </div>
                        </div>
                        <div className='insertSeasonalBox'>
                            <div className='insertSeasonal'>
                                제철
                            </div>
                            <div className="insertSeasonalSelectBox">
                                <select className='insertSeasonalSelect' onChange={(e) => {
                                        setInsertSeasonal(e.target.value)
                                    }} defaultValue={insertSeasonal}>
                                    <option key="sp" value="sp">봄</option>
                                    <option key="su" value="su">여름</option>
                                    <option key="fa" value="fa">가을</option>
                                    <option key="wi" value="wi">겨울</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='insertPriceStockBox'>
                        <div className="insertPriceBox">
                            <div className='inserPrice'>
                                단위 가격
                            </div>
                            <div className='insertPriceInputBox'>
                                <NumericFormat thousandSeparator={true} required
                                    onChange={(e) => {
                                        setInsertPrice(stringNumberToInt(e.target.value))
                                    }} id="insertPriceInput" /> 원
                            </div>
                        </div>
                        <div className='insertStockBox'>
                            <div className='insertStock'>
                                재고
                            </div>
                            <div className='insertStockInputBox'>
                                <NumericFormat thousandSeparator={true} required
                                    onChange={(e) => {
                                        setInsertStock(stringNumberToInt(e.target.value))
                                    }} id="insertStockInput" /> 개
                            </div>
                        </div>
                    </div>
                    <div className='insertProductDescriptionBox'>
                        <div className='insertProductDescription'>
                            상품 설명
                        </div>
                        <div className="insertProductDescriptionTextAreaBox">
                            <textarea placeholder='텍스트 정보는 간략하게 기입해주세요.'
                                onChange={(e) => {
                                    setInsertProductDescription(e.target.value)
                                }}
                                id="insertProductDescriptionTextArea" />
                        </div>
                    </div>
                </div>
                <div className="productInsertBottomArea">
                    <button onClick={insertSubmit} id="productInsertBtn">
                        등 록
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductInsert;