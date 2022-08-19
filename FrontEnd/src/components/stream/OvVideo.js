import React, { Component } from "react";
import "./StreamComponent.css";
import { FaceMesh } from "@mediapipe/face_mesh";
import Webcam from "react-webcam";
import * as Facemesh from "@mediapipe/face_mesh";
import * as cam from "@mediapipe/camera_utils";

import * as faceapi from "face-api.js";

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
    const MODEL_URL = process.env.PUBLIC_URL + "/models";

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ])
      .then(() => {
        console.log("SS");
      })
      .catch((err) => {
        console.log("@@@@@@@@@@@@@@@@@@@@@@@@");
        console.log(err);
      });
    const video = this.videoRef.current;
    const canvas = this.canvasRef.current;

    const displaySize = { width: 640, height: 480 };
    faceapi.matchDimensions(canvas, displaySize);
    video.onplay = (event) => {
      console.log("@@@@@@@@@@@@@@@@@@@@");
      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
      }, 100);
    };

    if (this.props && this.props.user.streamManager && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }
  }

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
            width: 640,
            height: 480,
            visibility: "hidden",
          }}
        />

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
