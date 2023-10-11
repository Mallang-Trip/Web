import { GET } from "../utils/axios";

export const getPartyList = async (region, nowDate, num, price) =>
  await GET(
    `/party/list?region=${region}&headcount=${num}&startDate=${nowDate[0]}&endDate=${nowDate[1]}&maxPrice=${price}`,
    true
  );
