import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";

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
function Game(props) {
  //variables
  const [question, setQuestion] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(props.open);
  const [sumCount, setSumCount] = useState(0);
  //function
  useEffect(() => {
    axios.get(apiURL + "/game/mbti").then((response) => {
      console.log(response.data);
    });
  });
  const onYes = () => {
    //yes count 1업하기
    setDisabled(true);
  };

  const onNo = () => {
    //no count 1업하기
    setDisabled(true);
  };
  useEffect(() => {
    if (sumCount === props.participantNum) {
      setOpen(false);
      setSumCount(0);
      setDisabled(false);
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {/*00번 문제 : 순서가 바뀔때마다 번호도 바꿔줘야함*/}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/*reponse.data를 갈아끼움*/}
          </Typography>
          <button onClick={onYes} disabled={disabled}>
            예
          </button>
          <button onClick={onNo} disabled={disabled}>
            아니오
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default Game;
