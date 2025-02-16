import axios from "axios";

export const getNutritionStats = (userId, type, token) =>
  axios.get(`http://localhost:8081/user/${userId}/stats/${type}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
