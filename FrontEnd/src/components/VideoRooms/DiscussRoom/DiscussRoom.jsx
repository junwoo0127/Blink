import React, { useEffect, useState } from "react";

import "./DiscussRoom.css";
import Timer from "../../Common/timer/DiscussTimer";
import DiscussStream from "../../stream/DiscussStream";
import DiscussStart from "../../modals/DiscussStart/DiscussStart";
import io from "socket.io-client";
import E from "../../../assets/E.png";
import I from "../../../assets/I.png";

const socket = io.connect("http://localhost:4000");
function DiscussRoom(props) {
  //variables
  const localUser = props.localUser;
  const participantNum = props.participantNum;

  //function
  const setMode = (num) => {
    props.setMode(num);
  };
 
  useEffect(() => {
    console.log("dsajfl;f", props.subscribers)
  })

  return (
    <>
      <DiscussStart />
      {localUser !== undefined && localUser.getStreamManager() !== undefined && (
        <div className="OT_root OT_publisher custom-class" id="localUser9">
          <DiscussStream
          
            // id={localUser.getAnswer() ? "yes" : "no"}
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
          <DiscussStream
           // id={sub.getAnswer() ? "yes" : "no"}
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
