import { POST, GET } from "../utils/axios";

export const getRegionDriver = async (region) =>
  await GET(`/driver/list?region=${region}`, true);

export const getDriverInfo = async (driverId) =>
  await GET(`/driver/${driverId}`, true);

export const postComment = async (data, driverId) =>
  await POST(`/driver/review/${driverId}`, data, true);
