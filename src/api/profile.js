import { PUT } from "../utils/axios";

export const putProfile = async (data) => await PUT(`/profile`, data, true);
