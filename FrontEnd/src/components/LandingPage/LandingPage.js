import React, { useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

import { Typography } from "@mui/material";
import MemberPage from "../common/MemberPage";
import Footer from "../common/Footer";

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
    <div>
      <MemberPage></MemberPage>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Typography component="h1" variant="h5">
          안녕하세요 ~~ 홍길동님
          <button onClick={onClickHandler}>로그아웃</button>
        </Typography>
      </div>
      <Footer sx={{ mt: 5, mb: 3 }} />;
    </div>
  );
}

export default LandingPage;
