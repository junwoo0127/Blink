import io from "socket.io-client";
import React, { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
      setOpen(true);
      props.onHandleDisplay();
    }
  });

  const handleClose = () => {
    setOpen(false);
    props.setMode(2);
  };

  return (
    <>
      <button onClick={onClick} disabled={disable}>
        준비완료 : {count}/{props.participantNum}
        {/* 숫자표시관련 생각 */}
      </button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            모든 사람의 준비가 완료 되었습니다.
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            첫인상 선택시간이 시작됩니다. 마음에 드는 사람을 선택하여 주세요. 한
            번 선택하시면 변경하실 수 없습니다!
          </Typography>
          <button onClick={handleClose}>선택하기</button>
        </Box>
      </Modal>
    </>
  );
}

export default ReadyButton;
