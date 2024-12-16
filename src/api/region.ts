import { GET, POST, PUT, DELETE } from "../utils/axios";

export const getPartyRegionList = async () => await GET("/region");

export const postNewPartyRegion = async (body: any) =>
  await POST("/region", body, true);

export const putPartyRegion = async (regionId: number, body: any) =>
  await PUT(`/region/${regionId}`, body, true);

export const deletePartyRegion = async (regionId: number) =>
  await DELETE(`/region/${regionId}`, true);

export const getPartyRegionDriverList = async (regionId: string) =>
  await GET(`/region/driver/${regionId}`, true);
