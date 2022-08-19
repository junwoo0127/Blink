import { combineReducers } from "redux";
import user from "./user_reducer";
import quiz_counter from "./quiz_counter";
import gender from "./gender_reducer";
const rootReducer = combineReducers({
  user,
  quiz_counter,
  gender
});

export default rootReducer;
