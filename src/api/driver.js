import { POST, GET, PUT, DELETE } from "../utils/axios";

export const getRegionDriver = async (region) =>
  await GET(`/driver/list?region=${region}`, true);

export const getDriverInfo = async (driverId) =>
  await GET(`/driver/${driverId}`, true);

export const postComment = async (data, driverId) =>
  await POST(`/driver/review/${driverId}`, data, true);

export const putComment = async (data, reviewId) =>
  await PUT(`/driver/review/${reviewId}`, data, true);

export const deleteComment = async (reviewId) =>
  await DELETE(`/driver/review/${reviewId}`, true);

export const applyDriver = async (data) =>
  await POST(`/driver/apply`, data, true);
