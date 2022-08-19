import React, { Component } from "react";
import "./StreamComponent.css";
import { FaceMesh } from "@mediapipe/face_mesh";

import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";

export default class OvVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.webcamRef = React.createRef();
    this.canvasRef = React.createRef();
    this.connect = window.drawConnectors;
    this.camera = null;
    this.img = null;
  }

  async componentDidMount() {
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      },
    });
    faceMesh.setOptions({
      maxNumFaces: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    if (
      typeof this.videoRef.current !== "undefined" &&
      this.videoRef.current !== null
    ) {
      faceMesh.onResults(this.onResults);
      this.camera = new cam.Camera(this.videoRef.current, {
        onFrame: async () => {
          await faceMesh.send({ image: this.videoRef.current });
        },
        width: 640,
        height: 480,
      });
      this.camera.start();
    }

    // const canvas = document.querySelector(".output_canvas");
    // const video = document.querySelector(".output_video");
    // const stream = canvas.captureStream();
    // video.srcObject = stream;
    if (this.props && this.props.user.streamManager && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }
  }
  delay(ms) {
    console.log("2");
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }
  }
  onResults = (results) => {
    // const video = webcamRef.current.video;

    const videoWidth = this.videoRef.current.videoWidth;
    const videoHeight = this.videoRef.current.videoHeight;

    // Set canvas width
    this.canvasRef.current.width = videoWidth;
    this.canvasRef.current.height = videoHeight;

    const canvasElement = this.canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");
    canvasCtx.save();
    // canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    // canvasCtx.fillStyle = "#0f0";
    // canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        this.connect(canvasCtx, landmarks, Facemesh.FACEMESH_TESSELATION, {
          color: "#C0C0C070",
          lineWidth: 5,
        });
        this.connect(canvasCtx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {
          color: "#FF3030",
        });

        this.connect(canvasCtx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {
          color: "#30FF30",
        });

        this.connect(canvasCtx, landmarks, Facemesh.FACEMESH_LIPS, {
          color: "#E0E0E0",
        });
      }
    }
    canvasCtx.restore();
  };

  render() {
    return (
      <div>
        <video
          autoPlay={true}
          className="output_video"
          id={"video-" + this.props.user.getStreamManager().stream.streamId}
          ref={this.videoRef}
          muted={this.props.mutedSound}
          style={{
            display: "none",
          }}
        />
        {/* <Webcam
          ref={this.webcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />{" "} */}
        <canvas
          ref={this.canvasRef}
          className="output_canvas"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        ></canvas>
      </div>
    );
  }
}
