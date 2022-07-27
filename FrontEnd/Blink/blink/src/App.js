import Main from "./routes/Main";
import VideoRoomComponent from "./components/VideoRoomComponent";

import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import Auth from "./hoc/auth";

function App() {
  const NLandinPage = Auth(LandingPage, null);
  const NLoginPage = Auth(LoginPage, false);
  const NRegisterPage = Auth(RegisterPage, false);

  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">About</Link>
          </li>
          <li>
            <Link to="/join">Join</Link>
          </li>
        </ul>

        <hr />

        {/* 기본주소 로그인관련으로 수정 (기존/*=>/join) */}

        <Routes>
          <Route path="/*" element={<NLandinPage />} />

          <Route path="/login" element={<NLoginPage />} />

          <Route path="/join" element={<Main />} />

          <Route path="/videoroom" element={<VideoRoomComponent />} />

          <Route path="/register" element={<NRegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
