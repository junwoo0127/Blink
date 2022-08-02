import React, { useEffect } from "react";
import axios from "axios";
import style from "./LandingPage.css";
// import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";

function LandingPage(props) {
  // const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/hello");
  }, []);

  const onClickHandler = () => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        props.navigate("/login");
      } else {
        alert("로그아웃실패!");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <Typography component="h1" variant="h5">
        안녕하세요 ~~ 홍길동님
        <button onClick={onClickHandler}>로그아웃</button>
      </Typography>
    </div>
  );
}

export default LandingPage;
