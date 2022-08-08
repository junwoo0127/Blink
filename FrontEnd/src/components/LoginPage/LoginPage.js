import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_action";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


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

function LoginPage(props) {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();

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

    dispatch(loginUser(body))
    .then((response) => {
      console.log(response.payload.data.accessToken);
      localStorage.setItem("token", response.payload.data.accessToken);
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
      let error_code = error.response.data.message;
      if (error_code === "Invalid Id") {
        alert("잘못된 아이디입니다");
        window.location.replace("/login");
      } else {
        alert("이메일 인증을 진행해 주세요!");
        // window.location.replace("/login");
      }
      console.log(error.response.data.message);
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
              <Grid1 container>
                <Grid item xs>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="로그인 정보 저장"
                    style={{ marginLeft: "5px" }}
                  />
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    underline="hover"
                    variant="subtitle2"
                    color="inherit"
                  >
                    도움이 필요하신가요?
                  </Link>
                </Grid>
              </Grid1>
              <ButtonCo
                onClick={onSubmitHandler}
                fullWidth
                variant="contained"
                sx={{ mb: 3 }}
              >
                <b>로그인</b>
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

// {1 === 1 ? (   1 === 1 ? (  ) : (   )   ) : (       )}

//  나란히 링크 만들때 참고
//             <Grid container>
//               <Grid item xs>
//                 <Link href="#" variant="body2">
//                   아이디 혹은 비밀번호 찾기
//                 </Link>
//               </Grid>
//               <Grid item>
//                 <Link href="#" variant="body2">
//                   {"Don't have an account? Sign Up"}
//                 </Link>
//               </Grid>
//             </Grid>
