import { GET, POST } from "../utils/axios";

export const getPartyList = async (region, nowDate, num, price) =>
  await GET(
    `/party/list?region=${region}&headcount=${num}&startDate=${nowDate[0]}&endDate=${nowDate[1]}&maxPrice=${price}`,
    true
  );

export const getPartyDetail = async (partyId) =>
  await GET(`/party/view/${partyId}`, true);

export const postPartyJoin = async (data) =>
  await POST("/party/join", data, true);