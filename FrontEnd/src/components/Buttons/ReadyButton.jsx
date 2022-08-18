import io from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import "./ReadyButton.css";
import axios from "axios";

import a1 from "../../assets/a1.png";

const ButtonCo = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#beaee2"),
  lineHeight: "30px",
  borderRadius: "30px",
  fontSize: "20px",
  padding: "7px 1px",
  // height: 40px;
  // padding: 0 14px 0 0;
  position: "absolute",
  bottom: "1%",
  left: "37.5%",
  maxWidth: "25%",
  // background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  backgroundColor: "#beaee2",
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
  const handleSelect = () => {
    props.handleSelect();
  };
  socket.on("getReady", (cnt) => {
    setCount(cnt.count);
    console.log("how many clicked", count);
    console.log("how many participants", participantNum);
    if (cnt.count === roomLimit && count > 1) {
      //비교 값이 참가자 수가 아니라 정해놓은 인원수로 해야함
      console.log("start");
      props.onHandleDisplay();
      setTimeout(() => {
        props.setMode(2);
        setOpen(true);
      }, 1000);
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
              <b style={{ fontSize: "30px" }}> 첫 인상 선택 시간!</b>
              <div style={{ fontSize: "20px", marginTop: "2vh" }}>
                자기소개는 잘 하셨나요? 상대방의 소개는 어떠셨나요? 지금부터
                소개만을 듣고 첫 인상을 선택하도록 하겠습니다! 선택하기 버튼을
                누르시고 나면 상대방의 비디오 위에 마우스를 갖다댈 경우 하트가
                생성됩니다. 그리고 누르시면 선택됩니다. 선택은 한 번 하시면
                변경하실 수 없으니 주의하여 주세요!
              </div>
              <ButtonCo
                fullWidth
                variant="contained"
                style={{ fontFamily: "CookieR" }}
                onClick={handleSelect}
              >
                {" "}
                선택하기{" "}
              </ButtonCo>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ReadyButton;
