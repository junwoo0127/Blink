import React from "react";
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
  maxWidth: "35%",
  // background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  backgroundColor: "#A6095D",
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
function ShareModal(props) {
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
              <form
                class="hidden-xs"
                // 주석 풀면 사라짐
                //  style={{ visibility: "hidden" }}
              >
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Some path"
                    id="copy-input"
                  />
                  <span class="input-group-btn">
                    <button
                      class="btn btn-default"
                      type="button"
                      id="copy-button"
                      data-toggle="tooltip"
                      data-placement="button"
                      title="Copy to Clipboard"
                    >
                      Share the URL
                    </button>
                  </span>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default React.memo(ShareModal);

{
  /* <form class="hidden-xs">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Some path"
                  id="copy-input"
                />
                <span class="input-group-btn">
                  <button
                    class="btn btn-default"
                    type="button"
                    id="copy-button"
                    data-toggle="tooltip"
                    data-placement="button"
                    title="Copy to Clipboard"
                  >
                    Share the URL
                  </button>
                </span>
              </div>
            </form> */
}
