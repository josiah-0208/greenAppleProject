import "./Contents.css";
import Products from "./../contents/Products";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { changeKeyword } from "../store";
import { useInView } from "react-intersection-observer";

function Contents(props) {


    let reduxState = useSelector((state) => { return state });
    let dispatch = useDispatch();
    let [fruits, setFruits] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [ref, inView] = useInView();
    const [upButtonState, setUpButtonState] = useState(false);

    let tagState = sessionStorage.getItem('tab');

    let seasonalValue = "";
    if (tagState === "0") {
        seasonalValue = "sp";
    } else if (tagState === "1") {
        seasonalValue = "su";
    } else if (tagState === "2") {
        seasonalValue = "fa";
    } else if (tagState === "3") {
        seasonalValue = "wi";
    } else {
        tagState = 'all';
    }


    const getFruits = useCallback(async () => {
        setLoading(true);
        if (tagState === 'all') {
            console.log("실행 1")
            await axios.get("/product", {
                params: {
                    keyword: reduxState.keyword,
                    page: page,
                }
            })
                .then((response) => {
                    setFruits(response.data)
                    console.log(response.data)
                    console.log(response)
                    console.log("실행 2")
                })
                .catch(() => {
                    console.log('상품 로드 실패');
                    console.log("실행 3")
                })
        } else {
            console.log("실행 4")
            await axios.get("/product/seasonal/" + seasonalValue, {
                params: {
                    seasonal: seasonalValue,
                    page: page,
                }
            })
                .then((response) => {
                    console.log("실행 5")
                    setFruits(response.data);
                })
                .catch(() => {
                    console.log("실행 6")
                    console.log('상품 로드 실패');
                })
        }
        setLoading(false);
    }, [page, reduxState.keyword, props.tagState, reduxState.searchEnterState])


    useEffect(() => {
        getFruits()
    }, [getFruits])

    useEffect(() => {
        if (inView && !loading) {
            setPage(prevState => prevState + 1)
        }
    }, [inView])

    // 스크롤 내리면 나오게 
    useEffect(() => {
        const showTopBtnOnBottom = () => {
          if (window.pageYOffset > 85) {
            setUpButtonState(true);
          } else {
            setUpButtonState(false);
          }
        };
        window.addEventListener("scroll", showTopBtnOnBottom);
        return () => {
          window.removeEventListener("scroll", showTopBtnOnBottom);
        };
      }, []);

    return (
        <div className="container_contents">
            <div className="fruitExpressionArea">
                {
                    upButtonState && <div className="upButtonBox" onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}>
                        <img src="/icons/upArrow.png" alt="" id="upButton" />
                    </div>
                }
                {fruits && fruits.map((fruit, i) => {
                    return (
                        <React.Fragment key={i}>
                            {
                                fruits.length - 1 === i ?
                                    <div ref={ref}>
                                        <Products fruit={fruit} key={""+fruit.productName+i} i={i} />
                                    </div> :
                                    <div>
                                        <Products fruit={fruit} key={""+fruit.productName+i} i={i} />
                                    </div>
                            }
                        </React.Fragment>

                    )
                })
                }
            </div>
        </div>
    )
}


export default Contents;