import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import GameSet from "../../modals/GameResult/GameSet";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import io from "socket.io-client";
import { ariaHidden } from "@mui/material";
import axios from "axios";

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
      <Button
        onClick={onClick}
        disabled={props.disabled}
        provariant="contained"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </>
  );
}
