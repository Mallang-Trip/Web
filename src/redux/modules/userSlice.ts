import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, login, refresh } from "../../api/users";
import { deleteFirebaseToken } from "../../api/notification";

interface State {
  auth: boolean;
  userId: number;
  loginId: string;
  email: string;
  name: string;
  birthday: string;
  country: string;
  gender: string;
  nickname: string;
  phoneNumber: string;
  role: string;
  introduction: string;
  profileImg: string;
  customerKey: string;
  isAdmin: boolean;
  deleted: boolean;
}

const initialState: State = {
  auth: false,
  userId: 0,
  loginId: "",
  email: "",
  name: "",
  birthday: "",
  country: "",
  gender: "",
  nickname: "",
  phoneNumber: "",
  role: "",
  introduction: "",
  profileImg: "",
  customerKey: "",
  isAdmin: false,
  deleted: false,
};

const __asyncLogin = createAsyncThunk(
  "userSlice/asyncLogin",
  async (payload: { id: string; password: string }) => {
    try {
      const result = await login(payload);

      localStorage.setItem("accessToken", result.payload.accessToken);
      localStorage.setItem("refreshToken", result.payload.refreshToken);
      return true;
    } catch {
      return false;
    }
  }
);

const __asyncAuth = createAsyncThunk("userSlice/asyncAuth", async () => {
  try {
    const auth_result = await auth();
    return { ...auth_result.payload, auth: true };
  } catch {
    try {
      const refresh_result = await refresh();
      localStorage.setItem("accessToken", refresh_result.payload.accessToken);
      localStorage.setItem("refreshToken", refresh_result.payload.refreshToken);

      const auth_result = await auth();
      return { ...auth_result.payload, auth: true };
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return { auth: false };
    }
  }
});

const __asyncRefreshAuth = createAsyncThunk("userSlice/asyncAuth", async () => {
  try {
    const refresh_result = await refresh();
    localStorage.setItem("accessToken", refresh_result.payload.accessToken);
    localStorage.setItem("refreshToken", refresh_result.payload.refreshToken);

    const auth_result = await auth();
    return { ...auth_result.payload, auth: true };
  } catch {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    return { auth: false };
  }
});

const __deleteFirebaseToken = async () => {
  try {
    await deleteFirebaseToken({
      firebaseToken: localStorage.getItem("fcmToken"),
    });
    localStorage.removeItem("fcmToken");
  } catch (e) {
    console.log(e);
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      __deleteFirebaseToken();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.auth = false;
      state.userId = 0;
      state.loginId = "";
      state.email = "";
      state.name = "";
      state.birthday = "";
      state.country = "";
      state.gender = "";
      state.nickname = "";
      state.phoneNumber = "";
      state.role = "";
      state.introduction = "";
      state.profileImg = "";
      state.customerKey = "";
      state.isAdmin = false;
      state.deleted = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__asyncAuth.fulfilled, (state, payload) => {
      state.auth = payload.payload.auth;
      state.userId = payload.payload.userId;
      state.loginId = payload.payload.loginId;
      state.email = payload.payload.email;
      state.name = payload.payload.name;
      state.birthday = payload.payload.birthday;
      state.country = payload.payload.country;
      state.gender = payload.payload.gender;
      state.nickname = payload.payload.nickname;
      state.phoneNumber = payload.payload.phoneNumber;
      state.role = payload.payload.role;
      state.introduction = payload.payload.introduction;
      state.profileImg = payload.payload.profileImg;
      state.customerKey = payload.payload.customerKey;
      state.isAdmin = payload.payload.role === "ROLE_ADMIN";
      state.deleted = payload.payload.deleted;
    });
  },
});

export default userSlice;
export const { logout } = userSlice.actions;
export { __asyncLogin, __asyncAuth, __asyncRefreshAuth };
