import { apiUrls } from "@/config/config";
import { axiosInstance } from "../actions/auth";

export const getDisponibility = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.getDisponibility());
    if (response.data.ok) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};