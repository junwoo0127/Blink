import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/user_action";
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

  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인 불일치");
    }

    let body = {
      email: Email,
      name: Name,
      password: Password,
      confirmpassword: ConfirmPassword,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.Success) {
        props.navigate("/login");
      } else {
        alert('회원가입 실패용"');
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
                  // value={Email}
                  // onChange={onEmailHandler}
                  id="email"
                  label="아이디"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item>
                <ButtonCo
                  onClick={onSubmitHandler}
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
                  // value={Password}
                  // onChange={onPasswordHandler}
                  id="password"
                  name="password"
                  label="비밀번호"
                  type="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={6}>
                <TextFieldLogin
                  margin="normal"
                  fullWidth
                  // value={Password}
                  // onChange={onConfirmPasswordHandler}
                  id="password"
                  name="password"
                  label="비밀번호확인"
                  type="password"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>

            <TextFieldLogin
              margin="normal"
              fullWidth
              // value={Password}
              // onChange={onEmailHandler}
              id="password"
              name="password"
              label="이메일"
              type="password"
              autoComplete="current-password"
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
            <Link href="#" underline="hover" variant="h6" color="inherit">
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
