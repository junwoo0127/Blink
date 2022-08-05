import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import io from "socket.io-client";
import axios from "axios";
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
const socket = io.connect("http://localhost:4000");
export default function GameIntro(props) {
  //variables
  const role = props.role;
  const [open, setOpen] = useState(props.open);
  const [open2, setOpen2] = useState(false);
  const [gameReady, setGameReady] = useState(0);
  const [openGame, setOpenGame] = useState(false);
  //function
  const onClick = () => {
    setOpen(false);
    setOpen2(true);
  };
  const onClick2 = () => {
    socket.emit("gameReady");
    socket.on("gameReady", (cnt) => {
      setGameReady(cnt.gameReady);
    });
  };
  useEffect(() => {
    if (gameReady === props.participantNum) {
      setOpen2(false);
      props.setGameStart();
    }
  });
  const interval = useRef(null);
  useEffect(() => {
    interval.current = setInterval(() => {
      socket.emit("gameReadyCount");
    }, 2000);
    return () => clearInterval(interval.current);
  }, []);
  socket.on("gameReadyCount", (cnt) => {
    console.log("참가자 수 ", props.participantNum);
    setGameReady(cnt.gameReady);
  });

  useEffect(() => {
    if (gameReady == props.participantNum) {
      clearInterval(interval.current);
    }
  }, [gameReady]);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            MBTI를 맞춰라!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            약 00초 뒤에 맞춰라 게임을 시작하겠뜸! 설명설명설명설명 잠시 후
            나오는 자신의 역할을 확인하고 모두가 준비완료를 하면 시작합니다!
          </Typography>
          <button onClick={onClick}>역할 확인하기</button>
        </Box>
      </Modal>
      <Modal
        open={open2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            당신의 역할은?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {role} 입니다!
          </Typography>
          <button onClick={onClick2}>준비완료 {gameReady}/8</button>
        </Box>
      </Modal>
    </div>
  );
}
