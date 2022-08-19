import React, { useEffect, useState } from "react";

import "./DiscussRoom.css";
import Timer from "../../Common/timer/DiscussTimer";
import DiscussStream from "../../stream/DiscussStream";
import DiscussStart from "../../modals/DiscussStart/DiscussStart";
import io from "socket.io-client";
import E from "../../../assets/E.png";
import I from "../../../assets/I.png";
import axios from "axios";
const apiURL = "https://i7a402.p.ssafy.io:8081/blink";
const socket = io.connect("https://i7a402.p.ssafy.io:4000");
function DiscussRoom(props) {
  //variables
  const localUser = props.localUser;
  const participantNum = props.participantNum;
  const [res, setRes] = useState("");

  //function
  const setMode = (num) => {
    props.setMode(num);
  };

  useEffect(() => {
    console.log("dsajfl;f", props.subscribers);
  });

  return (
    <>
      <DiscussStart />
      {localUser !== undefined && localUser.getStreamManager() !== undefined && (
        <div className="OT_root OT_publisher custom-class" id="localUser9">
          <DiscussStream
            modeNum={props.modeNum}
            res={res}
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
