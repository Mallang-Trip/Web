import { GET, PUT, DELETE } from "@/utils/axios";

export const getNotification = async () => await GET("/notification", true);

export const putNotification = async (notificationId: number) =>
  await PUT(`/notification/${notificationId}`, {}, true);

export const deleteNotification = async (notificationId: number) =>
  await DELETE(`/notification/${notificationId}`, true);

export const putAllNotification = async () =>
  await PUT("/notification/all", {}, true);

export const putFirebaseToken = async (body: any) =>
  await PUT("/firebase", body, true);

export const deleteFirebaseToken = async (body: any) =>
  await DELETE("/firebase", true, body);
