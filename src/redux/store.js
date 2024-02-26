import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./modules/userSlice";
import talkRoomSlice from "./modules/talkRoomSlice";
import partyFilterSlice from "./modules/partyFilterSlice";

const reducer = combineReducers({
  user: userSlice.reducer,
  talkRoom: talkRoomSlice.reducer,
  partyFilter: partyFilterSlice.reducer,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
