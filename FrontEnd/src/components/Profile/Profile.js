import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_action";

import { styled } from "@mui/material/styles";

import MemberPage from "../Common/MemberPage";
import Footer from "../Common/Footer";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";

import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

import Select from "@mui/material/Select";

// 칸칸 24px

// 검      #141414v
// 흰글씨  #F3F3F3
// 회글씨  #686868

//  나중에 버튼 정보수정or 비밀번호변경 1개 만 남기고
//  로그아웃이랑 grid 반반 가르기 추천

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

const Grid1 = styled(Grid)({
  "& .MuiGrid-root": {
    margin: "auto 10px auto 0px ",
  },
});

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

const FormControlLabel1 = styled(FormControlLabel)({
  "& .MuiTypography-root": {
    fontSize: "22px",
  },
});

// mbti 이상형
const FormControl1 = styled(FormControl)({
  "& .MuiFormLabel-root": {
    color: "#141414", // 클릭전 텍스트 평소
    left: "0.5%",
    top: "7%",
    // textAlign: "center !important",
  },
  "& label.Mui-focused": {
    color: "#ffffff", // 클릭후 올라갈때 텍스트
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

function Lobby(props) {
  const [mbti, setMbti] = React.useState("");
  const [fav, setFav] = React.useState("");

  const mbtiHandle = (event) => {
    setMbti(event.target.value);
  };

  const favHandle = (event) => {
    setFav(event.target.value);
  };

  return (
    <div>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        {/* 방장이면 보임 */}

        <div>
          <Typography
            align="center"
            sx={{ mt: 2 }}
            style={{ fontSize: "22px" }}
          >
            인적사항
          </Typography>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            // onSubmit={onSubmitHandler}
          >
            <Box
              noValidate
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",

                border: "1.5px solid #beaee2",
                borderRadius: "10px",
              }}
              style={{
                justifyContent: "center",
              }}
            >
              <Grid container>
                <Grid item xs={3} style={{ margin: " 16px auto  8px" }}>
                  <Typography
                    align="center"
                    sx={{}}
                    style={{ margin: "16px auto  8px", fontSize: "22px" }}
                  >
                    닉네임
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextFieldLogin
                    margin="normal"
                    fullWidth
                    // value={Email}
                    // onChange={onEmailHandler}
                    id="email"
                    label="닉네임을 입력해주세요 (10글자 이하)"
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    style={{}}
                  />
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>{" "}
              <Grid container sx={{ mb: 1 }}>
                <Grid item xs={3} style={{ margin: " auto" }}>
                  <Typography
                    align="center"
                    sx={{}}
                    style={{ margin: " ", fontSize: "22px" }}
                  >
                    성별
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <FormControl style={{ margin: " auto 20px " }}>
                    {/* <FormLabel id="demo-row-radio-buttons-group-label">
                        Gender
                      </FormLabel> */}
                    <RadioGroup
                      row
                      // aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel1
                        value="boy"
                        control={<Radio />}
                        label="남"
                      />
                      <FormControlLabel1
                        value="girl"
                        control={<Radio />}
                        label="여"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
              <Grid container sx={{ mb: 1 }}>
                <Grid item xs={3} style={{ margin: " auto" }}>
                  <Typography
                    align="center"
                    sx={{}}
                    style={{ margin: " ", fontSize: "22px" }}
                  >
                    혈액형
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <FormControl style={{ margin: " auto 20px " }}>
                    {/* <FormLabel id="demo-row-radio-buttons-group-label">
                        Gender
                      </FormLabel> */}
                    <RadioGroup
                      row
                      // aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel1
                        value="aplus"
                        control={<Radio />}
                        label="A"
                      />
                      <FormControlLabel1
                        value="bplus"
                        control={<Radio />}
                        label="B"
                        style={{ margin: " 0px 16px 0px -4px " }}
                      />{" "}
                      <FormControlLabel1
                        value="oplus"
                        control={<Radio />}
                        label="O"
                        style={{ margin: " 0px 16px 0px -4px " }}
                      />{" "}
                      <FormControlLabel1
                        value="abplus"
                        control={<Radio />}
                        label="AB"
                        style={{ margin: " 0px 16px 0px -4px " }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
              {/*  */}
              <Grid container spacing={2} sx={{}}>
                <Grid item xs={4} style={{ margin: " auto   " }}>
                  <FormControl1
                    fullWidth
                    sx={{}}
                    style={{ margin: " auto 0px auto 20px" }}
                  >
                    <InputLabel id="demo-simple-select-helper-label">
                      MBTI
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={mbti}
                      label="MBTI"
                      onChange={mbtiHandle}
                      style={{ padding: "0px 30px" }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>ENFJ</MenuItem>
                      <MenuItem value={2}>ENTJ</MenuItem>
                      <MenuItem value={3}>ENFP</MenuItem>
                      <MenuItem value={4}>ENTP</MenuItem>
                      <MenuItem value={5}>ESFP</MenuItem>
                      <MenuItem value={6}>ESFJ</MenuItem>
                      <MenuItem value={7}>ESTP</MenuItem>
                      <MenuItem value={8}>ESTJ</MenuItem>
                      <MenuItem value={9}>INFP</MenuItem>
                      <MenuItem value={10}>INFJ</MenuItem>
                      <MenuItem value={11}>INTP</MenuItem>
                      <MenuItem value={12}>ISTP</MenuItem>
                      <MenuItem value={13}>ISFP</MenuItem>
                      <MenuItem value={14}>ISFJ</MenuItem>
                      <MenuItem value={15}>ISTJ</MenuItem>
                      <MenuItem value={16}>INTJ</MenuItem>
                    </Select>
                    {/* <FormHelperText>With label + helper text</FormHelperText> */}
                  </FormControl1>
                </Grid>

                <Grid item xs={6.5} style={{ margin: " auto  " }}>
                  {" "}
                  <FormControl1 fullWidth sx={{}} style={{ margin: " auto  " }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      이상형
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={fav}
                      label="이상형"
                      onChange={favHandle}
                      style={{ padding: "0px 30px" }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    {/* <FormHelperText>With label + helper text</FormHelperText> */}
                  </FormControl1>
                </Grid>
                <Grid item xs={0.5}></Grid>
              </Grid>
              <Grid container sx={{ mb: 2 }}>
                <Grid item xs={3} style={{ margin: " 16px auto  8px" }}>
                  <Typography
                    align="center"
                    sx={{}}
                    style={{ margin: "16px auto  8px", fontSize: "22px" }}
                  >
                    취미
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextFieldLogin
                    margin="normal"
                    fullWidth
                    // value={Email}
                    // onChange={onEmailHandler}
                    id="email"
                    label="간단하게 취미를 입력해주세요 (이하)"
                    name="email"
                    type="email"
                    autoComplete="email"
                    autoFocus
                    style={{}}
                  />
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>{" "}
            </Box>
          </form>
        </div>
        <ButtonCo
          //   onClick={onSubmitHandler}
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
        >
          <b> 회원 정보 수정 </b>
        </ButtonCo>

        <ButtonCo
          //   onClick={onSubmitHandler}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 3 }}
        >
          <b> 비밀번호 변경 </b>
        </ButtonCo>
        <ButtonCo
          //   onClick={onSubmitHandler}
          fullWidth
          variant="contained"
          sx={{ mb: 3 }}
        >
          <b> 로그 아웃 </b>
        </ButtonCo>
        <Typography align="center">
          <Link href="#" underline="hover" variant="h6" color="inherit">
            도움이 필요 하신가요? <b>문의 하기</b>
          </Link>
          <br></br>
          <Link href="#" underline="hover" variant="subtitle2" color="inherit">
            회원탈퇴
          </Link>
        </Typography>
      </Container>
      <Footer sx={{ mt: 5, mb: 3 }} />;
    </div>
  );
}

export default Lobby;
