import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";

// import styled from "styled-components";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

import { alpha, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const ButtonCo = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#A6095D"),
  lineHeight: "25px",
  borderRadius: "30px",
  fontSize: "20px",
  padding: "3px 0px",
  maxWidth: "18%",
  // background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  backgroundColor: "#A6095D",
  "&:hover": {
    // backgroundColor: "#A6095D",
    background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  },
}));

// const Logo = styled.img`
//   width: 75px;
//   display: { xs: "none", md: "flex" };
// `;

export default class ToolbarComponent2 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    const url = "http://localhost:3000/";
    // const shareLink = (e) => {
    //   console.log();
    //   navigator.clipboard.writeText(url + "lobby?room=" + mySessionId);
    // };
    return (
      <AppBar
        position="sticky"
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <Container maxWidth="false">
          <Toolbar
            disableGutters
            style={
              {
                // minHeight: "50px"
              }
            }
          >
            <Link to="/">
              <img
                src={logo}
                style={{
                  width: "75px",
                  marginRight: "10px",
                }}
              />
            </Link>

            {/* 방 제목  중앙 */}
            {/* <div id="navSessionInfo">
             
              {this.props.sessionId && (
                <div id="titleContent">
                  <span id="session-title">{mySessionId}</span>
                </div>
              )}
            </div> */}

            <form
              class="hidden-xs"
              style={{
                position: "absolute",
                top: "45%",
                left: "90%",
                transform: "translate(-50%, -50%)",
                width: "100%",
              }}
            >
              <div
              //  class="input-group"
              >
                <input
                  style={{
                    position: "absolute",
                    top: "-9999999px",

                    left: "-9999999px",
                    width: "1px",
                    height: "1px",
                    margin: "0",
                    padding: "0",
                    background: "none",
                    lineHeight: "0",
                    textIndent: "-9999999px",
                  }}
                  type="text"
                  // class="form-control"
                  placeholder="Some path"
                  id="copy-input"
                />
                {/* <span class="input-group-btn"> */}
                <ButtonCo
                  fullWidth
                  variant="contained"
                  // class="btn btn-default"
                  type="button"
                  id="copy-button"
                  data-toggle="tooltip"
                  data-placement="button"
                  title="Copy to Clipboard"
                >
                  Share URL
                </ButtonCo>
                {/* </span> */}
              </div>
            </form>

            {/* <button onClick={shareLink} title="URL복사"></button> */}

            {/* 스피드다이얼로 표시 */}
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
