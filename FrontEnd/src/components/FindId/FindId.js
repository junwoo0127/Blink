import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_action";

import { styled } from "@mui/material/styles";
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

// css 참고 근본 페이지

// 칸칸 24px

// 검      #141414v
// 흰글씨  #F3F3F3
// 회글씨  #686868

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

// style={{ margin: "auto 5px auto 0px !important" }}

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
    // textAlign: "center !important",
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

function FindId(props) {
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
                label="이메일"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                // sx={{ mx: "auto" }}
              />

              <ButtonCo
                // onClick={onSubmitHandler}
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 3 }}
              >
                <b>아이디 찾기</b>
              </ButtonCo>
            </Box>
          </form>
          <Typography align="center">
            <Link href="#" underline="hover" variant="h6" color="inherit">
              비밀번호 찾기
            </Link>
            <br></br>
          </Typography>
        </Box>
      </Container>
      <Footer sx={{ mt: 5, mb: 3 }} />;
    </div>
  );
}

export default FindId;
