import { combineReducers } from "redux";
import user from "./user_reducer";
import quiz_counter from "./quiz_counter";
const rootReducer = combineReducers({
  user,
  quiz_counter,
});

export default rootReducer;
