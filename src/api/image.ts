import { BASE_SERVER_URL } from "../utils/env";
import axios from "axios";

export const uploadProfileImage = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const config = {
      baseURL: BASE_SERVER_URL,
      withCredentials: true,
      headers: {
        "Contest-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post("/upload/signup", formData, config);
    return data;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (image: File) => {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const config = {
      baseURL: BASE_SERVER_URL,
      withCredentials: true,
      headers: {
        "Contest-Type": "multipart/form-data",
        "ACCESS-TOKEN": `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };

    const { data } = await axios.post("/upload/profile", formData, config);
    return data;
  } catch (error) {
    throw error;
  }
};
