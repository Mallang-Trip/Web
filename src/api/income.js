import { GET } from "../utils/axios";

export const getDriverMonthlyIncome = async (month) =>
  await GET(`/income/monthly?month=${month}`, true);
