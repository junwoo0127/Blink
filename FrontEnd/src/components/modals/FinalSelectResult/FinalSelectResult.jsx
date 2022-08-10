import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

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

export default function FinalSelectResult(props) {
  //variables

  setTimeout(() => {
    props.handleClose();
  }, 10000);

  //function

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            결과!!!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* 결과보이기 */}
            잠시 후 이방은 폭파 됩니다!
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
