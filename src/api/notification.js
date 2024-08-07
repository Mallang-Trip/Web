import { GET, PUT, DELETE, POST } from "../utils/axios";

export const getNotification = async () => await GET("/notification", true);

export const putNotification = async (notificationId) =>
  await PUT(`/notification/${notificationId}`, {}, true);

export const deleteNotification = async (notificationId) =>
  await DELETE(`/notification/${notificationId}`, true);

export const putAllNotification = async () =>
  await PUT("/notification/all", {}, true);

export const putFirebaseToken = async (body) =>
  await PUT("/firebase", body, true);

export const deleteFirebaseToken = async (body) =>
  await DELETE("/firebase", true, body);
