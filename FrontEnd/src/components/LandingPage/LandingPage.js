import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
import MemberPage from "../Common/MemberPage";
import Footer from "../Common/Footer";
import { getUser } from "../../_actions/user_action";
import { useDispatch } from "react-redux";

function LandingPage(props) {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get("/api/hello");
  // }, []);
  const user = useSelector((state) => state.user.loginSuccess);
  const token = localStorage.getItem("token");
  const [info, setinfo] = useState("");
  const dispatch = useDispatch();
  console.log(token);
  if (token != null) {
    let token_me = "Bearer " + token;
    dispatch(getUser(token_me)).then((response) => {
      console.log(response.payload.data.userId);
      setinfo(response.payload.data.userId);
      console.log(info);
    });
  }

  const onClickHandler = () => {
    // axios.get("/api/users/logout").then((response) => {
    //   if (response.data.success) {
    //     props.navigate("/login");
    //   } else {
    //     alert("로그아웃실패!");
    //   }
    // });
    localStorage.removeItem("token");
    setinfo("");
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
        {/* <div>{user.loginSuccess.accessToken}</div> */}
        {info === "" ? (
          <h1>로그인해주세요</h1>
        ) : (
          <Typography component="h1" variant="h5">
            안녕하세요 ~~ {info} 님
            <button onClick={onClickHandler}>로그아웃</button>
          </Typography>
        )}
      </div>
      <Footer sx={{ mt: 5, mb: 3 }} />;
    </div>
  );
}

export default LandingPage;
