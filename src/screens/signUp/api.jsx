import { apiRequest } from "../../utils/Api";

export const signup = async (userData) => {
  return await apiRequest({
    url: "/auth/signup",
    method: "POST",
    data: userData,
  });
};
