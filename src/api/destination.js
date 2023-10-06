import { GET } from "../utils/axios";

export const getAllMarkers = async () => await GET("/destination/map", true);
