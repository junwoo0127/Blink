import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import io from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import a4 from "../../../assets/a4.png";
import a5 from "../../../assets/a5.png";
import a13 from "../../../assets/a13,a7.png";

const ButtonCo = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#beaee2"),
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
  backgroundColor: "#beaee2",
  "&:hover": {
    // backgroundColor: "#A6095D",
    background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  },
}));

const apiURL = "https://i7a402.p.ssafy.io:8081/blink";
const socket = io.connect("https://i7a402.p.ssafy.io:4000");
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
function GameSet(props) {
  //variables
  const [res, setRes] = useState("");
  const [firstMatch, setFirstMatch] = useState([]);
  const [open2, setOpen2] = useState(false);
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
  }, [props.open]);
  if (props.open === true) {
    console.log("modalopened");
    setTimeout(() => {
      props.handleClose();
      setOpen(true);
    }, 3000);
  }
  if (open === true) {
    setTimeout(() => {
      setOpen2(true);
    }, 4000);
  }
  // const selectPerson = () => {
  //   console.log(firstMatch);
  //   const result = [];
  //   for (let i = 0; i < res.length; i++) {
  //     result.push(<span key={i}>{firstMatch(i).nickname} ?????? </span>);
  //   }
  //   return result;
  // };
  // const selectedPerson = () => {
  //   const result = [];
  //   for (let i = 0; i < res.length; i++) {
  //     result.push(<span key={i}>{firstMatch(i).firstMatchNickName} ???!</span>);
  //   }
  //   return result;
  // };
  const onClick = () => {
    socket.emit("firstMatchConfirm");
  };
  socket.on("firstMatchConfirm", () => {
    setOpen(false);
    props.mode(8);
  });
  return (
    <div>
      <AnimatePresence exitBeforeEnter>
        {props.open && (
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
              <b style={{ fontSize: "30px" }}>?????????....</b>
              <div
                style={{
                  display: "flex",
                  textAlign: "center",
                  fontSize: "20px",
                  marginTop: "2vh",
                }}
              ></div>
              <div>?????????????????????</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
            alt="a13"
            src={a13}
            style={{ position: "absolute", width: "50px", left: "7%" }}
          />

          <img
            alt="a13"
            src={a13}
            style={{ position: "absolute", width: "50px", left: "83%" }}
          />

          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "30px",
              }}
            >
              ??????
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
                // fontSize: "medium",
              }}
            >
              ???????????????!{res}??? !!{" "}
            </p>
            <p>{res}???????????? ????????? ???????????? ???????????????.</p>
          </Typography>
        </Box>
      </Modal>
      {props.user.getNickname() === res ? (
        <AnimatePresence exitBeforeEnter>
          {open2 && (
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
                <img
                  alt="a4"
                  src={a4}
                  style={{ position: "absolute", width: "50px", left: "7%" }}
                />

                <img
                  alt="a4"
                  src={a4}
                  style={{ position: "absolute", width: "50px", left: "83%" }}
                />
                <b style={{ fontSize: "30px" }}>??? ?????? ?????????</b>
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
                      <span key={index}>{select.nickname} ??????</span>
                    ))}
                  </div>
                  <div
                    className="selectPerson"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <span style={{ color: "#FF1744" }}>??? ??? ??? ??? ??? ??? ???</span>
                  </div>
                  <div
                    className="selectedPerson"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {firstMatch.map((selected, index) => (
                      <span key={index}>
                        {selected.firstChoiceNickname} ???!
                      </span>
                    ))}
                  </div>
                </div>
                <ButtonCo fullWidth variant="contained" onClick={onClick}>
                  ?????? ??????
                </ButtonCo>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <AnimatePresence exitBeforeEnter>
          {open2 && (
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
                <img
                  alt="a5"
                  src={a5}
                  style={{
                    position: "absolute",
                    width: "50px",
                    top: "15%",
                    left: "7%",
                  }}
                />

                <img
                  alt="a5"
                  src={a5}
                  style={{
                    position: "absolute",
                    width: "50px",
                    top: "15%",
                    left: "83%",
                  }}
                />

                <b style={{ fontSize: "30px" }}>{res}?????? ??????????????????.</b>
                <div style={{ fontSize: "20px", marginTop: "2vh" }}>
                  ????????? ????????? ???????????? ?????????!!
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
                  ??? ?????? ?????????
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
            <button onClick={onClick}>????????????</button>
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
                  {res}?????? ????????? ??????????????????...
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
export default React.memo(GameSet);
