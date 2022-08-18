import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import a6 from "../../../assets/a6.png";

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

export default function DiscussStart() {
  //variables

  const [open, setOpen] = useState(false);

  //function
  setTimeout(() => {
    setOpen(false);
  }, 4000);

  return (
    // <div>
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
          alt="a6"
          src={a6}
          style={{ position: "absolute", width: "50px", left: "7%" }}
        />
        <img
          alt="a6"
          src={a6}
          style={{ position: "absolute", width: "50px", left: "83%" }}
        />
        <Typography
          style={{ textAlign: "center", fontSize: "30px" }}
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          대화시간입니다.!
        </Typography>
        <Typography
          style={{ textAlign: "center", fontSize: "20px" }}
          id="modal-modal-description"
          sx={{ mt: 2 }}
        >
          00분간 대화를 하며 거짓말을 하는 사람이 누구인지 맞추어보세요!
        </Typography>
      </Box>
    </Modal>
    // </div>
  );
}
