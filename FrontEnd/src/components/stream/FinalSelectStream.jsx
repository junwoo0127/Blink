import React, { useEffect, useState } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import io from "socket.io-client";
import OvVideo from "./OvVideo2";
import FinalSelectResult from "../modals/FinalSelectResult/FinalSelectResult";
import axios from "axios";
import { useRef } from "react";
const socket = io.connect("http://localhost:4000");
const apiURL = "http://localhost:8080/blink";

function SelectStreamComponent(props) {
  const [showForm, setShowForm] = useState(false);
  const [mutedSound, setMutedSound] = useState(false);
  const [selected, setSelected] = useState(false);
  const [finalCount, setFinalCount] = useState(0);
  const [open, setOpen] = useState(false);
  const roomSeq = props.roomSeq;
  const toggleSound = () => {
    setMutedSound(!mutedSound);
  };

  const onMouseOver = () => {
    setShowForm(true);
  };

  const onClick = async () => {
    setSelected(true);
    // props.onSelect();
    setShowForm(true);
    props.onSelect();
    axios.get(apiURL + "/api/v1/game/voteFinal", {
      params: {
        playerSeq: props.localUser.getPlayerSeq(),
        finalChoice: props.user.getPlayerSeq(),
      },
    });
    socket.emit("selectFinal");
  };
  socket.on("selectFinal", (cnt) => {
    setFinalCount(cnt.finalCount);
    if (cnt.finalCount === props.participantNum) {
      props.handleOpen();
    }
  });
  socket.on(
    "leaveSession",
    (
      count,
      firstCount,
      gameReady,
      answerCount,
      discussCount,
      finalCount,
      gameSetCount
    ) => {
      setFinalCount(0);
    }
  );

  const onMouseLeave = () => {
    if (selected) {
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  return (
    <div>
      <button
        disabled={props.disabled}
        className="OT_widget-container"
        onMouseOver={onMouseOver}
        onClick={onClick}
        onMouseLeave={onMouseLeave}
      >
        {showForm ? (
          <span id="nickname">{props.user.getNickname()}</span>
        ) : null}
        {props.user !== undefined &&
        props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent" id="basic">
            <OvVideoComponent user={props.user} mutedSound={mutedSound} />
            {/* <OvVideo
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            /> */}
            <div id="statusIcons">
              {!props.user.isVideoActive() ? (
                <div id="camIcon">
                  <VideocamOffIcon id="statusCam" />
                </div>
              ) : null}

              {!props.user.isAudioActive() ? (
                <div id="micIcon">
                  <MicOffIcon id="statusMic" />
                </div>
              ) : null}
              {/* //   selected ? (
                //       <div id="LikedIcon">
                //           <FavoriteIcon id="statusLike"/>
                //       </div>
                //   ): 
                //   <div id="LikeIcon">
                //       <FavoriteBorderIcon id="statusLike"/>
              //   </div> */}
            </div>
            <div id="LikeIcon">
              {showForm ? (
                selected ? (
                  <FavoriteIcon id="statusLike" style={{ fontSize: "200px" }} />
                ) : (
                  <FavoriteBorderIcon style={{ fontSize: "200px" }} />
                )
              ) : null}
            </div>

            <div>
              {!props.user.isLocal() && (
                <IconButton id="volumeButton" onClick={toggleSound}>
                  {mutedSound ? (
                    <VolumeOffIcon color="secondary" />
                  ) : (
                    <VolumeUpIcon />
                  )}
                </IconButton>
              )}
            </div>
          </div>
        ) : null}
      </button>
    </div>
  );
}
export default SelectStreamComponent;
