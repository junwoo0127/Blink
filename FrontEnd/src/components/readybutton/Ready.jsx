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

function Ready(props) {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpen2(true)
    
  };
  const onClose = () => {
    setOpen2(true);
    console.log(open2)
  }
  const handleOpen = () => {
    setOpen(true);
  };

  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     setOpen(false);
  //   }, 5000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [open]);
  useEffect(()=> {
  if (props.count === 3) {
    setTimeout(handleOpen, 10000);
  }},[props.count])
  if(open===true){
  setTimeout(handleClose, 14000);}
  return (
    <div>
      <button disabled={true}>참가자 수: ({props.count}/8)</button>
      
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
      <Introduce open={open2}/>
    </div>
  );
}

export default Ready;
