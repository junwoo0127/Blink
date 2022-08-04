import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// style
import "./App.css";

// src
import VideoRoomComponent from "./components/VideoRoomComponent";
import Footer from "./components/Footer/Footer";
import LandingPage from "./components/LandingPage/LandingPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";

import ResponsiveAppBar from "./components/ResponsiveAppBar/ResponsiveAppBar";
import Lobby from './components/Lobby/Lobby'
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
    // 푸터 랑 네브바 특정 페이지만 if문주기 안되면 각각연결
    <Router>
      <div>
        {/* <ResponsiveAppBar></ResponsiveAppBar> */}
        <Routes>
          <Route path="/*" element={<NLandinPage />} />

          <Route path="/login" element={<NLoginPage />} />

          <Route path="/join" element={<Main />} />
          
          <Route path="/videoroom" element={<VideoRoomComponent />} />

          <Route path="/register" element={<NRegisterPage />} />

          <Route path="/lobby" element={<Lobby/>}/>
        </Routes>
        <Footer sx={{ mt: "130px", mb: 3 }} />
      </div>
    </Router>
  );
}

export default App;
