import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_action";
// import { useParams, useLocation, useNavigate } from "react-router-dom";

import { alpha, styled } from "@mui/material/styles";
import logo_ani from "../../assets/logo_ani.gif";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

// 바탕  #141414v
// 흰글씨 #F3F3F3
// 회글씨#686868

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#A6095D"),
  lineHeight: "44px",
  borderRadius: "30px",
  fontSize: "22px",
  backgroundColor: "#A6095D",
  "&:hover": {
    backgroundColor: "#A6095D",
  },
}));

const TextFieldLogin = styled(TextField)({
  textAlign: "center !important",

  "& label.Mui-focused": {
    color: "#141414", // 위로 올라갈때
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& input": {
      // 안에 텍스트
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

function LoginPage(props) {
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

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        props.navigate("/");
      } else {
        alert('Error"');
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          alt="logo_ani"
          src={logo_ani}
          style={{
            width: "100px",
          }}
          sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
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

            {/* 개구림 저장ui 지우고 싶다 */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
              style={{ marginLeft: "10px" }}
            />
            <ColorButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 3 }}
            >
              <b>로그인</b>
            </ColorButton>
            <Typography align="center">
              <Link href="#" underline="hover" variant="h6" color="inherit">
                회원이 아니신가요? <b>회원가입</b>
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

            {/*  나란히 링크 만들때 참고 
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  아이디 혹은 비밀번호 찾기
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </form>
      </Box>
    </Container>
  );
}

export default LoginPage;
// withRouter 잘모르겠다
// 원래는 39번줄 props.history.push 에러 문제로 withRouter강의에서씀
// v6에서 사라짐    랜딩페이지도 마찬가지
//  https://11001.tistory.com/176   https://kyung-a.tistory.com/36 https://adjh54.tistory.com/48
//  데이터 없어서 이해못하고 그냥 비슷하게했는데 맞는지는 나중에 알듯?

// withRouter 를 사용하는 이유는 history 객체에 접근할 수 있게 해서
// props.history 이런식으로 가능하게 해줌
//  auth.js 같은  첫번째 부모 컴포넌트같은경우는
// 이미 history 객체에 접근이 가능 그러기에 withRouter가 필요 X

//  강의 출처 https://inf.run/JZyR
