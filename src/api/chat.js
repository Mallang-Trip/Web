import { DELETE, GET, POST, PUT } from "../utils/axios";

export const getChatList = async () => await GET("/chat/list", true);
