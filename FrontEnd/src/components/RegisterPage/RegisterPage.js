import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser, check_id } from "../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  backgroundColor: "#A6095D",
  "&:hover": {
    backgroundColor: "#A6095D",
  },
}));

const Grid1 = styled(Grid)({
  "& .MuiGrid-root": {
    margin: "auto 0px auto 0px ",
    "& .MuiButtonBase-root": {
      // 안에 작성할 텍스트
      margin: "16px 0px 8px 8px ",
    },
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

function RegisterPage(props) {
  // const params = useParams();
  // const location = useLocation();
  // const navigate = useNavigate();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [check, setCheck] = useState(false);

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onIdHandler = (event) => {
    setId(event.currentTarget.value);
    setCheck(false);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const isEmail = (email) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return emailRegex.test(email);
  };
  const onClick = () => {
    navigate("/login");
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onCheckid = (event) => {
    console.log(Id);
    event.preventDefault();
    console.log(check);
    let body = {
      id: Id,
    };
    dispatch(check_id(body)).then((response) => {
      console.log(response);
      if (response.payload.message != "fail") {
        alert("중복아이디입니다");
        setId("");
      } else {
        alert("사용가능한 아이디입니다!");
        setCheck(true);
        console.log(check);
      }
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호가 일치하지않습니다.");
    }
    if (!check) {
      return alert("아이디 중복확인을 진행해 주세요");
    }
    if (!isEmail(Email)) {
      setEmail("");
      return alert("이메일 형식을 지켜주세요");
    }

    let body = {
      email: Email,
      id: Id,
      password: Password,
    };
    console.log(body);

    dispatch(registerUser(body))
      .then((response) => {
        alert("회원가입에 성공했습니다!!");
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.statusCode == 403) {
          alert("이미 가입된 이메일입니다");
          setEmail("");
        }
      });
  };

  return (
    <div>
      <MemberPage></MemberPage>
      <Container component="main" maxWidth="md">
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
            <Grid1 container>
              <Grid item xs>
                <TextFieldLogin
                  margin="normal"
                  fullWidth
                  value={Id}
                  onChange={onIdHandler}
                  id="id"
                  label="아이디"
                  name="id"
                  type="id"
                  autoComplete="id"
                  autoFocus
                />
              </Grid>
              <Grid item>
                <ButtonCo
                  onClick={onCheckid}
                  fullWidth
                  variant="contained"
                  sx={{
                    padding: {
                      xs: "9.5px 30px",
                      sm: "9.5px 50px",
                      md: "9.5px 70px",
                    },
                  }}
                  style={{
                    boxShadow: "none",
                  }}
                >
                  <b>중복확인</b>
                </ButtonCo>
              </Grid>
            </Grid1>
            {/* container spacing={1} 1=4px */}
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextFieldLogin
                  margin="normal"
                  fullWidth
                  value={Password}
                  onChange={onPasswordHandler}
                  id="password"
                  name="password"
                  label="비밀번호"
                  type="password"
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldLogin
                  margin="normal"
                  fullWidth
                  value={ConfirmPassword}
                  onChange={onConfirmPasswordHandler}
                  id="password"
                  name="password"
                  label="비밀번호확인"
                  type="password"
                />
              </Grid>
            </Grid>

            <TextFieldLogin
              margin="normal"
              fullWidth
              value={Email}
              onChange={onEmailHandler}
              id="email"
              name="email"
              label="이메일"
              type="email"
            />
            <br></br>
            <ButtonCo
              onClick={onSubmitHandler}
              fullWidth
              variant="contained"
              sx={{ mb: 3 }}
            >
              <b>회원가입</b>
            </ButtonCo>
          </form>{" "}
          <Typography align="center">
            <Link
              onClick={onClick}
              underline="hover"
              variant="h6"
              color="inherit"
            >
              회원이신가요? <b>로그인하기</b>
            </Link>
            <br></br>
          </Typography>
        </Box>
      </Container>
      <Footer sx={{ mt: 5, mb: 3 }} />;
    </div>
  );
}

export default RegisterPage;
