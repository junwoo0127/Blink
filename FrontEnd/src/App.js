import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// style
import "./App.css";

// src
import VideoRoomComponent from "./components/VideoRoomComponent";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import FindId from "./components/FindId/FindId";
import FindPassword from "./components/FindPassword/FindPassword";
import Profile from "./components/Profile/Profile";
import Lobby from "./components/Lobby/Lobby";
import LobbySetting from "./components/LobbySetting/LobbySetting";

import Auth from "./hoc/auth";

// 고려할만할듯 로딩페이지 처럼
// import Error404 from '../common/error/Error404';
// import Error500 from '../common/error/Error500';

// routes
import Main from "./routes/Main";

function App() {
  const NLandinPage = Auth(LandingPage, null);
  const NLoginPage = Auth(LoginPage, false);
  const NRegisterPage = Auth(RegisterPage, false);

  return (
    <Router>
      <div
        id="FontC"
        style={{
          fontFamily: "CookieR !important",
          cursor:
            "url('https://blog.kakaocdn.net/dn/BQXpN/btq3qNR67Lg/8tx8tGzkOcr5BuX5dyIaKk/img.png')50 50, auto",
        }}
      >
        <Routes>
          <Route path="/*" element={<NLandinPage />} />
          <Route path="/login" element={<NLoginPage />} />
          <Route path="/register" element={<NRegisterPage />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="/lobby" element={<Lobby />} />
          <Route path="/lobbysetting" element={<LobbySetting />} />
          <Route path="/join" element={<Main />} />

          <Route path="/videoroom" element={<VideoRoomComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
