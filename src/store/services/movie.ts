import { apiUrls } from "@/config/config";
import { axiosInstance } from "../actions/auth";

export const getMovie = async (movieId: number) => {
  try {
    const response = await axiosInstance.get(apiUrls.getMovieById(movieId));
    if (response.data.ok) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};