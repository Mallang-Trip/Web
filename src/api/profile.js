import { PUT } from "../utils/axios";

export const putProfile = async (data) => await PUT(`/profile`, data, true);

export const putPassword = async (data) => await PUT(`/password`, data, true);
