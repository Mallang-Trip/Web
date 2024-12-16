import { GET, POST, DELETE } from "../utils/axios";

export const getCard = async () => await GET("/card", true);

export const postCard = async (body: any) => await POST("/card", body, true);

export const deleteCard = async () => await DELETE("/card", true);

export const postPaymentAgain = async (reservationId: number) =>
  await POST(`/card/${reservationId}`, {}, true);

export const getMyPaymentList = async () => await GET("/payment/my", true);
