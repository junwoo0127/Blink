import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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
const apiURL = "http://localhost:/8080/blink";
export default function FinalSelectResult(props) {
  //variables
  const [res, setRes] = useState("");
  setTimeout(() => {
    props.handleClose();
  }, 10000);

  //function
  useEffect(() => {
    try {
      axios
        .get(apiURL + "/api/v1/game/resultFinal", {
          params: { roomSeq: props.roomSeq },
        })
        .then((res) => {
          console.log(res);
          setRes(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  });
  const selectPerson = () => {
    const result = [];
    for (let i = 0; i < res.length; i++) {
      result.push();
    }
  };
  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            축하합니다!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {res}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
