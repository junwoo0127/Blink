import React, { useState } from "react";

import "./LiarSelectRoom.css";

import GameSelectStream from "../../stream/GameSelectStream";
import StreamComponent from "../../stream/StreamComponent";
import SendButton from "../../Buttons/SendButton/SendButton";

function LiarSelectRoom(props) {
  //variables
  const localUser = props.localUser;
  const [selected, setSelected] = useState(false);
  const [liarSelect, setLiarSelect] = useState(0);
  const [disabled, setDisabled] = useState(true);
  //function
  const plusLiar = () => {
    const value = liarSelect + 1;
    setLiarSelect(value); //거짓말장이 선택할때마다 증가 후, 자식에 넘겨서 그 값이 사용자의 역할에 따라 2 혹은 3이 되면 select를 할 수 없게 됨.

    if (value === 1) { //참가자 수에 따른 마피아 수에 따른 조정 필요
      setDisabled(false);
      setSelected(true);
    }
  };
  const minusLiar = () => {
    setLiarSelect(liarSelect - 1); //선택했다가 취소하면 -1
  };

  const setMode = (mode) => {
    props.setMode(mode);
    console.log("modeChanged", mode);
  };
  const onClose = () => {
    setDisabled(true);
  };
  return (
    <>
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
        disabled={disabled}
        onClose={onClose}
        participantNum={props.participantNum}
      />
    </>
  );
}

export default LiarSelectRoom;
