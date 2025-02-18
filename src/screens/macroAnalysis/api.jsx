import axios from "axios";
import { HOST } from "../../utils/Constant";

export const getNutritionStats = (userId, type, token) =>
  axios.get(`${HOST}/user/${userId}/stats/${type}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
