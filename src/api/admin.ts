import { GET, PUT, POST, DELETE } from "../utils/axios";

export const getPartyList = async (status: string) =>
  await GET(`/admin/party?status=${status}`, true);

export const getPartyDetail = async (partyId: string) =>
  await GET(`/admin/party/${partyId}`, true);

export const getPartyDriverReady = async (partyId: string, ready: boolean) =>
  await GET(`/admin/party/driver-ready/${partyId}?ready=${ready}`, true);

export const getUserListAdmin = async () => await GET("/admin/user/list", true);

export const getMonthlyIncome = async () =>
  await GET(`/income/admin/monthly`, true);

export const getReportList = async () => await GET("/report", true);

export const getReportDetail = async (reportId: string) =>
  await GET(`/report/${reportId}`, true);

export const getReportCompleteList = async () =>
  await GET("/report/complete", true);

export const getReportCompleteDetail = async (reportId: string) =>
  await GET(`/report/complete/${reportId}`, true);

export const updateReportComplete = async (reportId: string) =>
  await PUT(`/report/${reportId}`, {}, true);

export const postSuspension = async (userId: number, body: any) =>
  await POST(`/suspension/${userId}`, body, true);

export const deleteSuspensionReport = async (reportId: number) =>
  await DELETE(`/suspension/report/${reportId}`, true);

export const getPaymentList = async (status: string) =>
  await GET(`/admin/payment?status=${status}`, true);

export const getIncomeList = async (month: string) =>
  await GET(`/income/admin/monthly?month=${month}`, true);

export const updateIncomeAmount = async (amount: string, incomeId: number) =>
  await PUT(`/income/admin/${incomeId}?amount=${amount}`, {}, true);

export const updateCommissionPercent = async (partyCommissionPercent: number) =>
  await PUT(
    `/income/admin/commission-rate?partyCommissionPercent=${partyCommissionPercent}&penaltyCommissionPercent=10`,
    {},
    true
  );

export const deleteIncome = async (incomeId: number) =>
  await DELETE(`/income/admin/${incomeId}`, true);

export const getChatDetail = async (chatRoomId: number) =>
  await GET(`/chat/messages/${chatRoomId}`, true);

export const driverPenaltyComplete = async (partyId: number) =>
  await PUT(`/admin/payment/driver-penalty/complete/${partyId}`, {}, true);

export const driverPenaltyBefore = async (partyId: number) =>
  await PUT(
    `/admin/payment/driver-penalty/before-payment/${partyId}`,
    {},
    true
  );

export const getDriverInfoDetail = async (driverId: string) =>
  await GET(`/admin/driver/my/${driverId}`, true);

export const putDriverInfoDetail = async (driverId: string, body: any) =>
  await PUT(`/admin/driver/my/${driverId}`, body, true);

export const getDriverCourseDetail = async (
  driverId: string,
  courseId: string
) => await GET(`/admin/driver/course/${driverId}?courseId=${courseId}`, true);

export const postDriverNewCourse = async (driverId: string, body: any) =>
  await POST(`/admin/driver/course/${driverId}`, body, true);

export const putDriverCourseDetail = async (
  driverId: string,
  courseId: string,
  body: any
) =>
  await PUT(
    `/admin/driver/course/${driverId}?courseId=${courseId}`,
    body,
    true
  );

export const deleteDriverCourse = async (driverId: string, courseId: string) =>
  await DELETE(`/admin/driver/course/${driverId}?courseId=${courseId}`, true);

export const postApplyDriver = async (userId: number, region: string[]) =>
  await POST(`/admin/driver/apply/${userId}?region=${region}`, {}, true);
