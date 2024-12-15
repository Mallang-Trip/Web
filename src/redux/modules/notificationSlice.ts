import { createSlice } from "@reduxjs/toolkit";
import { Notify } from "../../types";

interface State {
  notification: Notify[];
  uncheckedCount: number;
}

const initialState: State = {
  notification: [],
  uncheckedCount: 0,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, payload) => {
      state.notification = payload.payload.contents;
      state.uncheckedCount = payload.payload.uncheckedCount;
    },
    setDeleteNotification: (state, payload) => {
      const newNotification = state.notification.filter(
        (item) => item.alarmId !== payload.payload
      );

      state.notification = newNotification;
      state.uncheckedCount = newNotification.reduce((count, item) => {
        if (!item.checked) {
          return count + 1;
        }
        return count;
      }, 0);
    },
  },
});

export default notificationSlice;
export const { setNotification, setDeleteNotification } =
  notificationSlice.actions;
