import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import io from "socket.io-client";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const apiURL = "https://i7a402.p.ssafy.io:8443";
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
};
function Game(props) {
  //variables
  const [question, setQuestion] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [discussCount, setDiscussCount] = useState(0);
  const [answerCount, setAnswerCount] = useState(0);
  //function
  //   useEffect(() => {
  //     axios.get(apiURL + `/game/mbti/${seq}`).then((response) => {
  //       console.log(response.data);
  //     });
  //   });

  const interval = useRef(null);

  //function

  // useEffect(() => {
  //   interval.current = setInterval(() => {
  //     socket.emit("getAnswerCount", props.participantNum);
  //   }, 2000);
  //   return () => clearInterval(interval.current);
  // }, []);
  // socket.on("getAnswerCount", (cnt) => {
  //   setAnswerCount(cnt.answerCount);
  // });

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
  };

  const onNo = () => {
    //no count 1업하기
    socket.emit("no", props.participantNum);
    setDisabled(true);
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
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {/*00번 문제 : 순서가 바뀔때마다 번호도 바꿔줘야함*/}
            문제문제문제
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/*reponse.data를 갈아끼움*/}
            문제문제문제
          </Typography>
          <button onClick={onYes} disabled={disabled}>
            예
          </button>
          <button onClick={onNo} disabled={disabled}>
            아니오
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default Game;
