import React, { useEffect, useState } from "react";

import "./LastRoom.css";
import Timer from "../../Common/timer/FreeTalkTimer";
import StreamComponent from "../../stream/LastStream";
import FreeTalkStart from "../../modals/FreeTalkStart/FreeTalkStart";
import io from "socket.io-client";

const socket = io.connect("https://i7a402.p.ssafy.io:4000");
function FreeTalkRoom(props) {
  //variables
  const localUser = props.localUser;
  const participantNum = props.participantNum;

  //function
  const setMode = (num) => {
    props.setMode(num);
  };

  return (
    <>
      {localUser !== undefined && localUser.getStreamManager() !== undefined && (
        <div className="OT_root OT_publisher custom-class" id="localUser12">
          <StreamComponent user={localUser} />
        </div>
      )}
      {props.subscribers.map((sub, i) => (
        <div
          key={i}
          className="OT_root OT_publisher custom-class"
          id={"remoteUsers12" + i}
        >
          <StreamComponent
            user={sub}
            streamId={sub.streamManager.stream.streamId}
          />
        </div>
      ))}
      {/* <Timer min={5} participantNum={participantNum} setMode={setMode} /> */}
    </>
  );
}

export default FreeTalkRoom;
