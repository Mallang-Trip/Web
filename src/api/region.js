import { GET, POST, PUT, DELETE } from "../utils/axios";

export const getPartyRegionList = async () => await GET("/region");

export const postNewPartyRegion = async (body) =>
  await POST("/region", body, true);

export const putPartyRegion = async (regionId, body) =>
  await PUT(`/region/${regionId}`, body, true);

export const deletePartyRegion = async (regionId) =>
  await DELETE(`/region/${regionId}`, true);

export const getPartyRegionDriverList = async (regionId) =>
  await GET(`/region/driver/${regionId}`, true);
