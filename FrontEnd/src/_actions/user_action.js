import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  GET_USER,
  CHECK_ID,
  GET_SESSION,
  PARTICIPATE,
  MAKEROOM,
} from "./types";
const apiurl = "https://i7a402.p.ssafy.io:8081/blink";
export function loginUser(dataToSubmit) {
  const request = axios
    .post(apiurl + "/api/v1/auth/login", dataToSubmit)
    .then((response) => response);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function makeRoom(dataToSubmit, token) {
  const request = axios
    .post(apiurl + "/api/v1/rooms/", dataToSubmit, {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => response);

  return {
    type: MAKEROOM,
    payload: request,
  };
}

export function enterRoom(dataToSubmit) {
  const request = axios
    .post(apiurl + "/api/v1/rooms/enter", dataToSubmit)
    .then((response) => response);

  return {
    type: MAKEROOM,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post(apiurl + "/api/v1/users/", dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth(dataToSubmit) {
  const request = axios
    .get("https://i7a402.p.ssafy.io:8081/blink/api/v1/users/me", {
      headers: {
        Authorization: dataToSubmit,
      },
    })
    .then((response) => response);
  return {
    type: AUTH_USER,
    payload: request,
  };
}

export function check_id(dataToSubmit) {
  const request = axios
    .post("https://i7a402.p.ssafy.io:8081/blink/api/v1/users/check", dataToSubmit)
    .then((response) => response.data);

  return {
    type: CHECK_ID,
    payload: request,
  };
}

export function get_session() {
  return {
    type: GET_SESSION,
  };
}

export function getUser(dataToSubmit) {
  const request = axios
    .get("https://i7a402.p.ssafy.io:8081/blink/api/v1/users/me", {
      headers: {
        Authorization: dataToSubmit,
      },
    })
    .then((response) => response);

  return {
    type: GET_USER,
    payload: request,
  };
}

export function isParticipate(dataToSubmit) {
  return {
    type: PARTICIPATE,
    payload: dataToSubmit,
  };
}
