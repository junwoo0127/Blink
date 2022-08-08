import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  GET_USER,
  CHECK_ID,
} from "./types";
const apiurl = "http://localhost:8080/blink";
export function loginUser(dataToSubmit) {
  const request = axios
    .post(apiurl + "/api/v1/auth/login", dataToSubmit)
    .then((response) => response)
 
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/user/register", dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth(dataToSubmit) {
    const request = axios
    .get("http://localhost:8080/blink/api/v1/users/me", {
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
    .post("http://localhost:8080/blink/api/v1/users/check", dataToSubmit)
    .then((response) => response.data);

  return {
    type: CHECK_ID,
    payload: request,
  };
}

export function getUser(dataToSubmit) {
  const request = axios
    .get("http://localhost:8080/blink/api/v1/users/me", {
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
