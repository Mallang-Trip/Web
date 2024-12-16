import { GET, POST, PUT, DELETE } from "../utils/axios";

export const signup = async (data: any) => await POST("/signup", data);

export const login = async (data: any) => await POST("/login", data);

export const auth = async () => await GET("/auth", true);

export const refresh = async () => await GET("/refresh-token", true);

export const checkDuplication = async (type: string, value: string) =>
  await GET(`/check-duplication?type=${type}&value=${value}`);

export const getCertificationCode = async (phoneNumber: string) =>
  await GET(`/certification?phoneNumber=${phoneNumber}`);

export const searchId = async (phoneNumber: string, code: string) =>
  await GET(`/certification/id?phoneNumber=${phoneNumber}&code=${code}`);

export const searchPassword = async (phoneNumber: string, code: string) =>
  await GET(`/certification/password?phoneNumber=${phoneNumber}&code=${code}`);

export const putNewPassword = async (data: any) =>
  await PUT(`/certification/password`, data);

export const searchUser = async (nickName: string) =>
  await GET(`/user/search?nickname=${nickName}`, true);

export const getUserInfo = async (userId: number) =>
  await GET(`/user/info/${userId}`);

export const deleteUser = async () => await DELETE("/user/withdrawal", true);

export const postNewReport = async (body: any) =>
  await POST("/report", body, true);
