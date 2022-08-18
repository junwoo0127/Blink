import io from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import "./ReadyButton.css";
import axios from "axios";
const ButtonCo = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#A6095D"),
  lineHeight: "30px",
  borderRadius: "30px",
  fontSize: "20px",
  padding: "7px 1px",
  // height: 40px;
  // padding: 0 14px 0 0;
  position: "absolute",
  bottom: "1%",
  left: "35%",
  maxWidth: "30%",
  // background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  backgroundColor: "#A6095D",
  "&:hover": {
    // backgroundColor: "#A6095D",
    background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  },
}));

const backdrop = {
  visible: {
    opacity: 1,
  },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "25vh",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};
const socket = io.connect("http://localhost:4000");
const apiURL = "http://localhost:8080/blink";
function ReadyButton(props) {
  const [count, setCount] = useState(0);
  const [disable, setDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [roomLimit, setRoomLimit] = useState(0);
  const participantNum = props.participantNum;
  useEffect(() => {
    socket.emit("getCount");
  }, []);
  socket.on("getCount", (cnt) => {
    setCount(cnt.count);
  });
  useEffect(() => {
    try {
      axios
        .get(apiURL + "/api/v1/rooms/roomSize", {
          params: { roomSeq: props.roomSeq },
        })
        .then((res) => setRoomLimit(res.data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  const onClick = (e) => {
    e.preventDefault();
    socket.emit("getReady");
    console.log("clicked");
    setDisable(true);
  };
  socket.on("getReady", (cnt) => {
    setCount(cnt.count);
    console.log("how many clicked", count);
    console.log("how many participants", participantNum);
    if (cnt.count === roomLimit && count > 1) {
      //비교 값이 참가자 수가 아니라 정해놓은 인원수로 해야함
      console.log("start");
      setOpen(true);
      props.onHandleDisplay();
      setTimeout(() => {
        setOpen(false);
        props.setMode(1);
      }, 5000);
    }
  });
  socket.on(
    "leaveSession",
    (
      count,
      firstCount,
      gameReady,
      answerCount,
      discussCount,
      finalCount,
      gameSetCount
    ) => {
      setCount(0);
    }
  );

  return (
    <>
      <ButtonCo
        fullWidth
        variant="contained"
        sx={{}}
        onClick={onClick}
        disabled={disable}
        style={{ fontFamily: "CookieR" }}
      >
        준비완료 : {count}/{roomLimit}
        {/* 숫자표시관련 생각 */}
      </ButtonCo>
      <AnimatePresence exitBeforeEnter>
        {open && (
          <motion.div
            className="backdrop"
            variants={backdrop}
            animate="visible"
            initial="hidden"
            exit="hidden"
            style={{ zIndex: "5555" }}
          >
            <motion.div
              className="modal"
              variants={modal}
              style={{
                borderRadius: "3vw",
                border: "1px solid #f7dbf0",
                backgroundColor: "#f7dbf0",
              }}
            >
              <b style={{ fontSize: "30px" }}> 자기 소개 시간!</b>

              <div style={{ fontSize: "20px", marginTop: "2vh" }}>
                1명씩 돌아가며 <p style={{ color: "blue" }}>1분 자기소개</p>를
                진행합니다! 해당하는 사람은 테두리가 강조되며 시간 경과시 바로
                다음 사람으로 넘어갑니다! 제한 시간내에 자신의 첫 매력을
                어필해보세요!!
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ReadyButton;
