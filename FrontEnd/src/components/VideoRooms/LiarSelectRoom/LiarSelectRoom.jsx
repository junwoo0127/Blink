import React, { useState } from "react";

import "./LiarSelectRoom.css";

import GameSelectStream from "../../stream/GameSelectStream";
import StreamComponent from "../../stream/StreamComponent";
import SendButton from "../../Buttons/SendButton/SendButton";
import GameSet from "../../modals/GameResult/GameSet";

function LiarSelectRoom(props) {
  //variables
  const localUser = props.localUser;
  const [selected, setSelected] = useState(false);
  const [liarSelect, setLiarSelect] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedLiar, setSelectedLiar] = useState([]);
  const roomSeq = props.roomSeq;
  //function
  const plusLiar = (liar) => {
    const value = liarSelect + 1;
    setLiarSelect(value); //거짓말장이 선택할때마다 증가 후, 자식에 넘겨서 그 값이 사용자의 역할에 따라 2 혹은 3이 되면 select를 할 수 없게 됨.
    setSelectedLiar([...selectedLiar, liar]);
    if (localUser.getRole() === "mafia") {
      if (value === 1) {
        setDisabled(false);
        setSelected(true);
      }
    } else if (localUser.getRole() === "citizen") {
      if (value === 2) {
        //참가자 수에 따른 마피아 수에 따른 조정 필요
        setDisabled(false);
        setSelected(true);
      }
    }
  };
  const minusLiar = (liar) => {
    setLiarSelect(liarSelect - 1); //선택했다가 취소하면 -1
    setSelectedLiar(selectedLiar.filter((e) => e.liar !== liar));
  };

  const setMode = (mode) => {
    props.setMode(mode);
    console.log("modeChanged", mode);
  };
  const onClose = () => {
    setDisabled(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <GameSet
        roomSeq={roomSeq}
        open={open}
        handleClose={handleClose}
        mode={setMode}
      />
      {localUser !== undefined && localUser.getStreamManager() !== undefined && (
        <div className="OT_root OT_publisher custom-class" id="localUser">
          <StreamComponent user={localUser} />
        </div>
      )}
      {props.subscribers.map((sub, i) => (
        <div
          key={i}
          className="OT_root OT_publisher custom-class"
          id="remoteUsers"
        >
          <GameSelectStream
            user={sub}
            streamId={sub.streamManager.stream.streamId}
            disabled={selected}
            mode={setMode}
            localUser={localUser}
            plusLiar={plusLiar}
            liarSelect={liarSelect}
            minusLiar={minusLiar}
          />
        </div>
      ))}
      <SendButton
        user={props.localUser}
        selectedLiar={selectedLiar}
        disabled={disabled}
        onClose={onClose}
        participantNum={props.participantNum}
        handleOpen={handleOpen}
      />
    </>
  );
}

export default LiarSelectRoom;
