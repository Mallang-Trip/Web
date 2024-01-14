import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  partyRoomId: 0,
  publicRoomId: null,
};

const talkRoomSlice = createSlice({
  name: "talkRoom",
  initialState,
  reducers: {
    setPartyRoomId: (state, payload) => {
      state.partyRoomId = payload.payload;
    },
    setPublicRoomId: (state, payload) => {
      state.publicRoomId = payload.payload;
    },
  },
});

export default talkRoomSlice;
export const { setPublicRoomId, setPartyRoomId } = talkRoomSlice.actions;
