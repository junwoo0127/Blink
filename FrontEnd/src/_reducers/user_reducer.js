import { LOGIN_USER } from "../_actions/types";
import { AUTH_USER } from "../_actions/types";
import { GET_USER } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload.data };
      break;
    case GET_USER:
      return { ...state, userInfo: action.payload.data };
      break;

    default:
      return state;
  }
}
