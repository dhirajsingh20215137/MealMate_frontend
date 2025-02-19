import axios from "axios";

const HOST = "http://localhost:8081/";

export const fetchMealPlans = async (userId, token) => {
  try {
    const response = await axios.get(`${HOST}user/${userId}/meal-planner/foods`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserFoods = async (userId, token) => {
  try {
    const response = await axios.get(`${HOST}user/${userId}/foods`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addMeal = async (userId, token, mealData) => {
  try {
    const response = await axios.post(
      `${HOST}user/${userId}/meal-planner/add-food`,
      mealData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeMeal = async (userId, token, mealPlannerId) => {
  try {
    await axios.delete(`${HOST}user/${userId}/meal-planner/food/${mealPlannerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    throw error;
  }
};
