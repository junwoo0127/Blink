import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./VideoRoomComponent.css";
import { OpenVidu } from "openvidu-browser";
import StreamComponent from "./stream/StreamComponent";
import DialogExtensionComponent from "./dialog-extension/DialogExtension";
import ChatComponent from "./chat/ChatComponent";

import OpenViduLayout from "../layout/openvidu-layout";
import UserModel from "../models/user-model";
import ToolbarComponent from "./toolbar/ToolbarComponent";

// const OPENVIDU_SERVER_URL = "https://i7a402.p.ssafy.io:8443";
// const OPENVIDU_SERVER_SECRET = "ssafy47ssafy47";
let initLocalUser = new UserModel();
function VideoRoomComponent2(props) {
  const OPENVIDU_SERVER_URL = props.openviduServerUrl
    ? this.props.openviduServerUrl
    : "https://" + window.location.hostname + ":4443";
  const OPENVIDU_SERVER_SECRET = props.openviduSecret
    ? this.props.openviduSecret
    : "MY_SECRET";
  let OV = null;
  const [hasBeenUpdated, setHasBeenUpdated] = useState(false);
  const layout = new OpenViduLayout();
  let sessionName = props.sessionName ? props.sessionName : "SessionA";
  let userName = props.user
    ? props.user
    : "OpenVidu_User" + Math.floor(Math.random() * 100);
  const remotes = [];
  const [messageReceived, setMessageReceived] = useState();
  let localUserAccessAllowed = false;
  const [mySessionId, setMySessionId] = useState(sessionName);
  const [myUserName, setMyUserName] = useState(userName);
  const [session, setSession] = useState();
  const [localUser, setLocalUser] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [chatDisplay, setChatDisplay] = useState("none");
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined);
  const [showExtensionDialog, setShowExtensionDialog] = useState(false);
  const sessionRef = useRef(session);
  sessionRef.current = session;
  const joinSession = () => {
    OV = new OpenVidu();
    setSession(OV.initSession());
  };
  useEffect(() => {
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

    layout.initLayoutContainer(
      document.getElementById("layout"),
      openViduLayoutOptions
    );
    const preventGoBack = () => {
      window.history.pushState(null, "", window.location.href);
      console.log("prevent go back!");
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", preventGoBack);
    window.addEventListener("beforeunload", onbeforeunload);

    window.addEventListener("resize", checkSize);
    joinSession();
    return (
      () => window.removeEventListener("beforeunload", onbeforeunload()),
      window.removeEventListener("popstate", preventGoBack),
      window.removeEventListener("resize", checkSize()),
      leaveSession()
    );
  }, []);

  const onbeforeunload = () => {
    leaveSession();
  };

  useEffect(() => {
    if (session) {
      subscribeToStreamCreated();
      connectToSession();
    }
  }, [session]);

  const connectToSession = () => {
    if (props.token !== undefined) {
      console.log("token received : ", props.token);
    } else {
      getToken()
        .then((token) => {
          console.log(token);
          connect(token);
        })
        .catch((error) => {
          if (props.error) {
            props.error({
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
  };
  const connect = (token) => {
    sessionRef.current
      .connect(token, { clientData: myUserName })
      .then(() => {
        connectWebCam();
      })
      .catch((error) => {
        if (props.error) {
          props.error({
            error: error.error,
            message: error.message,
            code: error.code,
            status: error.status,
          });
        }
        alert("There was an error connection to the session: ", error.message);
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
      });
  };
  const connectWebCam = async () => {
    var devices = await OV.getDevices();
    var videoDevices = devices.filter((device) => device.kind === "videoinput");

    let publisher = OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: undefined,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: "640x480",
      frameRate: 30,
      insertMode: "APPEND",
    });

    if (session.capabilities.publish) {
      publisher.on("accessAllowed", () => {
        session.publish(publisher).then(() => {
          updateSubscribers();
          localUserAccessAllowed = true;
          if (props.joinSession) {
            props.joinSession();
          }
        });
      });
    }
    localUser.setNickname(myUserName);
    localUser.setConnectionId(session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    subscribeToUserChanged();
    subscribeToStreamDestroyed();
    sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
    });
    setCurrentVideoDevice(videoDevices[0]);
    setLocalUser(initLocalUser);
  };
  // useEffect(
  //   function connectWebCam() {
  //     initLocalUser.getStreamManager().on("streamPlaying", (e) => {
  //       this.publisher.videos[0].video.parentElement.calssList.remove(
  //         "custom-class"
  //       );
  //     });
  //   },
  //   [currentVideoDevice, localUser]
  // );

  const updateSubscribers = () => {
    setSubscribers(remotes);
  };
  useEffect(function updateSubscribers() {
    setSubscribers(remotes);

    if (localUser) {
      sendSignalUserChanged({
        isAudioActive: localUser.isAudioActive(),
        isVideoActive: localUser.isVideoActive(),
        nickname: localUser.getNickname(),
        isScreenShareActive: localUser.isScreenShareActive(),
      });
    }
  });

  const leaveSession = () => {
    const mySession = sessionRef.current;

    if (mySession) {
      mySession.disconnect();
    }

    OV = null;
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName("OpenVidu_User" + Math.floor(Math.random() * 100));
    setLocalUser(undefined);
    if (props.leaveSession) {
      props.leaveSession();
    }
  };

  const camStatusChanged = () => {
    initLocalUser.setVideoActive(!initLocalUser.isVideoActive());
    console.log("here!!!!", initLocalUser.getStreamManager());
    initLocalUser
      .getStreamManager()
      .publishVideo(initLocalUser.isVideoActive());
    sendSignalUserChanged({ isVideoActive: initLocalUser.isVideoActive() });
    setLocalUser(initLocalUser);
  };

  const micStatusChanged = () => {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    setLocalUser(localUser);
  };

  const deleteSubscriber = (stream) => {
    const remoteUsers = subscribers;
    const userStream = remoteUsers.filter(
      (user) => user.getStreamManager().stream === stream
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);
    if (index > -1) {
      remoteUsers.splice(index, 1);
      setSubscribers(remoteUsers);
    }
  };
  const subscribeToStreamCreated = () => {
    session.on("streamCreated", (event) => {
      const subscriber = sessionRef.current.subscribe(event.stream, undefined);
      subscriber.on("streamPlaying", (e) => {
        subscriber.videos[0].video.parentElement.calssList.remove(
          "custom-class"
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType("remote");
      const nickname = event.stream.connection.data.split("%")[0];
      newUser.setNickname(JSON.parse(nickname).clientDate);
      remotes.push(newUser);
      if (localUserAccessAllowed) {
        updateSubscribers();
      }
    });
  };

  const subscribeToStreamDestroyed = () => {
    sessionRef.current.on("streamDestoryed", (event) => {
      deleteSubscriber(event.stream);

      event.preventDefault();
    });
  };

  const subscribeToUserChanged = () => {
    sessionRef.current.on("signal:userChanged", (event) => {
      let remoteUsers = subscribers;
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
            user.setAScreenShareActive(data.isScreenShareActive);
          }
        }
      });
      setSubscribers(remoteUsers);
    });
  };

  const sendSignalUserChanged = (data) => {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    sessionRef.current.signal(signalOptions);
  };

  const toggleChat = (property) => {
    let display = property;

    if (display === undefined) {
      display = chatDisplay === "none" ? "block" : "none";
    }
    if (display === "block") {
      setChatDisplay(display);
      setMessageReceived(false);
    } else {
      console.log("chat", display);
      setChatDisplay(display);
    }
  };

  const checkNotification = () => {
    setMessageReceived(chatDisplay === "none");
  };

  const checkSize = () => {
    if (
      document.getElementById("layout").offsetWidth <= 700 &&
      !hasBeenUpdated
    ) {
      toggleChat("none");
      setHasBeenUpdated(true);
    }
    if (document.getElementById("layout").offsetWidth > 700 && hasBeenUpdated) {
      setHasBeenUpdated(false);
    }
  };

  const getToken = () => {
    createSession(mySessionId).then((sessionId) => createToken(sessionId));
  };

  const createSession = (sessionId) => {
    new Promise((resolve, reject) => {
      let data = JSON.stringify({ customSessionId: sessionId });
      axios
        .post(OPENVIDU_SERVER_URL + "/openvidu/api/sessions", data, {
          headers: {
            Authorization:
              "Basic " + btoa("OPENVIDUAPP:" + OPENVIDU_SERVER_SECRET),
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("CREATE SESION", response);
          resolve(response.data.id);
        })
        .catch((response) => {
          let error = Object.assign({}, response);
          if (error.response && error.response.status === 409) {
            resolve(sessionId);
          } else {
            console.log(error);
            console.warn(
              "No connection to OpenVidu Server. This may be a certificate error at " +
                OPENVIDU_SERVER_URL
            );
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + "/accept-certificate"
              );
            }
          }
        });
    });
  };
  const createToken = (sessionId) => {
    new Promise((resolve, reject) => {
      var data = JSON.stringify({});
      axios
        .post(
          OPENVIDU_SERVER_URL +
            "/openvidu/api/sessions/" +
            sessionId +
            "/connection",
          data,
          {
            headers: {
              Authorization:
                "Basic " + btoa("OPENVIDUAPP:", OPENVIDU_SERVER_SECRET),
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
  };
  return (
    <div className="container" id="container">
      <ToolbarComponent
        sessionId={mySessionId}
        user={localUser}
        showNotification={messageReceived}
        camStatusChanged={camStatusChanged}
        micStatusChanged={micStatusChanged}
        leaveSession={leaveSession}
        toggleChat={toggleChat}
      />

      <div id="layout" className="bounds">
        {localUser !== undefined && localUser.getStreamManager() !== undefined && (
          <div className="OT_root OT_publisher custom-class" id="localUser">
            <StreamComponent user={localUser} />
          </div>
        )}
        {subscribers.map((sub, i) => (
          <div
            key={i}
            className="OT_root OT_publisher custom-class"
            id="remoteUsers"
          >
            <StreamComponent
              user={sub}
              streamId={sub.streamManager.stream.streamId}
            />
          </div>
        ))}
        {localUser !== undefined && localUser.getStreamManager() !== undefined && (
          <div
            className="OT_root OT_publisher custom-class"
            style={chatDisplay}
          >
            <ChatComponent
              user={localUser}
              chatDisplay={chatDisplay}
              close={toggleChat}
              messageReceived={checkNotification}
            />
          </div>
        )}
      </div>
    </div>
  );
}
export default VideoRoomComponent2;
