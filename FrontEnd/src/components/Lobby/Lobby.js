import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser, makeRoom, enterRoom } from "../../_actions/user_action";
import { useSelector } from "react-redux";

import { styled } from "@mui/material/styles";

import MemberPage from "../Common/MemberPage";
import Footer from "../Common/Footer";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
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
import queryString from "query-string";
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
    top: " ",
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
  const [mbti, setMbti] = useState("");

  const [subject, setSubject] = useState("");
  const [nickname, setNickname] = useState("");
  const [personnel, setPersonnel] = useState("");
  const [gender, setGender] = useState("");
  const [blood, setBlood] = useState("");
  const [mytype, setMytype] = useState("");
  const [hobby, setHobby] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMaster = useSelector((state) => state.user.isParticipate);
  const token = "Bearer " + localStorage.getItem("token");
  const qs = queryString.parse(window.location.search);
  console.log(isMaster);

  const mbtiHandle = (event) => {
    setMbti(event.target.value);
  };

  const nicknameHandle = (event) => {
    setNickname(event.target.value);
  };

  const subjectHandle = (event) => {
    setSubject(event.target.value);
  };

  const personnelHandle = (event) => {
    console.log(event.target.value);
    setPersonnel(event.target.value);
    console.log(personnel);
  };

  const genderHandle = (event) => {
    setGender(event.target.value);
  };

  const bloodHandle = (event) => {
    setBlood(event.target.value);
  };

  const mytypeHandle = (event) => {
    setMytype(event.target.value);
  };

  const hobbyHandle = (event) => {
    setHobby(event.target.value);
  };

  const onSubmitHandler = () => {
    if (isMaster) {
      if (
        subject == "" ||
        nickname == "" ||
        personnel == "" ||
        gender == "" ||
        blood == "" ||
        mytype == "" ||
        hobby == ""
      ) {
        alert("빈칸을 모두 작성해주세요");
        return;
      } else {
        let body = {
          room: {
            url: "",
            roomSize: 1,
          },
          player: {
            nickname: nickname,
            gender: gender,
            mbti: mbti,
            type: "",
            hobby: hobby,
          },
        };
        dispatch(makeRoom(body, token)).then((response) => {
          navigate("/videoroom");
        });
      }
    } else if (!isMaster) {
      if (
        nickname == "" ||
        gender == "" ||
        blood == "" ||
        mytype == "" ||
        hobby == ""
      ) {
        alert("빈칸을 모두 작성해주세요");
        return;
      } else {
        let body = {
          room: {
            url: qs.room.split("_")[0],
          },
          player: {
            nickname: nickname,
            gender: gender,
            mbti: mbti,
            type: "",
            hobby: hobby,
          },
        };
        dispatch(enterRoom(body)).then((response) => {
          navigate("/videoroom");
        });
      }
    } else {
      alert("비정상적 접근입니다!");
      navigate("/home");
    }
  };

  return (
    <div>
      <MemberPage></MemberPage>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        {/* 방장이면 보임 */}
        {isMaster ? (
          <div>
            <Typography align="center" style={{ fontSize: "22px" }}>
              방 정보
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

                  border: "1.5px solid #A6095D",
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
                      방 제
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <TextFieldLogin
                      margin="normal"
                      fullWidth
                      value={subject}
                      onChange={subjectHandle}
                      id="subject"
                      label="방제를 입력해주세요"
                      name="subject"
                      type="text"
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
                      인원수
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
                          value="2"
                          control={<Radio />}
                          label="2 : 2"
                          onChange={personnelHandle}
                        />
                        <FormControlLabel1
                          value="3"
                          control={<Radio />}
                          onChange={personnelHandle}
                          label="3 : 3"
                        />
                        <FormControlLabel1
                          value="4"
                          control={<Radio />}
                          onChange={personnelHandle}
                          label="4 : 4"
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={1}></Grid>
                </Grid>
              </Box>
            </form>
          </div>
        ) : (
          // 방장아니면 안보여줌!
          <div></div>
        )}

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

                border: "1.5px solid #A6095D",
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
                    value={nickname}
                    onChange={nicknameHandle}
                    id="ni"
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
                        value="M"
                        control={<Radio />}
                        onChange={genderHandle}
                        label="남"
                      />
                      <FormControlLabel1
                        value="F"
                        control={<Radio />}
                        onChange={genderHandle}
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
                        value="a"
                        control={<Radio />}
                        onChange={bloodHandle}
                        label="A"
                      />
                      <FormControlLabel1
                        value="b"
                        control={<Radio />}
                        label="B"
                        onChange={bloodHandle}
                        style={{ margin: " 0px 16px 0px -4px " }}
                      />{" "}
                      <FormControlLabel1
                        value="o"
                        control={<Radio />}
                        label="O"
                        onChange={bloodHandle}
                        style={{ margin: " 0px 16px 0px -4px " }}
                      />{" "}
                      <FormControlLabel1
                        value="ab"
                        control={<Radio />}
                        label="AB"
                        onChange={bloodHandle}
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
                      <MenuItem value="ENFJ">ENFJ</MenuItem>
                      <MenuItem value="ENTJ">ENTJ</MenuItem>
                      <MenuItem value="ENFP">ENFP</MenuItem>
                      <MenuItem value="ENTP">ENTP</MenuItem>
                      <MenuItem value="ESFP">ESFP</MenuItem>
                      <MenuItem value="ESFJ">ESFJ</MenuItem>
                      <MenuItem value="ESTP">ESTP</MenuItem>
                      <MenuItem value="ESTJ">ESTJ</MenuItem>
                      <MenuItem value="INFP">INFP</MenuItem>
                      <MenuItem value="INFJ">INFJ</MenuItem>
                      <MenuItem value="INTP">INTP</MenuItem>
                      <MenuItem value="ISTP">ISTP</MenuItem>
                      <MenuItem value="ISFP">ISFP</MenuItem>
                      <MenuItem value="ISFJ">ISFJ</MenuItem>
                      <MenuItem value="ISTJ">ISTJ</MenuItem>
                      <MenuItem value="INTJ">INTJ</MenuItem>
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
                      value={mytype}
                      label="이상형"
                      onChange={mytypeHandle}
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
                    value={hobby}
                    onChange={hobbyHandle}
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
          sx={{ mt: 3, mb: 3 }}
          onClick={onSubmitHandler}
        >
          {/* 로그인 무관  링크만들 방장  or 링크로 접속한 참가자  */}
          {isMaster ? <b> 방 생성 </b> : <b>참가 </b>}
        </ButtonCo>
        {/* <Typography align="center">
          <Link href="#" underline="hover" variant="h6" color="inherit">
            회원이 아니신가요? <b>지금 가입하세요</b>
          </Link>
          <br></br>
          <Link href="#" underline="hover" variant="subtitle2" color="inherit">
            아이디 혹은 비밀번호 찾기
          </Link>
        </Typography> */}
      </Container>
      <Footer sx={{ mt: 5, mb: 3 }} />;
    </div>
  );
}

export default Lobby;
