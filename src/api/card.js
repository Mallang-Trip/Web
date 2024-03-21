import { GET, POST, DELETE } from "../utils/axios";

export const getCard = async () => await GET("/card", true);

export const postCard = async (body) => await POST("/card", body, true);

export const deleteCard = async () => await DELETE("/card", true);
