import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./modules/userSlice";
import talkRoomSlice from "./modules/talkRoomSlice";

const reducer = combineReducers({
  user: userSlice.reducer,
  talkRoom: talkRoomSlice.reducer,
});

const store = configureStore({
  reducer,
});

export default store;
