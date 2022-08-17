import React, { useEffect, useState } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";

import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import IconButton from "@mui/material/IconButton";
import io from "socket.io-client";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLiar } from "../../_reducers/selectedLiar";

const socket = io.connect("http://localhost:4000");
function GameSelectStream(props) {
  const dispatch = useDispatch();
  let liarArray = useSelector((state) => state.selectedLiar);
  const [nickname, setNickName] = useState(props.user.getNickname());
  const [showForm, setShowForm] = useState(false);
  const [mutedSound, setMutedSound] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedLiar, setSelectedLiar] = useState([]);
  const toggleSound = () => {
    setMutedSound(!mutedSound);
  };

  const onMouseOver = () => {
    setShowForm(true);
  };

  const onClick = () => {
    if (selected === true) {
      setSelected(false);
      props.minusLiar(props.user.getPlayerSeq());

      console.log("How many mafia selected minus? : ", props.liarSelect);
      console.log("selectedLiar:!!!!!", selectedLiar);
    } else {
      setSelected(true);
      props.plusLiar(props.user.getPlayerSeq());

      console.log("How many mafia are selected plus? :", props.liarSelect);
    }

    // if (props.localUser.getRole() === "mafia") {
    //   console.log("iam maifa");
    //   if (props.liarSelect === 2) {
    //     console.log("mafia selected other 2 mafias");
    //     props.onSelect();
    //   }
    // } else {
    //   console.log("im citizen");
    //   if (props.liarSelect === 2) {
    //     console.log("citizen selected 3 mafias");
    //     props.onSelect();
    //   }
    // }

    setShowForm(true);
  };

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
        {props.user !== undefined &&
        props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            <OvVideoComponent user={props.user} mutedSound={mutedSound} />

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
              {showForm ? (
                selected ? (
                  <div id="CheckedIcon">
                    <CheckCircleIcon />
                  </div>
                ) : (
                  <CheckCircleOutlineIcon />
                )
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
export default GameSelectStream;
