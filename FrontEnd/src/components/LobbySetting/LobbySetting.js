import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_action";
// import { useParams, useLocation, useNavigate } from "react-router-dom";

import { alpha, styled } from "@mui/material/styles";
import logo_ani from "../../assets/logo_ani.gif";
import MemberPage from "../Common/MemberPage";
import Footer from "../Common/Footer";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
  color: theme.palette.getContrastText("#beaee2"),
  lineHeight: "44px",
  borderRadius: "30px",
  fontSize: "22px",
  padding: "9.5px 16px",
  // background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  backgroundColor: "#beaee2",
  "&:hover": {
    // backgroundColor: "#A6095D",
    background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  },
}));

const TextFieldLogin = styled(TextField)({
  "& .MuiFormLabel-root": {
    color: "#141414", // 클릭전 텍스트
    left: "0.5%",
    top: "7%",
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

function LobbySetting(props) {
  // const params = useParams();
  // const location = useLocation();
  // const navigate = useNavigate();

  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("발싸ㅣ");

    let body = {
      id: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      console.log("DDD0");
      console.log(response.payload.message);

      if (response.payload.message === "Success") {
        props.navigate("/");
        // 토큰을 세선저장소에 저장
      } else {
        alert('Error"');
      }
    });
  };

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
          <img
            alt="logo_ani"
            src={logo_ani}
            style={{
              maxWidth: "200px",
              width: "40vw",
              borderRadius: "50%",
            }}
          />

          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={onSubmitHandler}
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
                value={Email}
                onChange={onEmailHandler}
                id="email"
                label="아이디"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                // sx={{ mx: "auto" }}
              />
              <TextFieldLogin
                margin="normal"
                fullWidth
                value={Password}
                onChange={onPasswordHandler}
                id="password"
                name="password"
                label="비밀번호"
                type="password"
                autoComplete="current-password"
              />

              <ButtonCo
                onClick={onSubmitHandler}
                fullWidth
                variant="contained"
                sx={{ mb: 3 }}
              >
                <b>시작</b>
              </ButtonCo>
            </Box>
          </form>
          <Typography align="center">
            <Link href="#" underline="hover" variant="h6" color="inherit">
              회원이 아니신가요? <b>지금 가입하세요</b>
            </Link>
            <br></br>
            <Link
              href="#"
              underline="hover"
              variant="subtitle2"
              color="inherit"
            >
              아이디 혹은 비밀번호 찾기
            </Link>
          </Typography>
        </Box>
      </Container>
      <Footer sx={{ mt: 5, mb: 3 }} />;
    </div>
  );
}

export default LobbySetting;
