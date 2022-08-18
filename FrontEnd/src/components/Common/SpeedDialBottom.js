import React, { Component, useState } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import CloseIcon from "@mui/icons-material/Close";

import IconButton from "@mui/material/IconButton";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";

// const actions = [
//   { icon: <PowerSettingsNew />, name: "Leave" },
//   { icon: <FaceRetouchingNaturalIcon />, name: "Filter" },
//   { icon: <VideocamIcon />, name: "Video" },
//   { icon: <MicIcon />, name: "Mic" },
// ];

// https://smartdevpreneur.com/how-to-customize-mui-speed-dial-size-color-hover/

export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);

    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);

    this.leaveSession = this.leaveSession.bind(this);
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
  handleFilter() {
    this.props.handleFilter();
  }

  render() {
    const localUser = this.props.user;

    return (
      <Box
        style={{ position: "absolute", bottom: "0", right: "1%" }}
        sx={{ transform: "translateZ(0px)", flexGrow: 1 }}
      >
        <SpeedDial
          // sx={{ position: "absolute", bottom: 100, right: 100 }}
          ariaLabel="SpeedDial playground example"
          direction={"left"}
          icon={<SpeedDialIcon openIcon={<CloseIcon />} />}
        >
          {/* {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={handleClose}
                        href={action.link}
            />
          ))} */}

          <SpeedDialAction
            key={"Leave"}
            icon={<PowerSettingsNew style={{ fill: "red" }} />}
            tooltipTitle={"Leave"}
            onClick={this.leaveSession}
            // 캠마이크끄고 초기화면
            href={"/"}
          />
          <SpeedDialAction
            key={"Filter"}
            icon={<FaceRetouchingNaturalIcon style={{ fill: "yellow" }} />}
            tooltipTitle={"Filter"}
            // onClick={handleFilter}
          />
          <SpeedDialAction
            key={"Video"}
            onClick={this.camStatusChanged}
            icon={
              <>
                {localUser !== undefined && localUser.isVideoActive() ? (
                  <VideocamIcon />
                ) : (
                  <VideocamOffIcon color="secondary" />
                )}
              </>
            }
            tooltipTitle={"Video"}
          />
          <SpeedDialAction
            key={"Mic"}
            onClick={this.micStatusChanged}
            icon={
              <>
                {localUser !== undefined && localUser.isAudioActive() ? (
                  <MicIcon />
                ) : (
                  <MicOffIcon color="secondary" />
                )}
              </>
            }
            tooltipTitle={"Mic"}
          />
        </SpeedDial>
      </Box>
    );
  }
}
