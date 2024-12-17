import { GET, PUT, POST, DELETE } from "@/utils/axios";

export const getAnnouncementList = async (type: string, page: number) =>
  await GET(`/announcement?type=${type}&page=${page}&size=10`, true);

export const getAnnouncementDetail = async (announcementId: string) =>
  await GET(`/announcement/${announcementId}`, true);

export const postAnnouncement = async (body: any) =>
  await POST("/announcement", body, true);

export const updateAnnouncement = async (announcementId: string, body: any) =>
  await PUT(`/announcement/${announcementId}`, body, true);

export const deleteAnnouncement = async (announcementId: string) =>
  await DELETE(`/announcement/${announcementId}`, true);
