import { GET, POST, PUT, DELETE } from "../utils/axios";

export const signup = async (data) => await POST("/signup", data);

export const login = async (data) => await POST("/login", data);

export const auth = async () => await GET("/auth", true);

export const refresh = async () => await GET("/refresh-token", true);

export const checkDuplication = async (type, value) =>
  await GET(`/check-duplication?type=${type}&value=${value}`);

export const getCertificationCode = async (phoneNumber) =>
  await GET(`/certification?phoneNumber=${phoneNumber}`);

export const searchId = async (phoneNumber, code) =>
  await GET(`/certification/id?phoneNumber=${phoneNumber}&code=${code}`);

export const searchPassword = async (phoneNumber, code) =>
  await GET(`/certification/password?phoneNumber=${phoneNumber}&code=${code}`);

export const putNewPassword = async (data) =>
  await PUT(`/certification/password`, data);

export const searchUser = async (nickName) =>
  await GET(`/user/search?nickname=${nickName}`, true);

export const getUserInfo = async (userId) => await GET(`/user/info/${userId}`);

export const postIdentification = async (data) =>
  await POST("/identification", data);

export const postIdentificationConfirm = async (impUid, otp) =>
  await POST(`/identification/confirm?impUid=${impUid}&otp=${otp}`, {});

export const deleteUser = async () => await DELETE("/user/withdrawal", true);

export const postNewReport = async (body) => await POST("/report", body, true);
