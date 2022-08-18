import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import a3 from "../../../assets/a2,a3.png";

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
  maxWidth: "35%",
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
function FirstSelect(props) {
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
                alt="a3"
                src={a3}
                style={{ position: "absolute", width: "50px", left: "7%" }}
              />
              ​{" "}
              <img
                alt="a3"
                src={a3}
                style={{ position: "absolute", width: "50px", left: "83%" }}
              />
              {/* <img
                alt="a1"
                src={a1}
                style={{ position: "absolute", width: "50px", left: "7%" }}
              />
              <img
                alt="a1"
                src={a1}
                style={{ position: "absolute", width: "50px", left: "83%" }}
              /> */}
              <b style={{ fontSize: "30px" }}> 첫 인상 선택 시간!</b>
              <div style={{ fontSize: "20px", marginTop: "2vh" }}>
                자기소개는 잘 하셨나요? 상대방의 소개는 어떠셨나요? 지금부터
                소개만을 듣고 첫 인상을 선택하도록 하겠습니다! 선택하기 버튼을
                누르시고 나면 상대방의 비디오 위에 마우스를 갖다댈 경우 하트가
                생성됩니다. 그리고 누르시면 선택됩니다. 선택은 한 번 하시면
                변경하실 수 없으니 주의하여 주세요!
              </div>
              <ButtonCo
                fullWidth
                variant="contained"
                style={{ fontFamily: "CookieR" }}
                onClick={props.handleClose}
              >
                {" "}
                선택하기{" "}
              </ButtonCo>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default React.memo(FirstSelect);
