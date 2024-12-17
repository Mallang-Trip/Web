import { PUT } from "@/utils/axios";

export const putProfile = async (data: any) =>
  await PUT(`/profile`, data, true);

export const putPassword = async (data: any) =>
  await PUT(`/password`, data, true);
