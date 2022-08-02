import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import io from "socket.io-client";

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

let count = 0;
function Ready() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    socket.emit("getReady", count);
    socket.on("getStart", (cnt) => {
      count = cnt;
    });
    if (count === 8) {
      console.log("getStart");
    }
  };
  return (
    <div>
      <button onClick={handleOpen}>준비완료</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            블라인드 소개팅 Blink에 오신 여러분 환영합니다.
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            지금부터 블라인드 소개팅 Blink를 시작하도록 하겠습니다. 설명을
            끝까지 잘 들으시고 열심히 참여하시어 좋은 인연을 만드시기
            바라겠습니다.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default Ready;
