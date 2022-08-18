import { Room } from "@mui/icons-material";
import { LOGIN_USER } from "../_actions/types";

import { AUTH_USER } from "../_actions/types";
import { GET_USER } from "../_actions/types";
import { GET_SESSION } from "../_actions/types";
import { PARTICIPATE } from "../_actions/types";
import { MAKEROOM } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload.status };
    // break;
    case GET_USER:
      return { ...state, userInfo: action.payload.data };
      break;
    case AUTH_USER:
      return { ...state, isAuth: action.payload.data };
      break;
    case GET_SESSION:
      return { ...state };
      break;
    case MAKEROOM:
      return { ...state, Room: action.payload.data };
      break;
    case PARTICIPATE:
      return { ...state, isParticipate: action.payload };
    default:
      return { ...state };
  }
}
