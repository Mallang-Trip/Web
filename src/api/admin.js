import { GET, PUT, POST, DELETE } from "../utils/axios";

export const getPartyList = async (status) =>
  await GET(`/admin/party?status=${status}`, true);

export const getPartyDetail = async (partyId) =>
  await GET(`/admin/party/${partyId}`, true);

export const getPartyDriverReady = async (partyId, ready) =>
  await GET(`/admin/party/driver-ready/${partyId}?ready=${ready}`, true);

export const getUserListAdmin = async () => await GET("/admin/user/list", true);

export const getMonthlyIncome = async () =>
  await GET(`/income/admin/monthly`, true);

export const getReportList = async () => await GET("/report", true);

export const getReportDetail = async (reportId) =>
  await GET(`/report/${reportId}`, true);

export const getReportCompleteList = async () =>
  await GET("/report/complete", true);

export const getReportCompleteDetail = async (reportId) =>
  await GET(`/report/complete/${reportId}`, true);

export const updateReportComplete = async (reportId) =>
  await PUT(`/report/${reportId}`, {}, true);

export const postSuspension = async (userId, body) =>
  await POST(`/suspension/${userId}`, body, true);

export const deleteSuspensionUser = async (userId) =>
  await DELETE(`/suspension/${userId}`, true);

export const deleteSuspensionReport = async (reportId) =>
  await DELETE(`/suspension/report/${reportId}`, true);

export const getPaymentList = async (status) =>
  await GET(`/admin/payment?status=${status}`, true);

export const getCommisionRate = async () =>
  await GET("income/admin/commission-rate", true);

export const getIncomeList = async (month) =>
  await GET(`/income/admin/monthly?month=${month}`, true);

export const updateIncomeAmount = async (amount, incomeId) =>
  await PUT(`/income/admin/${incomeId}?amount=${amount}`, {}, true);

export const updateCommissionPercent = async (partyCommissionPercent) =>
  await PUT(
    `/income/admin/commission-rate?partyCommissionPercent=${partyCommissionPercent}&penaltyCommissionPercent=10`,
    {},
    true
  );

export const deleteIncome = async (incomeId) =>
  await DELETE(`/income/admin/${incomeId}`, true);

export const getChatDetail = async (chatRoomId) =>
  await GET(`/chat/messages/${chatRoomId}`, true);

export const driverPenaltyComplete = async (partyId) =>
  await PUT(`/admin/payment/driver-penalty/complete/${partyId}`, {}, true);

export const driverPenaltyBefore = async (partyId) =>
  await PUT(
    `/admin/payment/driver-penalty/before-payment/${partyId}`,
    {},
    true
  );
