import { BASE_SERVER_URL } from "./env";
import axios from "axios";

interface Params {
  method: "get" | "post" | "put" | "delete";
  url: string;
  body?: any;
  auth: boolean;
}

const fetchWrap = async ({ method, url, body, auth }: Params) => {
  try {
    const config: any = {
      baseURL: BASE_SERVER_URL,
      withCredentials: true,
    };

    if (auth === true) {
      if (url === "/refresh-token")
        config.headers = {
          "REFRESH-TOKEN": `Bearer ${localStorage.getItem("refreshToken")}`,
        };
      else
        config.headers = {
          "ACCESS-TOKEN": `Bearer ${localStorage.getItem("accessToken")}`,
        };
    }

    const { data } =
      (method === "get" && (await axios.get(url, config))) ||
      (method === "post" && (await axios.post(url, body, config))) ||
      (method === "put" && (await axios.put(url, body, config))) ||
      (method === "delete" &&
        (await axios.delete(url, body ? { ...config, data: body } : config))) ||
      {};

    return data;
  } catch (error) {
    throw error;
  }
};

export const GET = (url: string, auth = false) =>
  fetchWrap({ method: "get", url, auth });

export const POST = (url: string, body: any, auth = false) =>
  fetchWrap({ method: "post", url, body, auth });

export const PUT = (url: string, body: any, auth = false) =>
  fetchWrap({ method: "put", url, body, auth });

export const DELETE = (url: string, auth = false, body?: any) =>
  fetchWrap({ method: "delete", url, body, auth });
