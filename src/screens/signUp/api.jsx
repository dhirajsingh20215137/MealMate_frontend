import { z } from "zod";
import { useState } from "react";

export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export const UseSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const signup = async (userData) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8081/auth/signup", {
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
      setError(error.message || "Something went wrong during signup");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};
