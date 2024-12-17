import { DELETE, GET, POST } from "@/utils/axios";

export const getChatList = async () => await GET("/chat/list", true);

export const getChatRoomData = async (chatRoomId: number) =>
  await GET(`/chat/${chatRoomId}`, true);

export const inviteMemberAPI = async (chatRoomId: number, userIds: string) =>
  await POST(`/chat/invite/${chatRoomId}?userId=${userIds}`, {}, true);

export const leaveChat = async (chatRoomId: number) =>
  await DELETE(`/chat/leave/${chatRoomId}`, true);

export const makeNewGroupChat = async (userIds: string, roomName: string) =>
  await GET(`/chat/groupChat?userId=${userIds}&roomName=${roomName}`, true);

export const makeNewCoupleChat = async (userId: number) =>
  await GET(`/chat/coupleChat?userId=${userId}`, true);

export const getPartyChatId = async (partyId: number) =>
  await GET(`/chat/party/${partyId}`, true);

export const getChatBlockList = async () => await GET("/chat/block", true);

export const blockUser = async (userId: number) =>
  await POST(`/chat/block/${userId}`, {}, true);

export const nonBlockUser = async (userId: number) =>
  await DELETE(`/chat/block/${userId}`, true);

export const kickPartyChatUser = async (chatRoomId: number, userId: number) =>
  await DELETE(`/chat/party/${chatRoomId}?userId=${userId}`, true);
