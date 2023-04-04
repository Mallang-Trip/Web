import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  value: 0,
  status: "",
};

const __async = createAsyncThunk("counterSlice/async", async (payload) => {
  const result = await axios.get("/" + payload);
  return result.data.value;
});

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__async.pending, (state, action) => {
      state.status = "Loading";
    });
    builder.addCase(__async.fulfilled, (state, action) => {
      state.value = action.payload;
      state.status = "complete";
    });
    builder.addCase(__async.rejected, (state, action) => {
      state.status = "fail";
    });
  },
});

export default counterSlice;
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export { __async };
