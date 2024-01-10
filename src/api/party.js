import { GET, POST } from "../utils/axios";

export const getPartyList = async (region, nowDate, num, price) =>
  await GET(
    `/party/search?region=${region}&headcount=${num}&startDate=${nowDate[0]}&endDate=${nowDate[1]}&maxPrice=${price}`
  );

export const getPartyDetail = async (partyId) => await GET(`/party/${partyId}`);

export const postPartyJoin = async (data) =>
  await POST("/party/join", data, true);

export const postNewParty = async (data) =>
  await POST("/party/start", data, true);

export const getPartyHistory = async () => await GET(`/party/history`, true);
