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

export const getDriverInfoDetail = async (driverId) =>
  await GET(`/admin/driver/my/${driverId}`, true);

export const putDriverInfoDetail = async (driverId, body) =>
  await PUT(`/admin/driver/my/${driverId}`, body, true);

export const getDriverCourseDetail = async (driverId, courseId) =>
  await GET(`/admin/driver/course/${driverId}?courseId=${courseId}`, true);

export const postDriverNewCourse = async (driverId, body) =>
  await POST(`/admin/driver/course/${driverId}`, body, true);

export const putDriverCourseDetail = async (driverId, courseId, body) =>
  await PUT(
    `/admin/driver/course/${driverId}?courseId=${courseId}`,
    body,
    true
  );

export const deleteDriverCourse = async (driverId, courseId) =>
  await DELETE(`/admin/driver/course/${driverId}?courseId=${courseId}`, true);

export const postApplyDriver = async (userId, region) =>
  await POST(`/admin/driver/apply/${userId}?region=${region}`, {}, true);
