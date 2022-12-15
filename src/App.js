import './App.css';
import Side from './parts/Side';
import Header from './parts/Header';
import Contents from './pages/Contents';
import Footer from './parts/Footer';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import View from './pages/View';
import Join from './pages/Join';
import UpdatePage from './pages/UpdatePage';
import DeleteChk from './pages/DeleteChk';
import { useDispatch, useSelector } from 'react-redux';
import { changeLoginState, changeWatchedState } from './store';
import Cart from './pages/Cart';
import axios from 'axios';
import OrderForm from './pages/OrderForm';
import MyOrder from './pages/MyOrder';
import ProductInsert from './adminPages/ProductInsert';
import Admin from './adminPages/Admin';
import ProductUpdate from './adminPages/ProductUpdate';
axios.defaults.baseURL = "http://13.124.91.28:8080";

function App() {


  let [tagState, setTagState] = useState("all");
  let dispatch = useDispatch();

  // 로컬스토리지에 아이디가 있으면 로그인되어있는 상태로
  useEffect(() => {
    if (localStorage.getItem('id') !== null) {
      dispatch(changeLoginState("true"));
    }
  }, [dispatch])

  // 서버에서 현재 세션 아이디를 받아와서 없으면 로그인상태 해제
  useEffect(() => {
    axios.get("/member/session")
    .then((response) => {
      if (response.data === null) {
        localStorage.removeItem('id');
        dispatch(changeLoginState("false"));
      }
    })
  }, [dispatch])


  // 최근 본 상품 세팅
  useEffect(() => {
    sessionStorage.setItem('watched', JSON.stringify([]))
  }, [])


  return (
    <div className="container">
      <Header setTagState={setTagState} />
      <div className="container_middle">
        <Routes>
          <Route path="/" element={<IncludeSide setTagState={setTagState} />}>
            <Route path="/" element={<Contents tagState={tagState} />} />
            <Route path="/spring" element={<Contents tagState={tagState} />} />
            <Route path="/summer" element={<Contents tagState={tagState} />} />
            <Route path="/fall" element={<Contents tagState={tagState} />} />
            <Route path="/winter" element={<Contents tagState={tagState} />} />
            <Route path="/product/view/:product" element={<View />} />
          </Route>
          <Route path="/join" element={<Join />} />
          <Route path="/updatePage" element={<UpdatePage />} />
          <Route path="/deleteChk" element={<DeleteChk />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/myOrder" element={<MyOrder />} />
          <Route path="/productInsert" element={<ProductInsert />} />
          <Route path="/productUpdate" element={<ProductUpdate />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

function IncludeSide(props) {
  return (
    <div className="container_includeSide">
      <Side setTagState={props.setTagState} />
      <WatchedBox />
      <Outlet></Outlet>
    </div>
  )
}

function WatchedBox() {

  let [watchedArray, setWatchedArray] = useState([]);
  let reduxstate = useSelector((state) => { return state });

  useEffect(() => {
    setWatchedArray(JSON.parse(sessionStorage.getItem('watched')));
  }, [reduxstate.updateWatched])

  return (
    <div className="container_watchedbox">
      <div className="watchedBox">
        <div className='watchedBoxTitle'>
          최근 본
        </div>
        {
           watchedArray && watchedArray.map((productCode, i) => {
            return (
              <WatchedImage productCode={productCode} key={i+"watched"+productCode} />
            )
          })
        }
      </div>
    </div>
  )
}

function WatchedImage(props) {

  let reduxstate = useSelector((state) => { return state })
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [fruit, setFruit] = useState({});


  useEffect(() => {
    axios.get("/product/view/" + props.productCode)
      .then((response) => {
        setFruit(response.data)
      })
  }, [props.productCode])

  return (
    <div className='watchedImageBox' onClick={() => {
      sessionStorage.setItem('productCode', fruit.productCode)
      navigate('/product/view/' + fruit.productCode)
      dispatch(changeWatchedState(!reduxstate.watchedState))
    }} >
      <img src={"http://13.124.91.28:8080/pdImages/" + fruit.thumbnail} alt="" id="watchedImage" />
    </div>
  )
}