import { GET, PUT, DELETE } from "../utils/axios";

export const getNotification = async () => await GET("/notification", true);

export const putNotification = async (notificationId) =>
  await PUT(`/notification/${notificationId}`, {}, true);

export const deleteNotification = async (notificationId) =>
  await DELETE(`/notification/${notificationId}`, true);
