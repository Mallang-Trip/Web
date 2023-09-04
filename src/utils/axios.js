import axios from "axios";
import properties from "@/config/properties";
// import { handleHttpError } from "./error";

const fetchWrap = async ({ method, url, body }) => {
  try {
    const config = {
      baseURL: properties.baseURL,
      withCredentials: true,
    };

    const { data } =
      (method === "get" && (await axios.get(url, config))) ||
      (method === "post" && (await axios.post(url, body, config))) ||
      (method === "patch" && (await axios.patch(url, body, config))) ||
      (method === "delete" && (await axios.delete(url, config))) ||
      {};

    console.log(data);
    !!data.message && alert(data.message);
    return data;
  } catch (error) {
    // handleHttpError(error);
    console.log(error);
  }
};

export const GET = (url) => fetchWrap({ method: "get", url });

export const POST = (url, body) => fetchWrap({ method: "post", url, body });

export const PATCH = (url, body) => fetchWrap({ method: "patch", url, body });

export const DELETE = (url) => fetchWrap({ method: "delete", url });
