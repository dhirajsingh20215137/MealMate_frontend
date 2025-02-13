import axios from 'axios';

const HOST = "http://localhost:8081/";

export const fetchUserFoods = async (userId, token) => {
  const response = await axios.get(`${HOST}user/${userId}/foods`, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const fetchMealPlans = async (userId, token) => {
  const response = await axios.get(`${HOST}user/${userId}/meal-planner`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const addMeal = async (userId, token, mealData) => {
  const response = await axios.post(`${HOST}user/${userId}/meal-planner/add-food`, mealData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const removeMeal = async (userId, token, mealPlannerId) => {
  await axios.delete(`${HOST}user/${userId}/meal-planner/food/${mealPlannerId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
