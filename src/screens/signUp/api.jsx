import { HOST } from "../../utils/Constant";

export const signup = async (userData) => {
  try {
    const response = await fetch(`${HOST}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Signup failed");
    }
    return data;
  } catch (error) {
    throw new Error(error.message || "Something went wrong during signup");
  }
};
