import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  publicRoomId: null,
};

const talkRoomSlice = createSlice({
  name: "talkRoom",
  initialState,
  reducers: {
    setPublicRoomId: (state, payload) => {
      state.publicRoomId = payload.payload;
    },
  },
});

export default talkRoomSlice;
export const { setPublicRoomId } = talkRoomSlice.actions;
