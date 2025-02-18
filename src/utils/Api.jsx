import axios from "axios";
import { HOST } from "../utils/Constant";


const axiosInstance = axios.create({
  baseURL: HOST,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, 
});


export const api = async ({ url, method = "GET", data = null, headers = {}, token }) => {
  try {
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
