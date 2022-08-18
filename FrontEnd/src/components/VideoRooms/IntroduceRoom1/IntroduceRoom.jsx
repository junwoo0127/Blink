import React from "react";

import "./IntroduceRoom.css";

import IntroduceStream from "../../stream/IntroduceStream";
import IntroduceTimer from "../../Common/timer/IntroduceTimer";

function IntroduceRoom(props) {
  const localUser = props.localUser;
  const participantNum = props.participantNum
  const seq = props.seq;
  const setMode = (num) => {
    props.setMode(num);
  };
  const seqPlus = () => {
    props.seqPlus();
  }
  return (
    <>
      {localUser !== undefined && localUser.getStreamManager() !== undefined && (
        <div className="OT_root OT_publisher custom-class" id="localUser1">
          <IntroduceStream seq = {seq} user={localUser} />
        </div>
      )}
      {props.subscribers.map((sub, i) => (
        <div
          key={i}
          className="OT_root OT_publisher custom-class"
          id={"remoteUsers1" + i}
        >
          <IntroduceStream
          seq = {seq}
            user={sub}
            streamId={sub.streamManager.stream.streamId}
          />
        </div>
      ))}
      {/* <IntroduceTimer participantNum = {props.participantNum} seqPlus ={seqPlus} style={{}} sec={15} setMode={setMode} /> */}
    </>
  );
}

export default IntroduceRoom;
