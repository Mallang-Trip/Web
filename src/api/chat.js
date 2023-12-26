import { DELETE, GET, POST } from "../utils/axios";

export const getChatList = async () => await GET("/chat/list", true);

export const getChatRoomData = async (chatRoomId) =>
  await GET(`/chat/${chatRoomId}`, true);

export const inviteMemberAPI = async (chatRoomId, userIds) =>
  await POST(`/chat/invite/${chatRoomId}?userId=${userIds}`, {}, true);

export const leaveChat = async (chatRoomId) =>
  await DELETE(`/chat/leave/${chatRoomId}`, true);

export const makeNewGroupChat = async (userIds, roomName) =>
  await GET(`/chat/groupChat?userId=${userIds}&roomName=${roomName}`, true);

export const makeNewCoupleChat = async (userId) =>
  await GET(`/chat/coupleChat?userId=${userId}`, true);
