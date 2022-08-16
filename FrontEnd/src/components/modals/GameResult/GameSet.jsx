import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import io from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
const apiURL = "http://localhost:8080/blink";
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
  const [firstMatch, setFirstMatch] = useState([]);

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
          console.log("resresres", res.data[0].nickname);
        });
    } catch (e) {
      console.log(e);
    }
  }, []);
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
    }, 4000);
  }
  const selectPerson = () => {
    const result = [];
    for (let i = 0; i < res.length; i++) {
      result.push(<span key={i}>{firstMatch[i].nickname} 님은 </span>);
    }
    return result;
  };
  const selectedPerson = () => {
    const result = [];
    for (let i = 0; i < res.length; i++) {
      result.push(<span key={i}>{firstMatch[i].firstChoiceNickname} 님!</span>);
    }
    return result;
  };
  const onClick = () => {
    socket.emit("firstMatchConfirm");
  };
  socket.on("firstMatchConfirm", () => {
    setOpen(false);
    props.mode(7);
  });
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
      {open && props.user.getNickname() === res ? (
        <AnimatePresence exitBeforeEnter>
          {open && (
            <motion.div
              className="backdrop"
              variants={backdrop}
              animate="visible"
              initial="hidden"
              exit="hidden"
            >
              <motion.div className="modal" variants={modal}>
                <p>첫 인상 결과표</p>
                <div style={{ display: "flex", textAlign: "center" }}>
                  <div
                    className="selectPerson"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {selectPerson()}
                  </div>
                  <div
                    className="selectedPerson"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {selectedPerson()}
                  </div>
                </div>
                <button onClick={onClick}>확인 완료</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <AnimatePresence exitBeforeEnter>
          {open && (
            <motion.div
              className="backdrop"
              variants={backdrop}
              animate="visible"
              initial="hidden"
              exit="hidden"
            >
              <motion.div className="modal" variants={modal}>
                <p>{res}님이 확인중입니다.</p>
                <div>1등이 아니다!!</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      {/* {props.user.getNickname() === res ? (
        <div>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <p style={{ textAlign: "center", fontWeight: "bold" }}>
                  첫 인상 결과표
                </p>
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <div style={{ display: "flex", textAlign: "center" }}>
                  <div
                    className="selectPerson"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {selectPerson()}
                  </div>
                  <div
                    className="selectedPerson"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {selectedPerson()}
                  </div>
                </div>
              </Typography>
            </Box>
            <button onClick={onClick}>확인완료</button>
          </Modal>
        </div>
      ) : (
        <div>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                <p style={{ textAlign: "center", fontWeight: "bold" }}>
                  {res}님이 결과를 확인중입니다...
                </p>
              </Typography>
              <Typography
                id="modal-modal-descriptio n"
                sx={{ mt: 2 }}
              ></Typography>
            </Box>
          </Modal>
        </div>
      )} */}
    </div>
  );
}
