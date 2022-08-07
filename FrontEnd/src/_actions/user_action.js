import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";
const apiurl = "http://localhost:8080/blink";
export function loginUser(dataToSubmit) {
  const request = axios
    .post(apiurl + "/api/v1/auth/login", dataToSubmit)
    .then((response) => response.data)
    .catch((error) => error.response.data);

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

export function auth() {
  const request = axios
    .get(apiurl + "/api/v1/users/me")
    .then((response) => response.data);

  return {
    type: AUTH_USER,
    payload: request,
  };
}
