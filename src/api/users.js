import { GET, POST, PUT } from "../utils/axios";

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
