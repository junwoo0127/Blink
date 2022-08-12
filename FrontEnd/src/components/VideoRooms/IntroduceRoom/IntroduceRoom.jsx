import React from "react";

import "./IntroduceRoom.css";

import StreamComponent from "../../stream/StreamComponent";

function IntroduceRoom(props) {
  const localUser = props.localUser;
  // css 때문에 지움
  // setTimeout(() => {
  //   props.setMode(1);
  // }, 30000);
  return (
    <>
      {localUser !== undefined && localUser.getStreamManager() !== undefined && (
        <div className="OT_root OT_publisher custom-class" id="localUser1">
          <StreamComponent user={localUser} />
        </div>
      )}
      {props.subscribers.map((sub, i) => (
        <div
          key={i}
          className="OT_root OT_publisher custom-class"
          id={"remoteUsers1" + i}
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

export default IntroduceRoom;
