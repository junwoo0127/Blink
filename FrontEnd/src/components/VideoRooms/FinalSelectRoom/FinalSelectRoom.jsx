import React, { useState } from "react";

import "./FinalSelectRoom.css";

import FinalSelectStream from "../../stream/FinalSelectStream";
import StreamComponent from "../../stream/StreamComponent";
function SelectRoom(props) {
  //variables

  const localUser = props.localUser;
  const [selected, setSelected] = useState(false);

  //function
  const onSelect = () => {
    setSelected(true);
  };
  const setMode = (mode) => {
    props.setMode(mode);
    console.log("modeChanged", mode);
  };
  return (
    <>
      {localUser !== undefined && localUser.getStreamManager() !== undefined && (
        <div className="OT_root OT_publisher custom-class" id="localUser13">
          <StreamComponent user={localUser} />
        </div>
      )}
      {props.subscribers.map((sub, i) => (
        <div
          key={i}
          className="OT_root OT_publisher custom-class"
          id={"remoteUsers13" + i}
        >
          <FinalSelectStream
            localUser={localUser}
            participantNum={props.participantNum}
            onSelect={onSelect}
            user={sub}
            streamId={sub.streamManager.stream.streamId}
            disabled={selected}
            mode={setMode}
          />
        </div>
      ))}
    </>
  );
}

export default SelectRoom;
