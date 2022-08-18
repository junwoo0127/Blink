import React, { useEffect, useState } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";
import OvVideo from "./OvVideo2";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import io from "socket.io-client";
import { useRef } from "react";
const socket = io.connect("http://localhost:4000");
function GameStreamComponent(props) {
  const [nickname, setNickName] = useState(props.user.getNickname());
  const [showForm, setShowForm] = useState(false);
  const [mutedSound, setMutedSound] = useState(false);
  const [selected, setSelected] = useState(false);
  const [firstLoveCount, setFirstLoveCount] = useState(0);
  const toggleSound = () => {
    setMutedSound(!mutedSound);
  };

  const onMouseOver = () => {
    setShowForm(true);
  };

  const onClick = () => {
    setSelected(true);
    // props.onSelect();
    setShowForm(true);
    props.onSelect();
    socket.emit("selectFirst");
  };
  socket.on("selectFirst", (cnt) => {
    console.log(cnt.firstCount);
  });

  //첫사랑 선택 몇명이 했는지 신호 계속 받기
  const interval = useRef(null);
  useEffect(() => {
    interval.current = setInterval(() => {
      socket.emit("getLoveCount");
    }, 3000);
    return () => clearInterval(interval.current);
  }, []);
  socket.on("getLoveCount", (cnt) => {
    setFirstLoveCount(cnt.firstCount);
    console.log(cnt.firstCount);
  });
  //참가자 수만큼 카운트 쌓였으면 신호 그만 보내기
  useEffect(() => {
    if (firstLoveCount == 3) {
      clearInterval(interval.current);
    }
  }, [firstLoveCount]);
  //참가자 모두 선택했다면 모드 변경
  useEffect(() => {
    if (firstLoveCount === 3) {
      props.mode(3);
    }
  }, [firstLoveCount]);
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
            {/* <OvVideoComponent
              user={props.user}
              mutedSound={mutedSound}
            /> */}
            <OvVideo
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            />

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
                  <div id="LikeIcon">
                    <FavoriteIcon id="statusLike" />
                  </div>
                ) : (
                  <FavoriteBorderIcon />
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
export default GameStreamComponent;
