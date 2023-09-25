import { GET, POST } from "../utils/axios";

export const signup = async (data) => await POST("/signup", data);
export const login = async (data) => await POST("/login", data);
export const auth = async () => await GET("/auth", true);
export const refresh = async () => await GET("/refresh-token", true);
export const checkDuplication = async (type, value) =>
  await GET(`/check-duplication?type=${type}&value=${value}`);
