import { GET, POST, PUT, DELETE } from "../utils/axios";

export const getAllMarkers = async () => await GET("/destination/map", true);

export const getSearchInfo = async (searchKeyword: string) =>
  await GET(`/destination?keyword=${searchKeyword}`, true);

export const getDestinationDetail = async (destinationId: number) =>
  await GET(`/destination/${destinationId}`, true);

export const postDestinationComment = async (
  data: any,
  destinationId: number
) => await POST(`/destination/review/${destinationId}`, data, true);

export const putDestinationComment = async (data: any, reviewId: number) =>
  await PUT(`/destination/review/${reviewId}`, data, true);

export const deleteDestinationComment = async (reviewId: number) =>
  await DELETE(`/destination/review/${reviewId}`, true);

export const postLikeDestination = async (destinationId: number) =>
  await POST(`/destination/dibs/${destinationId}`, {}, true);

export const deleteUnLikeDestination = async (destinationId: number) =>
  await DELETE(`/destination/dibs/${destinationId}`, true);

export const getLikeDestination = async () =>
  await GET(`/destination/dibs`, true);

export const postNewDestinationUser = async (body: any) =>
  await POST("/destination/by-user", body, true);

export const postNewDestinationAdmin = async (body: any) =>
  await POST("/destination", body, true);

export const putDestinationAdmin = async (data: any, destinationId: number) =>
  await PUT(`/destination/${destinationId}`, data, true);

export const deleteDestinationAdmin = async (destinationId: number) =>
  await DELETE(`/destination/${destinationId}`, true);
