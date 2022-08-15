import io from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import "./ReadyButton.css";

const ButtonCo = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#A6095D"),
  lineHeight: "44px",
  borderRadius: "30px",
  fontSize: "22px",
  padding: "9.5px 16px",
  // height: 40px;
  // padding: 0 14px 0 0;
  position: "absolute",
  bottom: 0,
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
    y: "200px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};
const socket = io.connect("http://localhost:4000");

function ReadyButton(props) {
  const [count, setCount] = useState(0);
  const [disable, setDisable] = useState(false);
  const [open, setOpen] = useState(false);

  const participantNum = props.participantNum;
  useEffect(() => {
    socket.emit("getCount");
  }, []);
  socket.on("getCount", (cnt) => {
    setCount(cnt.count);
  });
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
    if (cnt.count === participantNum && count > 1) {
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
        준비완료 : {count}/{props.participantNum}
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
          >
            <motion.div className="modal" variants={modal}>
              <p> 자기 소개 시간!</p>
              <div>
                약 5분간 자기 소개를 시작합니다! 각자 자기 소개를 마음껏
                해주세요! 이후 첫인상 선택이 이루어질 예정이니 적극적으로
                참여하여 상대방에게 나의 매력을 어필하세요!
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ReadyButton;
