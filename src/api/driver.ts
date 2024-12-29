import { POST, GET, PUT, DELETE } from "@/utils/axios";

export const getRegionDriver = async (
  region: string,
  member: number,
  date: string
) =>
  await GET(
    `/driver/search?region=${region}&headcount=${member}&startDate=${date}`,
    true
  );

export const getDriver = async () => await GET(`/driver/search`, true);

export const getDriverInfo = async (driverId: string | number) =>
  await GET(`/driver/${driverId}`, true);

export const postComment = async (data: any, driverId: number) =>
  await POST(`/driver/review/${driverId}`, data, true);

export const putComment = async (data: any, reviewId: number) =>
  await PUT(`/driver/review/${reviewId}`, data, true);

export const deleteComment = async (reviewId: number) =>
  await DELETE(`/driver/review/${reviewId}`, true);

export const getDriverMyInfo = async () => await GET("/driver/my", true);

export const putDriverMyInfo = async (data: any) =>
  await PUT("/driver/my", data, true);

export const getDriverApply = async () => await GET("/driver/apply", true);

export const postDriverApply = async (data: any) =>
  await POST("/driver/apply", data, true);

export const putDriverApply = async (data: any) =>
  await PUT("/driver/apply", data, true);

export const deleteDriverApply = async () =>
  await DELETE("/driver/apply", true);

export const getDriverApplyAdmin = async () =>
  await GET("/driver/accept", true);

export const putDriverApplyAcceptAdmin = async (
  driverId: string,
  accept: boolean
) => await PUT(`/driver/accept/${driverId}?accept=${accept}`, {}, true);
