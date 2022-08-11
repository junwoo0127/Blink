import React from "react";

import "./WaitingRoom.css";

import StreamComponent from "../../stream/StreamComponent";

function WaitingRoom(props) {
  const localUser = props.localUser;

  return (
    <>
      {localUser !== undefined && localUser.getStreamManager() !== undefined && (
        // 나
        <div className="OT_root OT_publisher custom-class" id="localUser">
          <StreamComponent user={localUser} />
        </div>
      )}
      {props.subscribers.map((sub, i) => (
        <div
          key={i}
          //  나빼고 들어오는유저
          className="OT_root OT_publisher custom-class"
          id={"remoteUsers" + i}
        >
          <StreamComponent
            user={sub}
            streamId={sub.streamManager.stream.streamId}
          />
        </div>
      ))}
    </>
  );
}

export default WaitingRoom;
