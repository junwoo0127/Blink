import React, { useState } from "react";

import "./GameRoom.css";
import GameIntro from "../../modals/GameIntro/GameIntro";
import StreamComponent from "../../stream/StreamComponent";
import Game from "../../modals/Game/Game";
function GameRoom(props) {
  //variables
  const localUser = props.localUser;

  const [gameOpen, setGameOpen] = useState(true);
  //function

  const setMode = (num) => {
    props.setMode(num);
  };
  const setGameEnd = () => {
    setGameOpen(false);
  };

  return (
    <>
      <Game
        participantNum={props.participantNum}
        open={gameOpen}
        setMode={setMode}
        setGameEnd={setGameEnd}
        user={props.localUser}
      />
      {localUser !== undefined && localUser.getStreamManager() !== undefined && (
        <div className="OT_root OT_publisher custom-class" id="localUser10">
          <StreamComponent user={localUser} />
        </div>
      )}
      {props.subscribers.map((sub, i) => (
        <div
          key={i}
          className="OT_root OT_publisher custom-class"
          id={"remoteUsers10" + i}
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

export default GameRoom;
