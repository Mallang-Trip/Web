import { GET } from "../utils/axios";

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

export const getPaymentList = async (status) =>
  await GET(`/admin/payment?status=${status}`, true);

export const getIncomeList = async (month) =>
  await GET(`/income/admin/monthly?month=${month}`, true);
