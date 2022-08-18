import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import io from "socket.io-client";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useSelector, useDispatch } from "react-redux";
import { increaseCount } from "../../../_reducers/quiz_counter";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import a10 from "../../../assets/a10.png";

const ButtonCo = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#beaee2"),
  // lineHeight: "44px",
  borderRadius: "30px",
  fontSize: "20px",
  color: "white !important",
  // padding: "9.5px 16px",
  // height: 40px;
  // padding: 0 14px 0 0;
  // position: "absolute",
  // top: "100%",
  marginTop: "2vh",
  // left: "30%",
  // maxWidth: "40%",
  // background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  backgroundColor: "#beaee2",
  "&:hover": {
    // backgroundColor: "#A6095D",
    background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  },
}));

const apiURL = "http://localhost:8080";
const socket = io.connect("http://localhost:4000");
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function Game(props) {
  const dispatch = useDispatch();
  const quiz_count = useSelector((state) => state.quiz_counter.count);

  //variables

  const [disabled, setDisabled] = useState(false);

  const [answerCount, setAnswerCount] = useState(0);
  const [quizSeq, setQuizSeq] = useState(0);
  const [quiz, setQuiz] = useState({});
  //function
  useEffect(() => {
    axios
      .get(apiURL + "/blink/api/v1/game/mbti", {
        params: { quizSeq: quiz_count + 1 },
      })
      .then((response) => {
        console.log(response.data);

        console.log(quiz_count);
        setQuiz(response.data);
      });
    dispatch(increaseCount(quiz_count));
    console.log(quiz_count);
    console.log(props.user);
  }, []);

  //function
  const userChanged = () => {
    props.userChanged();
  };
  useEffect(() => {
    if (
      disabled === true &&
      (answerCount == -1 || answerCount == props.participantNum)
    ) {
      console.log("ans", answerCount);
      // clearInterval(interval.current);
      props.setGameEnd();

      setAnswerCount(0);
      setMode(4);
    }
  }, [answerCount]);
  const setMode = (num) => {
    props.setMode(num);
  };
  const onYes = () => {
    socket.emit("yes", props.participantNum);
    setDisabled(true);
    props.user.setAnswer(true);
    props.answerChanged(true);
  };

  const onNo = () => {
    //no count 1업하기
    socket.emit("no", props.participantNum);
    setDisabled(true);
    props.user.setAnswer(false);
    props.answerChanged(false);
  };
  socket.on("yes", (cnt) => {
    setAnswerCount(cnt.answerCount);
    console.log("answercount total:", cnt.answerCount);
  });
  socket.on("no", (cnt) => {
    setAnswerCount(cnt.answerCount);
    console.log("answercount total:", cnt.answerCount);
  });

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{
            borderRadius: "3vw",
            border: "4px solid #f7dbf0",
            backgroundColor: "#f7dbf0",
          }}
          sx={style}
        >
          <img
            alt="a10"
            src={a10}
            style={{ position: "absolute", width: "50px", left: "7%" }}
          />

          <img
            alt="a10"
            src={a10}
            style={{ position: "absolute", width: "50px", left: "83%" }}
          />

          <Typography
            style={{ textAlign: "center", fontSize: "30px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            {quiz_count} 번 문제!
          </Typography>
          <Typography
            style={{ textAlign: "center", fontSize: "20px" }}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            {quiz.question}
          </Typography>

          <div
            style={{
              textAlign: "center",
              marginLeft: "0.5vh",
              marginRight: "0.5vh",
            }}
          >
            <ButtonCo
              style={{ marginLeft: "0.5vh", marginRight: "0.5vh" }}
              onClick={onYes}
              disabled={disabled}
              variant="contained"
            >
              {/* 이미지 가져오기 카훗처럼 */}
              <CheckCircleIcon style={{ color: "#00E7F4 " }} />
              {quiz.answerA}
            </ButtonCo>

            <ButtonCo
              style={{ marginLeft: "0.5vh", marginRight: "0.5vh" }}
              onClick={onNo}
              disabled={disabled}
              variant="contained"
            >
              <CheckCircleIcon style={{ color: "#FFFC19 " }} />
              {quiz.answerB}
            </ButtonCo>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default React.memo(Game);
