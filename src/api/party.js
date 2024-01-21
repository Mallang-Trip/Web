import { DELETE, GET, POST, PUT } from "../utils/axios";

export const getPartyList = async (region, nowDate, num, price) =>
  await GET(
    `/party/search?region=${region}&headcount=${num}&startDate=${nowDate[0]}&endDate=${nowDate[1]}&maxPrice=${price}`
  );

export const getPartyDetail = async (partyId) =>
  await GET(`/party/${partyId}`, true);

export const postLikeParty = async (partyId) =>
  await POST(`/party/dibs/${partyId}`, {}, true);

export const deleteUnLikeParty = async (partyId) =>
  await DELETE(`/party/dibs/${partyId}`, true);

export const getLikeParty = async () => await GET("/party/dibs", true);

export const postPartyJoin = async (partyId, data) =>
  await POST(`/party/join/${partyId}`, data, true);

export const putMallangReady = async (partyId, ready) =>
  await PUT(`/party/ready/${partyId}?ready=${ready}`, {}, true);

export const putProposalAccept = async (proposalId, accept) =>
  await PUT(`/party/proposal/${proposalId}?accept=${accept}`, {}, true);

export const deleteProposalCancel = async (proposalId) =>
  await DELETE(`/party/proposal/${proposalId}`, true);

export const deleteQuitParty = async (partyId) =>
  await DELETE(`/party/quit/${partyId}`, true);

export const postNewParty = async (data) =>
  await POST("/party/create", data, true);

export const deleteNewParty = async (partyId) =>
  await DELETE(`/party/create/${partyId}`, true);

export const putNewPartyAccept = async (partyId, accept) =>
  await PUT(`/party/create/${partyId}?accept=${accept}`, {}, true);

export const getPartyHistory = async () => await GET("/party/history", true);

export const getMyParty = async () => await GET("/party/my", true);
