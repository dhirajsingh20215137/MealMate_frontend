import axios from "axios";
const HOST = "http://localhost:8081/";

export const fetchMeals = async (userId, token) => {
  const response = await axios.get(`${HOST}user/${userId}/foods`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.map((meal) => ({
    ...meal,
    imageUrl: meal.imageUrl
      ? meal.imageUrl.startsWith("http")
        ? meal.imageUrl
        : `${HOST}${meal.imageUrl.replace(/^\/+/g, "")}`
      : "/MealMate.png",
  }));
};

export const addMeal = async (userId, token, meal, file) => {
  const formData = new FormData();
  const foodDTO = {
    foodName: meal.foodName,
    calories: parseFloat(meal.calories),
    proteins: parseFloat(meal.proteins),
    carbs: parseFloat(meal.carbs),
    quantityUnit: meal.quantityUnit.toUpperCase(),
    foodType: meal.foodType.toUpperCase(),
    imageUrl: meal.imageUrl ? meal.imageUrl.split("/").pop() : "",
  };
  formData.append("foodDTO", JSON.stringify(foodDTO));
  if (file) formData.append("file", file);

  const response = await axios.post(`${HOST}user/${userId}/foods`, formData, {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });
  return response.data;
};

export const updateMeal = async (userId, token, mealId, meal) => {
  const updatedMeal = {
    foodName: meal.foodName,
    calories: parseFloat(meal.calories),
    proteins: parseFloat(meal.proteins),
    carbs: parseFloat(meal.carbs),
    quantityUnit: meal.quantityUnit.toUpperCase(),
    foodType: meal.foodType.toUpperCase(),
    imageUrl: meal.imageUrl ? meal.imageUrl.split("/").pop() : "",
  };

  const response = await axios.post(
    `${HOST}user/${userId}/foods/${mealId}`,
    updatedMeal,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const deleteMeal = async (userId, token, mealId) => {
  await axios.delete(`${HOST}user/${userId}/foods/${mealId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
