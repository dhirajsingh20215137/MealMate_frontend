import React, { useEffect, useState } from "react";
import { useAuth } from "../../../auth";
import { fetchUserFoods, fetchMealPlans, addMeal, removeMeal } from "../api";
import PlanMealComponent from "../components/PlanMeal";

const mealTypes = ["breakfast", "lunch", "dinner", "snack"];

const PlanMealContainer = () => {
  const { user, token } = useAuth();
  const userId = user.userId;
  const [mealPlans, setMealPlans] = useState([]);
  const [mealType, setMealType] = useState("breakfast");
  const [selectedFoodId, setSelectedFoodId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [userFoods, setUserFoods] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setUserFoods(await fetchUserFoods(userId, token));
      setMealPlans(await fetchMealPlans(userId, token));
    };
    fetchData();
  }, [userId, token]);

  const handleAddMeal = async () => {
    const mealData = {
      foodId: selectedFoodId,
      quantityValue: quantity,
      mealType: mealType.toUpperCase(),
    };
    const newMeal = await addMeal(userId, token, mealData);
    setMealPlans((prev) => [...prev, newMeal]);
    setSelectedFoodId("");
    setQuantity("");
  };

  const handleRemoveMeal = async (mealPlannerId) => {
    await removeMeal(userId, token, mealPlannerId);
    setMealPlans((prev) =>
      prev.filter((meal) => meal.mealPlannerId !== mealPlannerId)
    );
  };

  // Filter meals based on selected mealType
  const filteredMeals = mealPlans.filter(
    (meal) => meal.mealType.toLowerCase() === mealType.toLowerCase()
  );

  // Calculate the total values for calories, proteins, and carbs
  const calculateTotal = (meal) => {
    const foodDetails = userFoods.find((food) => food.foodId === meal.foodId);
    const quantityValue = meal.quantityValue || 1;

    return {
      totalCalories: (foodDetails?.calories || 0) * quantityValue,
      totalProteins: (foodDetails?.proteins || 0) * quantityValue,
      totalCarbs: (foodDetails?.carbs || 0) * quantityValue,
    };
  };

  const totalNutrition = filteredMeals.reduce(
    (totals, meal) => {
      const { totalCalories, totalProteins, totalCarbs } = calculateTotal(meal);
      totals.totalCalories += totalCalories;
      totals.totalProteins += totalProteins;
      totals.totalCarbs += totalCarbs;
      return totals;
    },
    { totalCalories: 0, totalProteins: 0, totalCarbs: 0 }
  );

  return (
    <PlanMealComponent
      mealPlans={mealPlans}
      mealType={mealType}
      selectedFoodId={selectedFoodId}
      quantity={quantity}
      userFoods={userFoods}
      setMealType={setMealType}
      setSelectedFoodId={setSelectedFoodId}
      setQuantity={setQuantity}
      handleAddMeal={handleAddMeal}
      handleRemoveMeal={handleRemoveMeal}
      mealTypes={mealTypes}
      calculateTotal={calculateTotal}
      filteredMeals={filteredMeals}
      totalNutrition={totalNutrition}
    />
  );
};

export default PlanMealContainer;
