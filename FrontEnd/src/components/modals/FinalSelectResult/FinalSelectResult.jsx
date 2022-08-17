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
const apiURL = "http://localhost:8080/blink";
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
        .get(apiURL + "/api/v1/game/matchedFinal", {
          params: { roomSeq: props.roomSeq },
        })
        .then((res) => {
          console.log("커플!!!", res);
          setRes(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  },[props.open]);

  return (
    <div>
      {res.length > 0 ? (
        <Modal
          open={props.open}
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
            <Typography
              style={{ textAlign: "center", fontSize: "30px" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              축하합니다!
            </Typography>
            <Typography
              style={{ textAlign: "center", fontSize: "20px" }}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              {res}
            </Typography>
          </Box>
        </Modal>
      ) : (
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
      )}
    </div>
  );
}
