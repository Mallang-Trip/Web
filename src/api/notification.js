import { GET, PUT, DELETE, POST } from "../utils/axios";

export const getNotification = async () => await GET("/notification", true);

export const putNotification = async (notificationId) =>
  await PUT(`/notification/${notificationId}`, {}, true);

export const deleteNotification = async (notificationId) =>
  await DELETE(`/notification/${notificationId}`, true);

export const postFirebaseToken = async (body) =>
  await POST("/firebase", body, true);

export const deleteFirebaseToken = async () => await DELETE("/firebase", true);
