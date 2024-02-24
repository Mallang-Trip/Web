import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  partyRoomId: 0,
  privateRoomId: null,
  publicRoomId: null,
};

const talkRoomSlice = createSlice({
  name: "talkRoom",
  initialState,
  reducers: {
    setPartyRoomId: (state, payload) => {
      state.partyRoomId = payload.payload;
    },
    setPrivateRoomId: (state, payload) => {
      state.privateRoomId = payload.payload;
    },
    setPublicRoomId: (state, payload) => {
      state.publicRoomId = payload.payload;
    },
  },
});

export default talkRoomSlice;
export const { setPrivateRoomId, setPublicRoomId, setPartyRoomId } =
  talkRoomSlice.actions;
