import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";

import styled from "styled-components";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Logo = styled.img`
  width: 75px;
  display: { xs: "none", md: "flex" };
`;

export default class ToolbarComponent2 extends Component {
  constructor(props) {
    super(props);
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
              <Logo
                src={logo}
                style={{
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

            <form class="hidden-xs" style ={{position:"absolute", right:"1px", width :"230px"}}>
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
                    Share URL
                  </button>
                </span>
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
