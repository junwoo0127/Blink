import React from "react";

import "./WaitingRoom.css";

import StreamComponent from "../../stream/StreamComponent";

function WaitingRoom(props) {
  const localUser = props.localUser;
  const filter = props.filter;
  return (
    <>
      {localUser !== undefined && localUser.getStreamManager() !== undefined && (
        // 나
        <div className="OT_root OT_publisher custom-class" id="localUser0">
          <StreamComponent filter={filter} user={localUser} />
        </div>
      )}
      {props.subscribers.map((sub, i) => (
        <div
          key={i}
          //  나빼고 들어오는유저
          className="OT_root OT_publisher custom-class"
          id={"remoteUsers0" + i}
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
