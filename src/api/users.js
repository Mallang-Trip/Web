import { POST } from "../utils/axios";

export const signup = async (data) => await POST("/signup", data);
