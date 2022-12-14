import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import { motion, AnimatePresence } from "framer-motion";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import a7 from "../../../assets/a13,a7.png";
import a8 from "../../../assets/a8.png";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import a5 from "../../../assets/a5.png";
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
  // top: "100%",
  marginTop: "2vh",
  left: "38%",
  maxWidth: "30%",
  // background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  backgroundColor: "#beaee2",
  "&:hover": {
    // backgroundColor: "#A6095D",
    background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  },
}));

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
const apiURL = "https://i7a402.p.ssafy.io:8081/blink";
function FinalSelectResult(props) {
  //variables
  const [res, setRes] = useState("");
  const [open, setOpen] = useState(false);
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
  }, [props.open]);
  if (props.open === true) {
    setTimeout(() => {
      setOpen(true);
      props.handleClose();
    }, 3000);
  }
  const onClick = () => {
    console.log("clicked!!");
    console.log("length", res.length);
    if (res.length > 0) {
      res.forEach((element) => {
        console.log("this is nickname", props.user.nickname);
        if (
          element.nickname === props.user.nickname ||
          element.finalChoiceNickname === props.user.nickname
        ) {
          console.log(
            "elementnick",
            element.nickname,
            element.finalChoiceNickname
          );
          setOpen(false);
          props.setMode(9);
        } else if (
          props.user.nickname !== element.nickname ||
          props.user.nickname !== element.finalChoiceNickname
        ) {
          console.log("this is not same");
          setOpen(false);
          window.location.href = "/";
        }
      });
    } else {
      setOpen(false);
      window.location.href = "/";
    }
  };
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
              <b style={{ fontSize: "30px" }}> 과연 커플이 탄생했을까요??</b>
              <div style={{ fontSize: "20px", marginTop: "2vh" }}>
                두구두구두구두구
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {res.length > 0 ? (
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
              alt="a7"
              src={a7}
              style={{ position: "absolute", width: "50px", left: "7%" }}
            />

            <img
              alt="a7"
              src={a7}
              style={{ position: "absolute", width: "50px", left: "83%" }}
            />

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
              <div>
                {" "}
                {res.map((couple, index) => (
                  <span key={index}>
                    {couple.nickname} 님과 {couple.finalChoiceNickname}님!
                    <br />
                  </span>
                ))}
              </div>
              방이 잠시 후 폭파됩니다!
            </Typography>
            <ButtonCo onClick={onClick}>확인</ButtonCo>
          </Box>
        </Modal>
      ) : (
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
              alt="a8"
              src={a8}
              style={{ position: "absolute", width: "50px", left: "7%" }}
            />

            <img
              alt="a8"
              src={a8}
              style={{ position: "absolute", width: "50px", left: "83%" }}
            />
            <Typography
              style={{ textAlign: "center", fontSize: "30px" }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              아쉽네요...
            </Typography>
            <Typography
              style={{ textAlign: "center", fontSize: "20px" }}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              아무도 커플이 되지 못하였습니다.. 이 방은 곧 폭파됩니다.
            </Typography>
            <ButtonCo onClick={onClick}>확인</ButtonCo>
          </Box>
        </Modal>
      )}
    </div>
  );
}
export default React.memo(FinalSelectResult);
