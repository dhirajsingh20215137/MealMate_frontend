import { apiRequest } from "../../utils/Api";

export const loginUser = async (credentials) => {
  return await apiRequest({
    url: "/auth/login",
    method: "POST",
    data: {
      email: credentials.email,
      password: credentials.password,
    },
  });
};
