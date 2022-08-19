import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import Toolbar from "@mui/material/Toolbar";
import BGMPlayer from "../MusicPlayer/BGMPlayer";
import Container from "@mui/material/Container";

// import styled from "styled-components";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { alpha, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const ButtonCo = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText("#beaee2"),
  lineHeight: "25px",
  borderRadius: "30px",
  fontSize: "20px",
  padding: "3px 0px",
  maxWidth: "18%",
  // background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
  backgroundColor: "#beaee2",
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
    this.state = {
      mode: this.props.mode,
    };
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
            <Grid container>
              <Grid item xs={3}>
                <Link to="/">
                  <img
                    src={logo}
                    style={{
                      width: "75px",
                      marginRight: "10px",
                    }}
                  />
                </Link>
              </Grid>
              <Grid item xs={6}>
                <form
                  class="hidden-xs"
                  style={{
                    // position: "absolute",
                    // top: "45%",
                    // left: "90%",
                    // transform: "translate(-50%, -50%)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{ margin: "3px 0px 0px" }}
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
                    {this.props.mode === 0 ? (
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
                    ) : this.props.mode === 2 ? (
                      <ButtonCo
                        fullWidth
                        variant="contained"
                        // class="btn btn-default"
                        type="button"
                        id="copy-button"
                        data-toggle="tooltip"
                        data-placement="button"
                        title="Copy to Clipboard"
                        disabled="true"
                      >
                        첫인상 선택의 방
                      </ButtonCo>
                    ) : this.props.mode === 3 ? (
                      <ButtonCo
                        fullWidth
                        variant="contained"
                        // class="btn btn-default"
                        type="button"
                        id="copy-button"
                        data-toggle="tooltip"
                        data-placement="button"
                        title="Copy to Clipboard"
                        disabled="true"
                      >
                        MBTI 게임의 방
                      </ButtonCo>
                    ) : this.props.mode === 4 ? (
                      <ButtonCo
                        fullWidth
                        variant="contained"
                        // class="btn btn-default"
                        type="button"
                        id="copy-button"
                        data-toggle="tooltip"
                        data-placement="button"
                        title="Copy to Clipboard"
                        disabled="true"
                      >
                        토론의 방
                      </ButtonCo>
                    ) : this.props.mode === 5 ? (
                      <ButtonCo
                        fullWidth
                        variant="contained"
                        // class="btn btn-default"
                        type="button"
                        id="copy-button"
                        data-toggle="tooltip"
                        data-placement="button"
                        title="Copy to Clipboard"
                        disabled="true"
                      >
                        MBTI 게임의 방
                      </ButtonCo>
                    ) : this.props.mode === 6 ? (
                      <ButtonCo
                        fullWidth
                        variant="contained"
                        // class="btn btn-default"
                        type="button"
                        id="copy-button"
                        data-toggle="tooltip"
                        data-placement="button"
                        title="Copy to Clipboard"
                        disabled="true"
                      >
                        MBTI 게임의 방
                      </ButtonCo>
                    ) : this.props.mode === 8 ? (
                      <ButtonCo
                        fullWidth
                        variant="contained"
                        // class="btn btn-default"
                        type="button"
                        id="copy-button"
                        data-toggle="tooltip"
                        data-placement="button"
                        title="Copy to Clipboard"
                        disabled="true"
                      >
                        최종 선택의 방
                      </ButtonCo>
                    ) : this.props.mode === 9 ? (
                      <ButtonCo
                        fullWidth
                        variant="contained"
                        // class="btn btn-default"
                        type="button"
                        id="copy-button"
                        data-toggle="tooltip"
                        data-placement="button"
                        title="Copy to Clipboard"
                        disabled="true"
                      >
                        사랑의 방
                      </ButtonCo>
                    ) : null}
                  </div>
                </form>
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>

            {/* <button onClick={shareLink} title="URL복사"></button> */}

            {/* 스피드다이얼로 표시 */}
          </Toolbar>
        </Container>
      </AppBar>
    );
  }
}
