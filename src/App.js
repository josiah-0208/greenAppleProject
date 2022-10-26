import './App.css';
import Side from './parts/Side';
import Header from './parts/Header';
import Contents from './parts/Contents';
import Footer from './parts/Footer';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import dataProducts from './dataProducts';

function App() {

  let [tagState, setTagState] = useState("");
  console.log("다시?");
  return (
    <div className="container">
      <Header />
      <div className="container_middle">
        <Side setTagState={setTagState}/>
        <Routes>
          <Route path="/" element={<Contents tagState={tagState}/>} />
          <Route path="/봄" element={<Contents tagState={tagState}/>} />
          <Route path="/여름" element={<Contents tagState={tagState}/>} />
          <Route path="/가을" element={<Contents tagState={tagState}/>} />
          <Route path="/겨울" element={<Contents tagState={tagState}/>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
