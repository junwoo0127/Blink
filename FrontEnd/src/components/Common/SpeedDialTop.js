import React, { Component } from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import { motion, AnimatePresence } from "framer-motion";
import Tooltip from "@mui/material/Tooltip";
import $ from "jquery";
import IconButton from "@mui/material/IconButton";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";
import ShareIcon from "@mui/icons-material/Share";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// https://smartdevpreneur.com/how-to-customize-mui-speed-dial-size-color-hover/
const backdrop = {
  visible: {
    opacity: 1,
  },
  hidden: { opacity: 0 },
};

const modal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "25vh",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};
export default class ToolbarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.toggleChat = this.toggleChat.bind(this);

    this.handleOpen = this.handleOpen.bind(this);
  }

  handleOpen() {
    document.getElementById("copy-button").click();
  }

  toggleChat() {
    this.props.toggleChat();
  }

  toggleShare() {
    this.props.toggleShare();
    console.log("발싸");
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
      <div>
        <Box
          style={{
            position: "absolute",
            top: "0",
            right: "1%",
            zIndex: 999999,
          }}
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
              onClick={this.handleOpen}
            ></SpeedDialAction>

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

        <div
          className="modal"
          variants={modal}
          style={{
            display: "hidden",
            borderRadius: "3vw",
            border: "1px solid #f7dbf0",
            backgroundColor: "#f7dbf0",
          }}
        >
          {" "}
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
        </div>
      </div>
    );
  }
}
