import React, { Component, useRef } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import "./VideoRoomComponent.css";
import { OpenVidu } from "openvidu-browser";
import $ from "jquery";
import io from "socket.io-client";
import ChatComponent from "./chat/ChatComponent";
import GameRoom from "./VideoRooms/GameRoom/GameRoom";
import ReadyButton from "./Buttons/ReadyButton";
import OpenViduLayout from "../layout/openvidu-layout";
import UserModel from "../models/user-model";
import ToolbarComponent from "./toolbar/ToolbarComponent2";
import MusicPlayer from "./MusicPlayer/MusicPlayer";
import IntroduceRoom1 from "./VideoRooms/IntroduceRoom1/IntroduceRoom";
import IntroduceRoom2 from "./VideoRooms/IntroduceRoom2/IntroduceRoom";
import IntroduceRoom3 from "./VideoRooms/IntroduceRoom3/IntroduceRoom";
import IntroduceRoom4 from "./VideoRooms/IntroduceRoom4/IntroduceRoom";
import IntroduceRoom5 from "./VideoRooms/IntroduceRoom5/IntroduceRoom";
import IntroduceRoom6 from "./VideoRooms/IntroduceRoom6/IntroduceRoom";
import ShareModal from "./modals/ShareModal/ShareModal";
import WaitingRoom from "./VideoRooms/WatingRoom/WatingRoom";
import SelectRoom from "./VideoRooms/SelectRoom/SelectRoom";
import DiscussRoom from "./VideoRooms/DiscussRoom/DiscussRoom";
import GameIntroRoom from "./VideoRooms/GameRoom/GameIntroRoom";
import LiarSelectRoom from "./VideoRooms/LiarSelectRoom/LiarSelectRoom";
import LastRoom from "./VideoRooms/LastRoom/LastRoom";
import { get_session } from "../_actions/user_action";
import { connect } from "react-redux";
import SpeedDialBottom from "./Common/SpeedDialBottom";
import SpeedDialTop from "./Common/SpeedDialTop";
import FinalSelectRoom from "./VideoRooms/FinalSelectRoom/FinalSelectRoom";
import FreeTalkRoom from "./VideoRooms/FreeTalkRoom/FreeTalkRoom";
import IntroduceTimer1 from "../components/Common/timer/IntroduceTimer";
import DiscussTimer1 from "../components/Common/timer/DiscussTimer";
import FreeTalkTimer1 from "../components/Common/timer/FreeTalkTimer";
import Grid from "@mui/material/Grid";

var localUser = new UserModel();
const socket = io.connect("http://localhost:4000");

const apiURL = "http://localhost:8080/blink/";

