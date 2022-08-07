import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import GameSet from "../../modals/GameResult/GameSet";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import io from "socket.io-client";

export default function SendButton(props) {
  const [open, setOpen] = useState(false);
  const socket = io.connect("http://localhost:4000");
  const onClick = () => {
    props.onClose();
    socket.emit("gameSet");
  };
  const onClose = () => {
    setOpen(false);
  };
  socket.on("gameSet", (cnt) => {
    if (cnt.gameSetCount === props.participantNum) {
      setOpen(true);
    }
  });

  return (
    <Stack direction="row" spacing={2}>
      <Button
        onClick={onClick}
        disabled={props.disabled}
        provariant="contained"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
      <GameSet open={open} onClose={onClose} />
    </Stack>
  );
}
