import { GET } from "../utils/axios";

export const getPartyList = async (status) =>
  await GET(`/admin/party?status=${status}`, true);
