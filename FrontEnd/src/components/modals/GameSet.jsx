import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import io from "socket.io-client";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const apiURL = "https://i7a402.p.ssafy.io:8443";

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

function GameSet(props) {
  //variables
  const [open, setOpen] = useState(props.open);
  setTimeout(() => {
    setOpen(false);
  }, 5000);

  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            게임 종료!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            게임결과!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default GameSet;
