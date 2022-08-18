import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import io from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const ButtonCo = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#A6095D"),
  // lineHeight: "44px",
  borderRadius: "30px",
  fontSize: "20px",
  color: "white !important",
  // padding: "9.5px 16px",
  // height: 40px;
  // padding: 0 14px 0 0;
  // position: "absolute",
  top: "100%",
  // left: "32.5%",
  maxWidth: "40%",
  // background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  backgroundColor: "#A6095D",
  "&:hover": {
    // backgroundColor: "#A6095D",
    background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  },
}));

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
    y: "25vh",
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
  // const selectPerson = () => {
  //   console.log(firstMatch);
  //   const result = [];
  //   for (let i = 0; i < res.length; i++) {
  //     result.push(<span key={i}>{firstMatch(i).nickname} 님은 </span>);
  //   }
  //   return result;
  // };
  // const selectedPerson = () => {
  //   const result = [];
  //   for (let i = 0; i < res.length; i++) {
  //     result.push(<span key={i}>{firstMatch(i).firstMatchNickName} 님!</span>);
  //   }
  //   return result;
  // };
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
        <Box
          style={{
            borderRadius: "3vw",
            border: "4px solid #f7dbf0",
            backgroundColor: "#f7dbf0",
          }}
          sx={style}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "30px",
              }}
            >
              결과
            </p>
          </Typography>
          <Typography
            style={{ textAlign: "center", fontSize: "20px" }}
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
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
      {props.user.getNickname() === res ? (
        <AnimatePresence exitBeforeEnter>
          {open && (
            <motion.div
              className="backdrop"
              variants={backdrop}
              animate="visible"
              initial="hidden"
              exit="hidden"
              style={{ zIndex: "5555" }}
            >
              <motion.div
                className="modal"
                variants={modal}
                style={{
                  borderRadius: "3vw",
                  border: "1px solid #f7dbf0",
                  backgroundColor: "#f7dbf0",
                }}
              >
                <b style={{ fontSize: "30px" }}>첫 인상 결과표</b>
                <div
                  style={{
                    display: "flex",
                    textAlign: "center",
                    fontSize: "20px",
                    marginTop: "2vh",
                  }}
                >
                  <div
                    className="selectPerson"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {firstMatch.map((select, index) => (
                      <span key={index}>{select.nickname} 님은</span>
                    ))}
                  </div>
                  <div
                    className="selectedPerson"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {firstMatch.map((selected, index) => (
                      <span key={index}>{selected.firstChoiceNickname} 님!</span>
                    ))}
                  </div>
                </div>
                <ButtonCo fullWidth variant="contained" onClick={onClick}>
                  확인 완료
                </ButtonCo>
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
              style={{ zIndex: "5555" }}
            >
              <motion.div
                className="modal"
                variants={modal}
                style={{
                  borderRadius: "3vw",
                  border: "1px solid #f7dbf0",
                  backgroundColor: "#f7dbf0",
                }}
              >
                <b style={{ fontSize: "30px" }}>{res}님이 확인중입니다.</b>
                <div style={{ fontSize: "20px", marginTop: "2vh" }}>
                  1등이 아니다!!
                </div>
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
