import { GET, PUT } from "../utils/axios";

export const getNotification = async () => await GET("/notification", true);

export const putNotification = async (notificationId) =>
  await PUT(`/notification/${notificationId}`, {}, true);
