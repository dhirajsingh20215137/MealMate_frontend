import axios from "axios";
import { HOST } from "./Constant";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: HOST,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});


export const apiRequest = async ({ url, method , data = null, headers = {} }) => {
  try {
    const token = Cookies.get("authToken");

    const response = await axiosInstance({
      url,
      method,
      data,
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