class VideoRoomComponent extends Component {
  constructor(props) {
    super(props);
    // console.log(this.props.store.user.Room.url);

    this.OPENVIDU_SERVER_URL = this.props.openviduServerUrl
      ? this.props.openviduServerUrl
      : "https://" + window.location.hostname + ":4443";
    // this.OPENVIDU_SERVER_URL = "https://i7a402.p.ssafy.io:8443";
    this.OPENVIDU_SERVER_SECRET = this.props.openviduSecret
      ? this.props.openviduSecret
      : "MY_SECRET";
    // this.OPENVIDU_SERVER_SECRET = this.props.openviduSecret
    // ? this.props.openviduSecret
    // : "ssafy47ssafy47";
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    console.log(this.props.store);
    let sessionName = "3"; //민 this.props.store.user.Room.url;
    console.log(window.location.hash);
    // console.log(this.props.store.user.Room);

    let userName = "3"; //민 this.props.store.user.Room.nickname;

    this.remotes = [];
    this.localUserAccessAllowed = false;

    this.state = {
      mySessionId: sessionName,
      myUserName: userName,
      session: undefined,
      localUser: undefined,
      subscribers: [],
      chatDisplay: "none",
      currentVideoDevice: undefined,
      participantNum: 1,
      mode: 0,
      display: "block",
      filter: true,
      roomLimit: 0,
      showFF: true,

      seq: 1,
      sec: 15,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    this.nicknameChanged = this.nicknameChanged.bind(this);
    this.setMode = this.setMode.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.checkNotification = this.checkNotification.bind(this);
    this.checkSize = this.checkSize.bind(this);
    this.initializeSessionView = this.initializeSessionView.bind(this);
    this.setRole = this.setRole.bind(this);
    this.onHandleDisplay = this.onHandleDisplay.bind(this);
    this.handleFilter = this.handleFilter.bind(this);

    this.answerChanged = this.answerChanged.bind(this);
    this.seqPlus = this.seqPlus.bind(this);
  }
  seqPlus() {
    this.setState({ seq: this.state.seq + 1 });
    console.log("my seq is, ", this.sta);
  }
  handleFilter() {
    this.setState({ filter: !this.state.filter });
  }
  onHandleDisplay() {
    this.setState({ display: "none" });
  }
  setRole() {
    socket.on("sequence", (cnt) => {
      console.log("cntcntcnt", cnt.sequence);
      localUser.setSequence(cnt.sequence);
      if (cnt.sequence === 1 || cnt.sequence === 2) {
        localUser.setRole("mafia");
        axios.get(apiURL + "api/v1/game/isLiar", {
          params: {
            playerSeq: localUser.getPlayerSeq(),
            isLiar: 1,
          },
        });
      } else {
        localUser.setRole("citizen");
        axios.get(apiURL + "api/v1/game/isLiar", {
          params: {
            playerSeq: localUser.getPlayerSeq(),
            isLiar: 0,
          },
        });
      }
    });
  }

  setMode(num) {
    this.setState({ mode: num });
    this.updateLayout();
    console.log("this is mode about", this.state.mode);
  }
  initializeSessionView() {
    // Tooltips
    // $('[data-toggle="tooltip"]').tooltip();
    // Input clipboard
    $("#copy-input").val(
      "http://localhost:3000/lobby?room=" //민  + this.props.store.user.Room.url
    );
    $("#copy-button").bind("click", function () {
      var input = document.getElementById("copy-input");
      input.focus();
      input.setSelectionRange(0, input.value.length);
      try {
        var success = document.execCommand("copy");
        if (success) {
          $("#copy-button").trigger("copied", ["Copied!"]);
        } else {
          $("#copy-button").trigger("copied", ["Copy with Ctrl-c"]);
        }
      } catch (err) {
        $("#copy-button").trigger("copied", ["Copy with Ctrl-c"]);
      }
    });

    // Handler for updating the tooltip message.
    // $('#copy-button').bind('copied', function (event, message) {
    //   $(this).attr('title', message)
    //     .tooltip('fixTitle')
    //     .tooltip('show')
    //     .attr('title', "Copy to Clipboard")
    //     .tooltip('fixTitle');
    // });
  }

  componentDidMount() {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: "OV_big", // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    this.layout.initLayoutContainer(
      document.getElementById("layout"),
      openViduLayoutOptions
    );
    window.addEventListener("beforeunload", this.onbeforeunload);
    window.addEventListener("resize", this.updateLayout);
    window.addEventListener("resize", this.checkSize);
    this.joinSession();
    // try {
    //   axios
    //     .get(apiURL + "api/v1/rooms/roomSize", {
    //       params: { roomSeq: this.props.store.user.Room.url.split("_")[0] },
    //     })
    //     .then((res) => this.setState({ roomLimit: res.data }));
    // } catch (error) {
    //   console.log(error);
    // }
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    window.removeEventListener("resize", this.updateLayout);
    window.removeEventListener("resize", this.checkSize);

    console.log("leaveSession");
    this.leaveSession();
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  joinSession() {
    this.OV = new OpenVidu();

    localUser.setPlayerSeq(this.props.store.user.Room.playerSeq);
    socket.emit("sequence");

    console.log("this is playerSeq", this.props.store.user.Room.playerSeq);

    try {
      axios
        .get(apiURL + "api/v1/rooms/roomSize", {
          //민 params: { roomSeq: this.props.store.user.Room.url.split("_")[0] },
        })
        .then((res) =>
          this.setState({ roomLimit: this.state.roomLimit + res.data }, () => {
            // this.setRole();
          })
        );
    } catch (error) {
      console.log(error);
    }
    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        this.subscribeToStreamCreated();
        this.connectToSession();
        this.setRole();
      }
    );
  }

  connectToSession() {
    console.log("is console here?");
    if (this.props.token !== undefined) {
      console.log("token received: ", this.props.token);
      this.connect(this.props.token);
    } else {
      this.getToken()
        .then((token) => {
          console.log(token);
          this.connect(token);
        })
        .catch((error) => {
          if (this.props.error) {
            this.props.error({
              error: error.error,
              message: error.message,
              code: error.code,
              status: error.status,
            });
          }
          console.log(
            "There was an error getting the token:",
            error.code,
            error.message
          );
          alert("There was an error getting the token:", error.message);
        });
    }
  }

  connect(token) {
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        this.connectWebCam();
      })
      .catch((error) => {
        if (this.props.error) {
          this.props.error({
            error: error.error,
            messgae: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error connecting to the session:", error.message);
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  }

  async connectWebCam() {
    var devices = await this.OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === "videoinput");
    var path =
      window.location.pathname.slice(-1) == "/"
        ? window.location.pathname
        : window.location.pathname + "/";
    window.history.pushState("", "", path + "#" + this.state.mySessionId);

    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: undefined,
      //videoSource: videoDevices[0].deviceId,
      publishAudio: !localUser.isAudioActive(),
      publishVideo: !localUser.isVideoActive(),
      resolution: "640x480",
      frameRate: 30,
      insertMode: "APPEND",
    });

    if (this.state.session.capabilities.publish) {
      publisher.on("accessAllowed", () => {
        this.state.session.publish(publisher).then(() => {
          this.updateSubscribers();
          this.localUserAccessAllowed = true;
          if (this.props.joinSession) {
            this.props.joinSession();
          }
        });
      });
    }
    localUser.setNickname(this.state.myUserName);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    this.initializeSessionView();
    this.setState(
      { currentVideoDevice: videoDevices[0], localUser: localUser },
      () => {
        this.state.localUser.getStreamManager().on("streamPlaying", (e) => {
          this.updateLayout();
          publisher.videos[0].video.parentElement.classList.remove(
            "custom-class"
          );
        });
      }
    );
  }

  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: this.state.localUser.getNickname(),
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
            playerSeq: this.state.localUser.getPlayerSeq(),
            answer: this.state.localUser.getAnswer(),
            seq: this.state.localUser.getSequence(),
          });
        }
        this.updateLayout();
      }
    );
  }

  leaveSession() {
    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }
    socket.emit("leaveSession");

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionB",
      myUserName: "OpenVidu_User" + Math.floor(Math.random() * 100),
      localUser: undefined,
    });
    if (this.props.leaveSession) {
      this.props.leaveSession();
    }
  }
  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  nicknameChanged(nickname) {
    let localUser = this.state.localUser;
    localUser.setNickname(nickname);
    this.setState({ localUser: localUser });
    this.sendSignalUserChanged({
      nickname: this.state.localUser.getNickname(),
    });
  }
  answerChanged(answer) {
    let localUser = this.state.localUser;
    localUser.setAnswer(answer);
    this.setState({ localUser: localUser });
    this.sendSignalUserChanged({
      answer: this.state.localUser.getAnswer(),
    });
  }

  deleteSubscriber(stream) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  subscribeToStreamCreated() {
    console.log("here!!!", this.state.session);
    this.state.session.on("streamCreated", (event) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      // var subscribers = this.state.subscribers;
      this.setState({ participantNum: (this.state.participantNum += 1) });
      subscriber.on("streamPlaying", (e) => {
        console.log("here!!!");
        console.log("subscribers!!", subscriber);
        console.log(subscriber.videos[0].video.parentElement.classList);
        subscriber.videos[0].video.parentElement.classList.remove(
          "custom-class"
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType("remote");
      const nickname = event.stream.connection.data.split("%")[0];
      newUser.setNickname(JSON.parse(nickname).clientData);

      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  subscribeToStreamDestroyed() {
    // On every Stream destroyed...
    this.state.session.on("streamDestroyed", (event) => {
      socket.emit("leaveSession", this.state.role, this.state.roomLimit);
      // Remove the stream from 'subscribers' array
      this.setState({ participantNum: (this.state.participantNum -= 1) });
      this.deleteSubscriber(event.stream);
      setTimeout(() => {}, 20);
      event.preventDefault();
      this.updateLayout();
    });
  }

  subscribeToUserChanged() {
    this.state.session.on("signal:userChanged", (event) => {
      let remoteUsers = this.state.subscribers;
      remoteUsers.forEach((user) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log("EVENTO REMOTE: ", event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.isScreenShareActive !== undefined) {
            user.setScreenShareActive(data.isScreenShareActive);
          }
          if (data.playerSeq !== undefined) {
            user.setPlayerSeq(data.playerSeq);
          }
          if (data.answer !== undefined) {
            user.setAnswer(data.answer);
          }
          if (data.seq !== undefined) {
            user.setSequence(data.seq);
          }
        }
      });
      this.setState({
        subscribers: remoteUsers,
      });
      console.log("subscribers!!!", this.state.subscribers);
    });
  }

  updateLayout() {
    setTimeout(() => {
      this.layout.updateLayout();
    }, 20);
  }

  sendSignalUserChanged(data) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }

  toggleChat(property) {
    let display = property;

    this.setState({ showFF: !this.state.showFF });

    if (display === undefined) {
      display = this.state.chatDisplay === "none" ? "block" : "none";
    }
    if (display === "block") {
      this.setState({ chatDisplay: display, messageReceived: false });
    } else {
      console.log("chat", display);
      this.setState({ chatDisplay: display });
    }
    this.updateLayout();
  }

  checkNotification(event) {
    this.setState({
      messageReceived: this.state.chatDisplay === "none",
    });
  }
  checkSize() {
    if (
      document.getElementById("layout").offsetWidth <= 700 &&
      !this.hasBeenUpdated
    ) {
      this.toggleChat("none");
      this.hasBeenUpdated = true;
    }
    if (
      document.getElementById("layout").offsetWidth > 700 &&
      this.hasBeenUpdated
    ) {
      this.hasBeenUpdated = false;
    }
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const localUser = this.state.localUser;
    var chatDisplay = { display: this.state.chatDisplay };

    return (
      <div className="container" id="container">
        <ToolbarComponent
          //민 sessionId={this.props.store.user.Room.url}
          user={localUser}
          showNotification={this.state.messageReceived}
          camStatusChanged={this.camStatusChanged}
          micStatusChanged={this.micStatusChanged}
          leaveSession={this.leaveSession}
          toggleChat={this.toggleChat}
        />
        {/* Waiting>>Introduce>>Select>>GameIntro>>Discuss>>Game>>
        LiarSelect>>FreeTalk>>FinalSelect */}
        <Grid container>
          <Grid item xs={9} style={{ border: "2px solid #blue" }}>
            <div id="layout" className="bounds9" style={{}}>
              {this.state.mode === 0 ? (
                <WaitingRoom
                  filter={this.state.filter}
                  localUser={localUser}
                  subscribers={this.state.subscribers}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                ></WaitingRoom>
              ) : this.state.mode === 1 ? (
                <IntroduceRoom1
                  seqPlus={this.seqPlus}
                  seq={this.state.seq}
                  participantNum={this.state.participantNum}
                  localUser={localUser}
                  subscribers={this.state.subscribers}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  setMode={this.setMode}
                />
              ) : this.state.mode === 12 ? (
                <IntroduceRoom2
                  localUser={localUser}
                  subscribers={this.state.subscribers}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  setMode={this.setMode}
                />
              ) : this.state.mode === 13 ? (
                <IntroduceRoom3
                  localUser={localUser}
                  subscribers={this.state.subscribers}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  setMode={this.setMode}
                />
              ) : this.state.mode === 14 ? (
                <IntroduceRoom4
                  localUser={localUser}
                  subscribers={this.state.subscribers}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  setMode={this.setMode}
                />
              ) : this.state.mode === 15 ? (
                <IntroduceRoom5
                  localUser={localUser}
                  subscribers={this.state.subscribers}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  setMode={this.setMode}
                />
              ) : this.state.mode === 16 ? (
                <IntroduceRoom6
                  localUser={localUser}
                  subscribers={this.state.subscribers}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  setMode={this.setMode}
                />
              ) : this.state.mode === 2 ? (
                <SelectRoom
                  participantNum={this.state.participantNum}
                  localUser={localUser}
                  subscribers={this.state.subscribers}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  setMode={this.setMode}
                />
              ) : this.state.mode === 3 ? (
                <GameIntroRoom
                  answerChanged={this.answerChanged}
                  participantNum={this.state.participantNum}
                  localUser={localUser}
                  subscribers={this.state.subscribers}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  setMode={this.setMode}
                />
              ) : this.state.mode === 4 ? (
                <DiscussRoom
                  participantNum={this.state.participantNum}
                  localUser={localUser}
                  subscribers={this.state.subscribers}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  setMode={this.setMode}
                />
              ) : this.state.mode === 5 ? (
                <GameRoom
                  answerChanged={this.answerChanged}
                  participantNum={this.state.participantNum}
                  localUser={localUser}
                  subscribers={this.state.subscribers}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  setMode={this.setMode}
                />
              ) : this.state.mode === 6 ? (
                <LiarSelectRoom
                  //민 roomSeq={this.props.store.user.Room.url.split("_")[0]}
                  participantNum={this.state.participantNum}
                  localUser={localUser}
                  subscribers={this.state.subscribers}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  setMode={this.setMode}
                />
              ) : this.state.mode === 7 ? (
                <FreeTalkRoom
                  participantNum={this.state.participantNum}
                  localUser={localUser}
                  subscribers={this.state.subscribers}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  setMode={this.setMode}
                />
              ) : this.state.mode === 8 ? (
                <FinalSelectRoom
                  leaveSession={this.leaveSession}
                  roomSeq={this.props.store.user.Room.url.split("_")[0]}
                  participantNum={this.state.participantNum}
                  localUser={localUser}
                  subscribers={this.state.subscribers}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  setMode={this.setMode}
                />
              ) : this.state.mode === 9 ? (
                <LastRoom
                  roomSeq={this.props.store.user.Room.url.split("_")[0]}
                  participantNum={this.state.participantNum}
                  localUser={localUser}
                  subscribers={this.state.subscribers}
                  chatDisplay={this.state.chatDisplay}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  setMode={this.setMode}
                />
              ) : null}
            </div>
          </Grid>
          <Grid item xs={3}>
            {localUser !== undefined &&
              localUser.getStreamManager() !== undefined && (
                <div className="OT_root OT_publisher custom-class">
                  <ChatComponent
                    style={{}}
                    user={localUser}
                    chatDisplay="block"
                    messageReceived={this.checkNotification}
                  />
                </div>
              )}
          </Grid>
        </Grid>
        {/* 채팅 없애기 옮기는거 실패 앱솔이여서안됨 그냥 없애거나 디자인바꾸기 */}
        {/* {localUser !== undefined && localUser.getStreamManager() !== undefined && (
          <div
            className="OT_root OT_publisher custom-class"
            style={chatDisplay}
          >
            <ChatComponent
              style={{}}
              user={localUser}
              chatDisplay={this.state.chatDisplay}
              close={this.toggleChat}
              messageReceived={this.checkNotification}
            />
          </div>
        )} */}
        {/* <ReadyButton
            onHandleDisplay={this.onHandleDisplay}
            display={this.state.display}
            participantNum={this.state.participantNum}
            setMode={this.setMode}
          /> */}
        {/* </div> */}
        {/* <MusicPlayer /> */}{" "}
        {/* <SpeedDialTop
          sessionId={mySessionId}
          showNotification={this.state.messageReceived}
          toggleChat={this.toggleChat}
          
        /> */}
        <SpeedDialBottom
          handleFilter={this.handleFilter}
          user={localUser}
          camStatusChanged={this.camStatusChanged}
          micStatusChanged={this.micStatusChanged}
          leaveSession={this.leaveSession}
        />
        {this.state.mode === 0 ? (
          <ReadyButton
            onHandleDisplay={this.onHandleDisplay}
            display={this.state.display}
            participantNum={this.state.participantNum}
            setMode={this.setMode}
            //민 roomSeq={this.props.store.user.Room.url.split("_")[0]}
          />
        ) : this.state.mode === 1 ? (
          <IntroduceTimer1
            seqPlus={this.seqPlus}
            participantNum={this.state.participantNum}
            seq={this.state.seq}
            style={{}}
            sec={this.state.sec}
            setMode={this.setMode}
          />
        ) : this.state.mode === 4 ? (
          <DiscussTimer1
            style={{}}
            participantNum={this.state.participantNum}
            sec={10}
            setMode={this.setMode}
          />
        ) : this.state.mode === 7 ? (
          <FreeTalkTimer1
            participantNum={this.state.participantNum}
            style={{}}
            sec={5}
            setMode={this.setMode}
          />
        ) : null}
      </div>
    );
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behaviour MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a session in OpenVidu Server	(POST /api/sessions)
   *   2) Generate a token in OpenVidu Server		(POST /api/tokens)
   *   3) The token must be consumed in Session.connect() method
   */

  getToken() {
    return this.createSession(this.state.mySessionId).then((sessionId) =>
      this.createToken(sessionId)
    );
  }

  createSession(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(this.OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          var error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                this.OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  this.OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                this.OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  }

  createToken(sessionId) {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({});
      axios
        .post(
          this.OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:" + this.OPENVIDU_SERVER_SECRET),
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("TOKEN", response);
          resolve(response.data.token);
        })
        .catch((error) => reject(error));
    });
  }
}
const mapStateToProps = (state) => ({
  store: state,
});
const mapDispatchToProps = (dispatch) => ({
  getStore: () => dispatch(get_session),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoRoomComponent);
