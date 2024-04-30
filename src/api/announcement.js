import { GET, PUT, POST, DELETE } from "../utils/axios";

export const getAnnouncementList = async (type, page) =>
  await GET(`/announcement?type=${type}&page=${page}&size=10`, true);

export const getAnnouncementDetail = async (announcementId) =>
  await GET(`/announcement/${announcementId}`, true);

export const postAnnouncement = async (body) =>
  await POST("/announcement", body, true);

export const updateAnnouncement = async (announcementId, body) =>
  await PUT(`/announcement/${announcementId}`, body, true);
