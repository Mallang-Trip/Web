import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterSlice from "./modules/counterSlice";

const reducer = combineReducers({
  counter: counterSlice.reducer,
});

const store = configureStore({
  reducer,
});

export default store;
