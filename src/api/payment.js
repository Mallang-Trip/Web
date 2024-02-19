import { GET, POST, DELETE } from "../utils/axios";

export const getPayment = async () => await GET("/payment", true);

export const postPayment = async (authKey) =>
  await POST(`/payment?authKey=${authKey}`, {}, true);

export const deletePayment = async () => await DELETE("/payment", true);
