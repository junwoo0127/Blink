import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";

const apiURL = "http://localhost:8080/blink";
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
const backdrop = {
  visible: {
    opacity: 1,
  },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "200px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};
export default function GameSet(props) {
  //variables
  const [res, setRes] = useState("");
  const [firstMatch, setFirstMatch] = useState("");
  const [open, setOpen] = useState(false);
  //function
  useEffect(() => {
    try {
      axios
        .get(apiURL + "/api/v1/game/resultFirst", {
          params: {
            roomSeq: props.roomSeq,
          },
        })
        .then((res) => {
          console.log("firstMatch result : ", res.data);
          setFirstMatch(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  });
  useEffect(() => {
    try {
      axios
        .get(apiURL + "/api/v1/game/rank", {
          params: {
            roomSeq: props.roomSeq,
          },
        })
        .then((response) => {
          console.log("rank response : ", response.data);
          setRes(response.data["nickname"]);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
  if (props.open === true) {
    console.log("modalopened");
    setTimeout(() => {
      props.handleClose();
      setOpen(true);
      // props.mode(7);
    }, 4000);
  }

  return (
    <div>
      <Modal
        open={props.open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p style={{ textAlign: "center", fontWeight: "bold" }}>결과</p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p
              style={{
                textAlign: "center",
                fontColor: "red",
                fontSize: "medium",
              }}
            >
              축하합니다!{res}님 !!{" "}
            </p>
            <p>{res}님에게는 첫인상 결과표가 주어집니다.</p>
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p style={{ textAlign: "center", fontWeight: "bold" }}>결과</p>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <p
              style={{
                textAlign: "center",
                fontColor: "red",
                fontSize: "medium",
              }}
            >
              투표 결과
            </p>
            <p>{firstMatch}</p>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
