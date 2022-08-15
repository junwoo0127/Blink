import React, { useEffect, useState } from "react";

import "./DiscussRoom.css";
import Timer from "../../Common/timer/DiscussTimer";
import StreamComponent from "../../stream/StreamComponent";
import DiscussStart from "../../modals/DiscussStart/DiscussStart";
import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");
function DiscussRoom(props) {
  //variables
  const localUser = props.localUser;
  const participantNum = props.participantNum;

  //function
  const setMode = (num) => {
    props.setMode(num);
  };

  return (
    <>
      <DiscussStart />
      {localUser !== undefined && localUser.getStreamManager() !== undefined && (
        <div className="OT_root OT_publisher custom-class" id="localUser">
          <StreamComponent
            id={localUser.getAnswer() ? "yes" : "no"}
            user={localUser}
          />
        </div>
      )}
      {props.subscribers.map((sub, i) => (
        <div
          key={i}
          className="OT_root OT_publisher custom-class"
          id={"remoteUsers9" + i}
        >
          <StreamComponent
            id={sub.getAnswer() ? "yes" : "no"}
            user={sub}
            streamId={sub.streamManager.stream.streamId}
          />
        </div>
      ))}
      {/* <Timer sec={10} participantNum={participantNum} setMode={setMode} /> */}
    </>
  );
}

export default DiscussRoom;
