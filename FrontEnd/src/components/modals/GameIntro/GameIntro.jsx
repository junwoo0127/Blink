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
  borderRadius: "10px",
};
const socket = io.connect("http://localhost:4000");
export default function GameIntro(props) {
  //variables
  const role = props.role;
  const [open, setOpen] = useState(props.open);
  const [open2, setOpen2] = useState(false);
  const [gameReady, setGameReady] = useState(0);
  const [disabled, setDisabled] = useState(false);
  //function
  const onClick = () => {
    setOpen(false);
    setOpen2(true);
    socket.emit("gameReadyCount");
  };
  socket.on("gameReadyCount", (cnt) => {
    setGameReady(cnt.gameReady);
  });
  const onClick2 = () => {
    socket.emit("gameReady");
    setDisabled(true);
  };
  socket.on("gameReady", (cnt) => {
    setGameReady(cnt.gameReady);
    if (cnt.gameReady === props.participantNum) {
      setOpen2(false);
      props.setGameStart();
    }
  });

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            MBTI를 맞춰라!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p style={{ textAlign: "center", fontSize: "larger" }}>룰 설명</p>
            <div>
              참가자는 <span style={{ color: "red" }}>거짓말쟁이</span>와{" "}
              <span style={{ color: "blue" }}>선량한 사람</span>둘 중 하나의
              역할을 가지게 됩니다.
              <br />
              <span style={{ color: "red" }}>거짓말쟁이</span>는 총 3명으로{" "}
              <span style={{ color: "red" }}>거짓말쟁이</span>들 또한 서로
              누구인지 알 수 없습니다. 문제는 총{" "}
              <span style={{ fontWeight: "bold" }}>4문제</span>이며 각 문제 이후
              약 1분의 토론시간을 갖게 됩니다. <br />
              4번째 토론 시간이 끝난 후{" "}
              <span style={{ color: "red" }}>거짓말쟁이</span>를 지목하게
              됩니다.
              <br />
              <span style={{ color: "red" }}>거짓말쟁이</span>들은 1점을 가지고
              시작하며, 맞출 경우 <span style={{ color: "red" }}>+1</span>점을,
              틀릴 경우 <span style={{ color: "blue" }}>-1</span>점을 얻게
              됩니다.
              <br /> 우승자에게는{" "}
              <span style={{ color: "green", fontWeight: "bold" }}>
                첫 인상 결과지
              </span>
              가 부상으로 주어집니다! 서로의 이야기를 잘 듣고 누가{" "}
              <span style={{ color: "red" }}>거짓말쟁이</span>인지 맞추어
              보세요!
            </div>
          </Typography>
          <button
            style={{ position: "absolute", left: "40%" }}
            onClick={onClick}
          >
            역할 확인하기
          </button>
        </Box>
      </Modal>
      <Modal
        open={open2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            style={{ textAlign: "center" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            당신의 역할은?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {role === "maifa" ? (
              <div>
                당신은 <span style={{ color: "red" }}>거짓말쟁이</span>입니다!
                다른 사람들에게 들키지 않고 우승을 차지하세요!{" "}
              </div>
            ) : (
              <div>
                당신은 <span style={{ color: "blue" }}>선량한 사람</span>입니다!
                상대방의 이야기를 잘 듣고 누가 거짓말을 하고 있는 지 맞추어
                보세요!{" "}
              </div>
            )}
          </Typography>
          <button onClick={onClick2} disabled={disabled}>
            준비완료 {gameReady}/{props.participantNum}
          </button>
        </Box>
      </Modal>
    </div>
  );
}
