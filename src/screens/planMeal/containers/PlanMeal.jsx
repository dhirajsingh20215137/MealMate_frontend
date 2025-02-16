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
    />
  );
};

export default PlanMealContainer;
