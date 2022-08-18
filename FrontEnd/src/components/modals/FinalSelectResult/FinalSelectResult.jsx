import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import { useHistory } from "react-router-dom";

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
function FinalSelectResult(props) {
  //variables
  const [res, setRes] = useState("");
  let history = useHistory();

  //function
  function handleOut() {
    history.push("/");
  }
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
  }, []);
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
          props.handleClose();
          props.setMode(9);
        } else if (
          props.user.nickname !== element.nickname ||
          props.user.nickname !== element.finalChoiceNickname
        ) {
          console.log("this is not same");
          props.handleClose();
          handleOut();
        }
      });
    } else {
      props.handleClose();
      handleOut();
    }
  };
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
            <button onClick={onClick}>확인</button>
          </Box>
        </Modal>
      ) : (
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
              아쉽네요...
            </Typography>
            <Typography
              style={{ textAlign: "center", fontSize: "20px" }}
              id="modal-modal-description"
              sx={{ mt: 2 }}
            >
              아무도 커플이 되지 못하였습니다.. 이 방은 곧 폭파됩니다.
            </Typography>
            <button onClick={onClick}>확인</button>
          </Box>
        </Modal>
      )}
    </div>
  );
}
export default React.memo(FinalSelectResult);
