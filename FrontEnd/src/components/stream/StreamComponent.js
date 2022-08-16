import React, { Component } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";
import Filter from "../Filter/Filter";

import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

import IconButton from "@mui/material/IconButton";

export default class StreamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      mutedSound: false,
    };

    this.toggleSound = this.toggleSound.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound });
  }

  onMouseOver() {
    this.setState({ showForm: true });
  }
  onMouseLeave() {
    this.setState({ showForm: false });
  }

  render() {
    return (
      <div>
        <div
          className="OT_widget-container"
          onMouseOver={this.onMouseOver}
          onMouseLeave={this.onMouseLeave}
        >
          {/* 마우스 접근시 보임  */}
          {this.state.showForm ? (
            <span id="nickname">{this.props.user.getNickname()}</span>
          ) : null}

          {this.props.user !== undefined &&
          this.props.user.getStreamManager() !== undefined ? (
            <div className="streamComponent">
              {/* 화면 송출 부분 ex>> id="video-str_CAM_WG4m_con_QdcVOVkZVu" */}
              {/* <Filter user={this.props.user} /> */}
              {/* {this.props.filter ? (
 
                  <Filter user={this.props.user} /> 
              ) : ( */}
              <OvVideoComponent
                user={this.props.user}
                mutedSound={this.state.mutedSound}
              />
              {/* )} */}

              <div id="statusIcons">
                {!this.props.user.isVideoActive() ? (
                  <div id="camIcon">
                    <VideocamOffIcon id="statusCam" />
                  </div>
                ) : null}

                {!this.props.user.isAudioActive() ? (
                  <div id="micIcon">
                    <MicOffIcon id="statusMic" />
                  </div>
                ) : null}
              </div>

              <div>
                {!this.props.user.isLocal() && (
                  <IconButton id="volumeButton" onClick={this.toggleSound}>
                    {this.state.mutedSound ? (
                      <VolumeOffIcon color="secondary" />
                    ) : (
                      <VolumeUpIcon />
                    )}
                  </IconButton>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
