import axios from "axios";
import properties from "../config/properties";

export const uploadProfileImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const config = {
      baseURL: properties.baseURL,
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

export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("file", image);

    const config = {
      baseURL: properties.baseURL,
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
