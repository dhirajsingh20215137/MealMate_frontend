import React, { useEffect, useState } from "react";
import { useAuth } from "../../../auth";
import { fetchMealPlans, addMeal, removeMeal, fetchUserFoods } from "../api";
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


  const fetchMeals = async () => {
    try {
      const response = await fetchMealPlans(userId, token);
      setMealPlans(response || []);
    } catch (error) {
      setMealPlans([]);
    }
  };

 
  const fetchFoods = async () => {
    try {
      const response = await fetchUserFoods(userId, token);
      setUserFoods(response || []);
    } catch (error) {
      setUserFoods([]);
    }
  };

  useEffect(() => {
    if (userId && token) {
      fetchMeals();
      fetchFoods();
    }
  }, [userId, token]);


  const handleAddMeal = async () => {
    if (!selectedFoodId || !quantity) {
      return;
    }

    const mealData = {
      foodId: selectedFoodId,
      quantityValue: quantity,
      mealType: mealType.toUpperCase(),
    };

    try {
      const newMeal = await addMeal(userId, token, mealData);
      setMealPlans((prev) => [...prev, newMeal]);
      setSelectedFoodId("");
      setQuantity("");
    } catch (error) {
    }
  };

  
  const handleRemoveMeal = async (mealPlannerId) => {
    try {
      await removeMeal(userId, token, mealPlannerId);
      setMealPlans((prev) =>
        prev.filter((meal) => meal.mealPlannerId !== mealPlannerId)
      );
    } catch (error) {
    }
  };


  const filteredMeals = mealPlans.filter(
    (meal) => meal.mealType.toLowerCase() === mealType.toLowerCase()
  );

  const totalNutrition = filteredMeals.reduce(
    (totals, meal) => {
      totals.totalFats += (meal.fats || 0) * meal.quantityValue;
      totals.totalProteins += (meal.proteins || 0) * meal.quantityValue;
      totals.totalCarbs += (meal.carbs || 0) * meal.quantityValue;
      return totals;
    },
    { totalFats: 0, totalProteins: 0, totalCarbs: 0 }
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
      filteredMeals={filteredMeals}
      totalNutrition={totalNutrition}
    />
  );
};

export default PlanMealContainer;
