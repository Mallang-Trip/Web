import { GET } from "@/utils/axios";

export const getDriverMonthlyIncome = async (month: string) =>
  await GET(`/income/monthly?month=${month}`, true);

export const getCommisionRate = async () =>
  await GET("/income/commission-rate", true);
