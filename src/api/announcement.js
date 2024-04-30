import { GET, PUT, POST, DELETE } from "../utils/axios";

export const getAnnouncementList = async (type, page) =>
  await GET(`/announcement?type=${type}&page=${page}&size=10`, true);

export const postAnnouncement = async (body) =>
  await POST("/announcement", body, true);
