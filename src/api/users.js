import { POST } from "../utils/axios";

export const signup = async (data) => await POST("/signup", data);
export const login = async (data) => await POST("/login", data);
