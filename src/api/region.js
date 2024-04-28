import { GET, POST, PUT, DELETE } from "../utils/axios";

export const getPartyRegionList = async () => await GET("/party/region");

export const postNewPartyRegion = async (body) =>
  await POST("/party/region", body, true);

export const putPartyRegion = async (partyRegionId, body) =>
  await PUT(`/party/region/${partyRegionId}`, body, true);

export const deletePartyRegion = async (partyRegionId) =>
  await DELETE(`/party/region/${partyRegionId}`, true);

export const getPartyRegionDriverList = async (partyRegionId) =>
  await GET(`/party/region/${partyRegionId}`, true);
