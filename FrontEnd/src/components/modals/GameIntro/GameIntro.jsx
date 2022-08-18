import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import io from "socket.io-client";
import axios from "axios";
import { styled } from "@mui/material/styles";
import pino from "../../../assets/pino.png";
import a11L from "../../../assets/a11L.png";
import a11R from "../../../assets/allR.png";

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
  left: "32.5%",
  maxWidth: "35%",
  // background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  backgroundColor: "#beaee2",
  "&:hover": {
    // backgroundColor: "#A6095D",
    background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  },
}));

const ButtonCo2 = styled(Button)(({ theme }) => ({
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
  left: "27.5%",
  maxWidth: "45%",
  // background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  backgroundColor: "#beaee2",
  "&:hover": {
    // backgroundColor: "#A6095D",
    background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  },
}));

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
function GameIntro(props) {
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
      setGameReady(0);
    }
  );

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
        <Box
          style={{
            borderRadius: "3vw",
            border: "4px solid #f7dbf0",
            backgroundColor: "#f7dbf0",
          }}
          sx={style}
        >
          <img
            alt="pino"
            src={pino}
            style={{
              position: "absolute",
              width: "50px",
              left: "7%",
            }}
          />
          <img
            alt="pino"
            src={pino}
            style={{
              position: "absolute",
              width: "50px",
              left: "83%",
            }}
          />
          <Typography
            style={{ textAlign: "center", fontSize: "30px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            MBTI를 맞춰라!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* <p >룰 설명</p>  없어도 될듯!  */}
            <div style={{ textAlign: "center", fontSize: "20px" }}>
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
          <ButtonCo2 fullWidth variant="contained" onClick={onClick}>
            역할 확인하기
          </ButtonCo2>
        </Box>
      </Modal>
      <Modal
        open={open2}
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
            alt="a11L"
            src={a11L}
            style={{ position: "absolute", width: "50px", left: "7%" }}
          />

          <img
            alt="a11R"
            src={a11R}
            style={{ position: "absolute", width: "50px", left: "83%" }}
          />

          <Typography
            style={{ textAlign: "center", fontSize: "30px" }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            당신의 역할은?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {role === "mafia" ? (
              <div style={{ textAlign: "center", fontSize: "20px" }}>
                당신은 <span style={{ color: "red" }}>거짓말쟁이</span>입니다!
                다른 사람들에게 들키지 않고 우승을 차지하세요!{" "}
              </div>
            ) : (
              <div style={{ textAlign: "center", fontSize: "20px" }}>
                당신은 <span style={{ color: "blue" }}>선량한 사람</span>입니다!
                상대방의 이야기를 잘 듣고 누가 거짓말을 하고 있는 지 맞추어
                보세요!{" "}
              </div>
            )}
          </Typography>
          <ButtonCo
            fullWidth
            variant="contained"
            onClick={onClick2}
            disabled={disabled}
          >
            준비완료 {gameReady}/{props.participantNum}
          </ButtonCo>
        </Box>
      </Modal>
    </div>
  );
}

export default React.memo(GameIntro);
