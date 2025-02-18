import axios from "axios";

const HOST = "http://localhost:8081/";

// Fetch Meal Plans
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
    console.error("Error fetching meals:", error);
    throw error;
  }
};

// Fetch User Foods
export const fetchUserFoods = async (userId, token) => {
  try {
    const response = await axios.get(`${HOST}user/${userId}/foods`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user foods:", error);
    throw error;
  }
};

// Add Meal
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
    console.error("Error adding meal:", error);
    throw error;
  }
};

// Remove Meal
export const removeMeal = async (userId, token, mealPlannerId) => {
  try {
    await axios.delete(`${HOST}user/${userId}/meal-planner/food/${mealPlannerId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error removing meal:", error);
    throw error;
  }
};
