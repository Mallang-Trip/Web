import { POST, GET, PUT, DELETE } from "../utils/axios";

export const getRegionDriver = async (region, member, date) =>
  await GET(
    `/driver/search?region=${region}&headcount=${member}&startDate=${date}`,
    true
  );

export const getDriverInfo = async (driverId) =>
  await GET(`/driver/${driverId}`, true);

export const postComment = async (data, driverId) =>
  await POST(`/driver/review/${driverId}`, data, true);

export const putComment = async (data, reviewId) =>
  await PUT(`/driver/review/${reviewId}`, data, true);

export const deleteComment = async (reviewId) =>
  await DELETE(`/driver/review/${reviewId}`, true);

export const getDriverMyInfo = async () => await GET("/driver/my", true);

export const putDriverMyInfo = async (data) =>
  await PUT("/driver/my", data, true);

export const getDriverApply = async () => await GET("/driver/apply", true);

export const postDriverApply = async (data) =>
  await POST("/driver/apply", data, true);

export const putDriverApply = async (data) =>
  await PUT("/driver/apply", data, true);

export const deleteDriverApply = async () =>
  await DELETE("/driver/apply", true);
