import React, { Component } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import Tooltip from "@mui/material/Tooltip";

import IconButton from "@mui/material/IconButton";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";
import ShareIcon from "@mui/icons-material/Share";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";

// https://smartdevpreneur.com/how-to-customize-mui-speed-dial-size-color-hover/

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);
    this.toggleChat = this.toggleChat.bind(this);
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
      <Box
        style={{ position: "absolute", top: "0", right: "1%", zIndex: 999999 }}
        sx={{ transform: "translateZ(0px)", flexGrow: 1 }}
      >
        <SpeedDial
          // sx={{ position: "absolute", bottom: 100, right: 100 }}
          ariaLabel="SpeedDial playground example"
          icon={<DensityMediumIcon />}
          direction={"down"}
        >
          <SpeedDialAction
            key={"Chat"}
            icon={<QuestionAnswer />}
            tooltipTitle={"Chat"}
            onClick={this.toggleChat}
          ></SpeedDialAction>

          <SpeedDialAction
            key={"Share"}
            icon={<ShareIcon />}
            tooltipTitle={"Share"}
          />
          <SpeedDialAction
            key={"Setting"}
            icon={<SettingsIcon />}
            tooltipTitle={"Setting"}
          />
          <SpeedDialAction
            key={"More"}
            icon={<MoreHorizIcon />}
            tooltipTitle={"More"}
          />
        </SpeedDial>
      </Box>
    );
  }
}
