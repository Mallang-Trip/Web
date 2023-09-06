import axios from "axios";
import properties from "../config/properties";

export const uploadImage = async (image) => {
  try {
    const formData = new FormData();
    formData.append("chatImage", image);

    const config = {
      baseURL: properties.baseURL,
      withCredentials: true,
      headers: {
        "Contest-Type": "multipart/form-data",
      },
    };

    const { data } = axios.post("/upload/profile/image", formData, config);

    console.log(data);
    !!data.message && alert(data.message);
    return data;
  } catch (error) {
    console.log(error);
  }
};
