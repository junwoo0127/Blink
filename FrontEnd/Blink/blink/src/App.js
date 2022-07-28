import Main from "./routes/Main";
import VideoRoomComponent from "./components/VideoRoomComponent";

import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        {/* 기본주소 로그인관련으로 수정 (기존/*=>/join) */}

        <Routes>
          <Route path="/" element={<Main />} />

          <Route path="/videoroom" element={<VideoRoomComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
