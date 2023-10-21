import { GET } from "../utils/axios";

export const getRegionDriver = async (region) =>
  await GET(`/driver/list?region=${region}`, true);

export const getDriverInfo = async (driverId) =>
  await GET(`/driver/${driverId}`, true);
