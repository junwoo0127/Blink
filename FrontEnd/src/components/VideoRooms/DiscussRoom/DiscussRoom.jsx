import React, { useEffect, useState } from "react";

import "./DiscussRoom.css";
import Timer from "../../common/timer/timer";
import StreamComponent from "../../stream/StreamComponent";
import DiscussStart from "../../modals/DiscussStart/DiscussStart";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");
function DiscussRoom(props) {
  //variables
  const localUser = props.localUser;

  //function
  const setMode = (num) => {
    props.setMode(num);
  };

  return (
    <>
      <DiscussStart />
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
          <StreamComponent
            user={sub}
            streamId={sub.streamManager.stream.streamId}
          />
        </div>
      ))}
      <Timer min={1} setMode={setMode} />
    </>
  );
}

export default DiscussRoom;
