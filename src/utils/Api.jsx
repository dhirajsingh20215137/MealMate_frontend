import axios from "axios";

export const api = ({ url, method, body, headers }) => {
  const config = {
    url: url,
    method: method,
    headers: { ...headers, withCredentials: true }, 
  };


  if (method === "GET") {
    config.headers.Authorization = `Bearer ${headers.token}`;
  } else {

    config.headers["Content-Type"] = "application/json";
  }


  if (body && method !== "GET") {
    config.data = body;
  }


  return axios(config);
};
