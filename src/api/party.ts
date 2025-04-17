import { DELETE, GET, POST, PUT } from "@/utils/axios";

export const getPartyList = async (
  region: string,
  nowDate: string[],
  num: number,
  price: string | number
) =>
  await GET(
    `/party/search?region=${region}&headcount=${num}&startDate=${nowDate[0]}&endDate=${nowDate[1]}&maxPrice=${price}`
  );

export const getCourseList = async (
  region: string,
  num: number,
  price: string | number
) =>
  await GET(`/course/list?region=${region}&headcount=${num}&maxPrice=${price}`);

export const getPartyDetail = async (partyId: string) =>
  await GET(`/party/${partyId}`, true);

export const postLikeParty = async (partyId: number) =>
  await POST(`/party/dibs/${partyId}`, {}, true);

export const deleteUnLikeParty = async (partyId: number) =>
  await DELETE(`/party/dibs/${partyId}`, true);

export const getLikeParty = async () => await GET("/party/dibs", true);

export const postPartyJoin = async (partyId: string, data: any) =>
  await POST(`/party/join/${partyId}`, data, true);

export const putMallangReady = async (partyId: string, ready: boolean) =>
  await PUT(`/party/ready/${partyId}?ready=${ready}`, {}, true);

export const putPartyCourse = async (partyId: string, body: any) =>
  await PUT(`/party/course/${partyId}`, body, true);

export const putProposalAccept = async (proposalId: number, accept: boolean) =>
  await PUT(`/party/proposal/${proposalId}?accept=${accept}`, {}, true);

export const deleteProposalCancel = async (proposalId: number) =>
  await DELETE(`/party/proposal/${proposalId}`, true);

export const deleteQuitParty = async (partyId: string) =>
  await DELETE(`/party/quit/${partyId}`, true);

export const deleteQuitReservationParty = async (partyId: string) =>
  await DELETE(`/party/reservation/${partyId}`, true);

export const postNewParty = async (data: any) =>
  await POST("/party/create", data, true);

export const deleteNewParty = async (partyId: string) =>
  await DELETE(`/party/create/${partyId}`, true);

export const putNewPartyAccept = async (partyId: string, accept: boolean) =>
  await PUT(`/party/create/${partyId}?accept=${accept}`, {}, true);

export const getPartyHistory = async () => await GET("/party/history", true);

export const getMyParty = async () => await GET("/party/my", true);

export const getMyDriverParty = async () => await GET("/party/driver", true);
