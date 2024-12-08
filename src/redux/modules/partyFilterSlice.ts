import { createSlice } from "@reduxjs/toolkit";

interface State {
  region: string;
  nowDate: Date[];
  num: number;
  price: number | string;
}

const initialState: State = {
  region: "모든 지역",
  nowDate: [],
  num: 1,
  price: 310000,
};

const partyFilterSlice = createSlice({
  name: "partyFilter",
  initialState,
  reducers: {
    setRegion: (state, payload) => {
      state.region = payload.payload;
    },
    setNowDate: (state, payload) => {
      state.nowDate = payload.payload;
    },
    setNum: (state, payload) => {
      state.num = payload.payload;
    },
    setPrice: (state, payload) => {
      state.price = payload.payload;
    },
  },
});

export default partyFilterSlice;
export const { setRegion, setNowDate, setNum, setPrice } =
  partyFilterSlice.actions;
