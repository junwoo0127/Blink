import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
          >
            <motion.div className="modal" variants={modal}>
              <p> 첫 인상 선택 시간!</p>
              <div>
                자기소개는 잘 하셨나요? 상대방의 소개는 어떠셨나요? 지금부터
                소개만을 듣고 첫 인상을 선택하도록 하겠습니다! 선택하기 버튼을
                누르시고 나면 상대방의 비디오 위에 마우스를 갖다댈 경우 하트가
                생성됩니다. 그리고 누르시면 선택됩니다. 선택은 한 번 하시면
                변경하실 수 없으니 주의하여 주세요!
              </div>
              <button onClick={props.handleClose}> 선택하기 </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default FirstSelect;
