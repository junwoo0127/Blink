import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import GameSet from "../../modals/GameResult/GameSet";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import io from "socket.io-client";
import { ariaHidden } from "@mui/material";
import axios from "axios";
import { alpha, styled } from "@mui/material/styles";

const ButtonCo = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#beaee2"),
  lineHeight: "30px",
  borderRadius: "30px",
  fontSize: "20px",
  padding: "7px 1px",
  // height: 40px;
  // padding: 0 14px 0 0;
  position: "absolute",
  bottom: "1%",
  left: "35%",
  maxWidth: "30%",
  // background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  backgroundColor: "#beaee2",
  "&:hover": {
    // backgroundColor: "#A6095D",
    background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  },
}));

const apiURL = "http://localhost:8080/blink";
export default function SendButton(props) {
  const [open, setOpen] = useState(false);
  const socket = io.connect("http://localhost:4000");
  const onClick = () => {
    props.onClose();
    socket.emit("gameSet");
    props.selectedLiar.forEach((e) => {
      console.log(e);
      axios
        .get(apiURL + "/api/v1/game/vote", {
          params: {
            playerSeq: props.user.getPlayerSeq(),
            liarSeq: e,
          },
        })
        .then((res) => {
          console.log(res);
        });
    });
  };

  socket.on("gameSet", (cnt) => {
    if (cnt.gameSetCount === props.participantNum) {
      props.handleOpen();
    }
  });

  return (
    <>
      <ButtonCo
        style={{ height: "10px" }}
        variant="contained"
        onClick={onClick}
        disabled={props.disabled}
        provariant="contained"
        endIcon={<SendIcon />}
      >
        Send
      </ButtonCo>
    </>
  );
}
