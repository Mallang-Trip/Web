import { GET, POST, PUT, DELETE } from "../utils/axios";

export const getAllMarkers = async () => await GET("/destination/map", true);

export const getSearchInfo = async (searchKeyword) =>
  await GET(`/destination?keyword=${searchKeyword}`, true);

export const getDestinationDetail = async (destinationId) =>
  await GET(`/destination/${destinationId}`, true);

export const postDestinationComment = async (data, destinationId) =>
  await POST(`/destination/review/${destinationId}`, data, true);

export const putDestinationComment = async (data, reviewId) =>
  await PUT(`/destination/review/${reviewId}`, data, true);

export const deleteDestinationComment = async (reviewId) =>
  await DELETE(`/destination/review/${reviewId}`, true);

export const postLikeDestination = async (destinationId) =>
  await POST(`/destination/dibs/${destinationId}`, {}, true);

export const deleteUnLikeDestination = async (destinationId) =>
  await DELETE(`/destination/dibs/${destinationId}`, true);

export const getLikeDestination = async () =>
  await GET(`/destination/dibs`, true);

export const postNewDestinationUser = async (body) =>
  await POST("/destination/by-user", body, true);

export const postNewDestinationAdmin = async (body) =>
  await POST("/destination", body, true);
