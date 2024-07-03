import { GET, POST, PUT, DELETE } from "../utils/axios";

export const getPartyRegionList = async () => await GET("/party/region");

export const postNewPartyRegion = async (body) =>
  await POST("/region", body, true);

export const putPartyRegion = async (partyRegionId, body) =>
  await PUT(`/region/${partyRegionId}`, body, true);

export const deletePartyRegion = async (partyRegionId) =>
  await DELETE(`/region/${partyRegionId}`, true);

export const getPartyRegionDriverList = async (partyRegionId) =>
  await GET(`/region/${partyRegionId}`, true);
