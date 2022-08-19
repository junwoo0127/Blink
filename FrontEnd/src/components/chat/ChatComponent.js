import React, { Component } from "react";
import IconButton from "@mui/material/IconButton";

import Fab from "@mui/material/Fab";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import SendIcon from "@mui/icons-material/Send";
import "./ChatComponent.css";
import { Tooltip } from "@mui/material";

export default class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      message: "",
      messageList2: [],
      message2: "",
    };
    this.chatScroll = React.createRef();

    this.handlePressKey1 = this.handlePressKey1.bind(this);
    this.handlePressKey2 = this.handlePressKey2.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);

    this.sendMessage1 = this.sendMessage1.bind(this);
    this.sendMessage2 = this.sendMessage2.bind(this);
  }

  componentDidMount() {
    this.props.user
      .getStreamManager()
      .stream.session.on("signal:chat", (event) => {
        const data = JSON.parse(event.data);
        console.log("message from message", data);
        let messageList = this.state.messageList;
        messageList.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
          gender: data.gender,
        });
        // const document = window.document;
        // setTimeout(() => {
        //   const userImg = document.getElementById(
        //     "userImg-" + (this.state.messageList.length - 1)
        //   );
        //   const video = document.getElementById("video-" + data.streamId);
        //   const avatar = userImg.getContext("2d");
        //   avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
        //   this.props.messageReceived();
        // }, 50);
        this.setState({ messageList: messageList });
        this.scrollToBottom();
      });
    this.props.user
      .getStreamManager()
      .stream.session.on("signal:chat2", (event) => {
        const data = JSON.parse(event.data);
        console.log("message2 from message2", data);
        let messageList2 = this.state.messageList2;
        messageList2.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message2: data.message2,
          gender: data.gender,
        });
        // const document = window.document;
        // setTimeout(() => {
        //   const userImg = document.getElementById(
        //     "userImg-" + (this.state.messageList.length - 1)
        //   );
        //   const video = document.getElementById("video-" + data.streamId);
        //   const avatar = userImg.getContext("2d");
        //   avatar.drawImage(video, 200, 120, 285, 285, 0, 0, 60, 60);
        //   this.props.messageReceived();
        // }, 50);
        this.setState({ messageList2: messageList2 });
        this.scrollToBottom();
      });
  }

  handleChange1(event) {
    this.setState({ message: event.target.value });
  }
  handleChange2(event) {
    this.setState({ message2: event.target.value });
  }

  handlePressKey1(event) {
    if (event.key === "Enter") {
      this.sendMessage1();
    }
  }
  handlePressKey2(event) {
    if (event.key === "Enter") {
      this.sendMessage2();
    }
  }

  sendMessage1() {
    console.log(this.state.message);
    if (
      this.props.user &&
      this.state.message &&
      this.props.user.gender === "M"
    ) {
      let message = this.state.message.replace(/ +(?= )/g, "");
      if (message !== "" && message !== " ") {
        const data = {
          message: message,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user.getStreamManager().stream.streamId,
          gender: this.props.user.getGender(),
        };
        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    this.setState({ message: "" });
  }
  sendMessage2() {
    console.log(this.state.message);
    if (this.props.user && this.state.message2) {
      let message2 = this.state.message2.replace(/ +(?= )/g, "");
      if (message2 !== "" && message2 !== " ") {
        const data = {
          message2: message2,
          nickname: this.props.user.getNickname(),
          streamId: this.props.user.getStreamManager().stream.streamId,
          gender: this.props.user.getGender(),
        };
        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "chat2",
        });
      }
    }
    this.setState({ message2: "" });
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.chatScroll.current.scrollTop =
          this.chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  }

  render() {
    const styleChat = { display: this.props.chatDisplay };
    return (
      <div id="chatContainer">
        {this.props.user.gender === "M" ? (
          <div id="chatComponent" style={styleChat}>
            <div id="chatToolbar">
              <span> 남성 채팅방</span>
            </div>
            <div className="message-wrap" ref={this.chatScroll}>
              {this.state.messageList.map((data, i) => (
                <div
                  key={i}
                  id="remoteUsers"
                  className={
                    "message" +
                    (data.connectionId !== this.props.user.getConnectionId()
                      ? " left"
                      : " right")
                  }
                >
                  <div className="msg-detail">
                    <div className="msg-info">
                      <p> {data.nickname}</p>
                    </div>
                    <div className="msg-content">
                      <span className="triangle" />
                      <p className="text">{data.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div id="messageInput">
              <input
                placeholder="Send a messge"
                id="chatInput"
                value={this.state.message}
                onChange={this.handleChange1}
                onKeyPress={this.handlePressKey1}
              />
              <Tooltip title="Send message">
                <Fab size="small" id="sendButton" onClick={this.sendMessage1}>
                  <SendIcon />
                </Fab>
              </Tooltip>
            </div>
          </div>
        ) : (
          <div id="chatComponent" style={styleChat}>
            <div id="chatToolbar">
              <span>여성 채팅방</span>
            </div>
            <div className="message-wrap" ref={this.chatScroll}>
              {this.state.messageList2.map((data, i) => (
                <div
                  key={i}
                  id="remoteUsers"
                  className={
                    "message" +
                    (data.connectionId !== this.props.user.getConnectionId()
                      ? " left"
                      : " right")
                  }
                >
                  <div className="msg-detail">
                    <div className="msg-info">
                      <p> {data.nickname}</p>
                    </div>
                    <div className="msg-content">
                      <span className="triangle" />
                      <p className="text">{data.message2}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div id="messageInput">
              <input
                placeholder="Send a messge"
                id="chatInput"
                value={this.state.message2}
                onChange={this.handleChange2}
                onKeyPress={this.handlePressKey2}
              />
              <Tooltip title="Send message">
                <Fab size="small" id="sendButton" onClick={this.sendMessage2}>
                  <SendIcon />
                </Fab>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
    );
  }
}
