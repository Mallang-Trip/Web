import { GET } from "../utils/axios";

export const getAllMarkers = async () => await GET("/destination/map", true);
export const getSearchInfo = async (searchKeyword) =>
  await GET(`/destination?keyword=${searchKeyword}`, true);
