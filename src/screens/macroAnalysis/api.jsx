import axios from 'axios';

const API = axios.create({
  baseURL: "http://localhost:8081/",
});

export const getNutritionStats = (userId, type, token) => {
  return API.get(`user/${userId}/stats/${type}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
