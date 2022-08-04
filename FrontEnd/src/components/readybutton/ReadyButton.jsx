
import io from 'socket.io-client';
import React, { useState, useEffect, useRef } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Timer from "../common/timer/timer";
import Introduce from "../modals/Introduce"
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

const socket = io.connect("http://localhost:4000");

function ReadyButton(props){
    const [count, setCount] = useState(0);
    const [disable, setDisable] = useState(false)
    const [open, setOpen] = useState(false);
    
    const onClick = (e) => {
        e.preventDefault();
        socket.emit("getReady", props.participantNum)
        console.log("clicked")
        setDisable(true)
       
    }
    socket.on("getStart", (cnt,modal)=> {
        setCount(cnt.count)
        console.log(cnt.count)
        console.log(modal.modalshow)
        setOpen(modal.modalshow)
    })
    useEffect(()=> {
        setOpen(open)
    },[open])
    const handleClose = () => {
        setOpen(false)
    }

    return(
        <>
        <button onClick={onClick} disabled={disable}>참가자 수 : {count}</button>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            참가가 모두 완료되었습니다.
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Timer sec="10" /> 후 시작됩니다!
            즐거운 시간 되세요!
          </Typography>
        </Box>
      </Modal> 
      </>
    )
}

export default ReadyButton;