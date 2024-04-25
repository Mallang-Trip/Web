import { GET } from "../utils/axios";

export const getPartyList = async (status) =>
  await GET(`/admin/party?status=${status}`, true);

export const getPartyDetail = async (partyId) =>
  await GET(`/admin/party/${partyId}`, true);

export const getPartyDriverReady = async (partyId, ready) =>
  await GET(`/admin/party/driver-ready/${partyId}?ready=${ready}`, true);
