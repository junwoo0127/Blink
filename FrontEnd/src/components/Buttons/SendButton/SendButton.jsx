import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import GameSet from "../../modals/GameSet";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import io from "socket.io-client";

export default function IconLabelButtons(props) {
  const [disabled, setDisabled] = useState(props.disabled);
  const [open, setOpen] = useState(false);
  const socket = io.connect("http://localhost:4000");
  const onClick = () => {
    setDisabled(true);
    socket.emit("gameSet");
  };
  const interval = useRef(null);
  useEffect(() => {
    interval.current = setInterval(() => {
      socket.emit("setCount");
    }, 2000);
    return () => clearInterval(interval.current);
  }, []);

  socket.on("setCount", (cnt) => {
    console.log("gameSet?");
    if (cnt.gameSetCount === 3) {
      clearInterval(interval.current);
      setOpen(true);
    }
  });
  return (
    <Stack direction="row" spacing={2}>
      <Button
        onClick={onClick}
        disabled={disabled}
        provariant="contained"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
      <GameSet open={open} />
    </Stack>
  );
}
