import React, { useState } from "react";

import "./GameRoom.css";
import GameIntro from "../../modals/GameIntro/GameIntro";
import StreamComponent from "../../stream/StreamComponent";
import Game from "../../modals/Game/Game";
function GameRoom(props) {
  //variables
  const localUser = props.localUser;
  const [answer, setAnswer] = useState(true);
  const [gameOpen, setGameOpen] = useState(true);
  //function

  const setMode = (num) => {
    props.setMode(num);
  };
  const setGameEnd = () => {
    setGameOpen(false);
  };

  const selectNo = () => {
    setAnswer(false);
  };
  return (
    <>
      <Game
        participantNum={props.participantNum}
        open={gameOpen}
        setMode={setMode}
        setGameEnd={setGameEnd}
        user={localUser}
      />
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
    </>
  );
}

export default GameRoom;
