import React, { useEffect } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

import { alpha, styled } from "@mui/material/styles";
import logo_ani from "../../assets/logo_ani.gif";
import MemberPage from "../Common/MemberPage";
import Footer from "../Common/Footer";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const ButtonCo = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#A6095D"),
  lineHeight: "44px",
  borderRadius: "30px",
  fontSize: "22px",
  padding: "9.5px 16px",
  // background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  backgroundColor: "#A6095D",
  "&:hover": {
    // backgroundColor: "#A6095D",
    background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  },
}));

const Grid1 = styled(Grid)({
  "& .MuiGrid-root": {
    margin: "auto 10px auto 0px ",
  },
});

const TextFieldLogin = styled(TextField)({
  "& .MuiFormLabel-root": {
    color: "#141414", // 클릭전 텍스트
    left: "0.5%",
    top: "10%",
  },
  "& label.Mui-focused": {
    color: "#ffffff", // 위로 올라간텍스트
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& input": {
      // 안에 작성할 텍스트
      color: "#141414",
      fontSize: "21px",
    },
    "& fieldset": {
      borderColor: "white",
      borderRadius: "30px",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});

function LandingPage(props) {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get("/api/hello");
  // }, []);

  // const onClickHandler = () => {
  //   axios.get("/api/users/logout").then((response) => {
  //     if (response.data.success) {
  //       props.navigate("/login");
  //     } else {
  //       alert("로그아웃실패!");
  //     }
  //   });
  // };
  // <div
  //   style={{
  //     display: "flex",
  //     justifyContent: "center",
  //     alignItems: "center",
  //     width: "100%",
  //     height: "100vh",
  //   }}
  // >
  //   <Typography component="h1" variant="h5">
  //     안녕하세요 ~~ 홍길동님
  //     <button onClick={onClickHandler}>로그아웃</button>
  //   </Typography>
  // </div>
  return (
    <div>
      <MemberPage></MemberPage>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          style={{
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              // width: "40vw",
              maxWidth: "175px",
              // height: "40vw",
              maxHeight: "175px",
              overflow: "hidden",
              borderRadius: "50%",
            }}
          >
            <img
              alt="logo_ani"
              src={logo_ani}
              style={{
                maxWidth: "350px",
                width: "350px",
                marginLeft: "-50%",
                marginTop: "-10%",
              }}
            />
          </div>

          <form
            style={{ display: "flex", flexDirection: "column" }}
            // onSubmit={onSubmitHandler}
          >
            {/* 로그인 x : 로그인 o 상태 */}
            {1 === 1 ? (
              <div>
                <Box
                  component="form"
                  // onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextFieldLogin
                    margin="normal"
                    fullWidth
                    // value={Email}
                    // onChange={onEmailHandler}
                    id="email"
                    label="참가링크"
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                  />

                  <ButtonCo
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 3 }}
                  >
                    <b>참가</b>
                  </ButtonCo>

                  <Typography align="center">
                    <Link
                      href="#"
                      underline="hover"
                      variant="h6"
                      color="inherit"
                    >
                      방을 만들고 싶으세요? <b>로그인하기</b>
                    </Link>
                  </Typography>
                </Box>
              </div>
            ) : 1 === 1 ? (
              // 이메일 인증완료
              <div>
                {" "}
                <Typography
                  component="h3"
                  variant="h5"
                  style={{ textAlign: "center", margin: "30px auto 0px" }}
                >
                  어서오세요, 홍길동 님!
                </Typography>
                <TextFieldLogin
                  margin="normal"
                  fullWidth
                  // value={}
                  // onChange={onEmailHandler}
                  id="link"
                  label="참가링크"
                  name="link"
                  type="link"
                  autoComplete="link"
                  autoFocus
                />
                <ButtonCo
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                >
                  <b>참가</b>
                </ButtonCo>{" "}
                <ButtonCo
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 3 }}
                >
                  <b>방 생성하기</b>
                </ButtonCo>
                <Typography align="center">
                  <Link href="#" underline="hover" variant="h6" color="inherit">
                    로그아웃
                  </Link>
                </Typography>
              </div>
            ) : (
              // 이메일 인증 안됨
              <div>
                <Typography
                  component="h3"
                  variant="h5"
                  style={{ textAlign: "center", margin: "30px auto 0px" }}
                >
                  어서오세요, 홍길동 님!
                </Typography>
                <TextFieldLogin
                  margin="normal"
                  fullWidth
                  // value={}
                  // onChange={onEmailHandler}
                  id="link"
                  label="회원가입시 작성한 이메일"
                  name="link"
                  type="link"
                  autoComplete="link"
                  autoFocus
                />

                <ButtonCo
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mb: 3 }}
                >
                  <b>인증하기</b>
                </ButtonCo>
                <Typography align="center">
                  <Link href="#" underline="hover" variant="h6" color="inherit">
                    로그아웃
                  </Link>
                </Typography>
              </div>
            )}
          </form>
        </Box>
      </Container>
      <Footer sx={{ mt: 5, mb: 3 }} />;
    </div>
  );
}

export default LandingPage;
