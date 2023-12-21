import { DELETE, GET, POST, PUT } from "../utils/axios";

export const getChatList = async () => await GET("/chat/list", true);

export const getChatRoomData = async (chatRoomId) =>
  await GET(`/chat/${chatRoomId}`, true);
