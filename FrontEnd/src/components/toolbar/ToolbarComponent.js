import React, { Component } from "react";
import "./ToolbarComponent.css";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

import StopScreenShare from "@mui/icons-material/StopScreenShare";
import Tooltip from "@mui/material/Tooltip";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";

import IconButton from "@mui/material/IconButton";

// const logo = require("../../assets/images/openvidu_logo.png");

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);

    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);

    this.leaveSession = this.leaveSession.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  leaveSession() {
    this.props.leaveSession();
  }

  toggleChat() {
    this.props.toggleChat();
  }

  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    const url = "http://localhost:3000/";
    const shareLink = (e) => {
      console.log();
      navigator.clipboard.writeText(url + "lobby?room=" + mySessionId);
    };
    return (
      <AppBar className="toolbar" id="header">
        <Toolbar className="toolbar">
          <div id="navSessionInfo">
            {/* <img id="header_img" alt="OpenVidu Logo" src={logo} /> */}

            {this.props.sessionId && (
              <div id="titleContent">
                <span id="session-title">{mySessionId}</span>
              </div>
            )}
          </div>

          <form class="hidden-xs">
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                placeholder="Some path"
                id="copy-input"
              />
              <span class="input-group-btn">
                <button
                  class="btn btn-default"
                  type="button"
                  id="copy-button"
                  data-toggle="tooltip"
                  data-placement="button"
                  title="Copy to Clipboard"
                >
                  Share the URL
                </button>
              </span>
            </div>
          </form>

          <button onClick={shareLink} title="URL복사"></button>



          <div className="buttonsContent">
            <IconButton
              color="inherit"
              className="navButton"
              id="navMicButton"
              onClick={this.micStatusChanged}
            >
              {localUser !== undefined && localUser.isAudioActive() ? (
                <MicIcon />
              ) : (
                <MicOffIcon color="secondary" />
              )}
            </IconButton>

            <IconButton
              color="inherit"
              className="navButton"
              id="navCamButton"
              onClick={this.camStatusChanged}
            >
              {localUser !== undefined && localUser.isVideoActive() ? (
                <VideocamIcon />
              ) : (
                <VideocamOffIcon color="secondary" />
              )}
            </IconButton>

            <IconButton
              color="secondary"
              className="navButton"
              onClick={this.leaveSession}
              id="navLeaveButton"
            >
              <PowerSettingsNew />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={this.toggleChat}
              id="navChatButton"
            >
              {this.props.showNotification && <div id="point" className="" />}
              <Tooltip title="Chat">
                <QuestionAnswer />
              </Tooltip>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
