import { useState, useEffect } from "react";
import { useAuth } from "../../../auth/index";
import { fetchMeals, addMeal, updateMeal, deleteMeal } from "../api";
import MealForm from "../components/MealForm";
import MealCard from "../components/MealCard";
import { Grid, Box, Typography, Paper, Snackbar, Alert } from "@mui/material";
import "../../../index.css";

export default function MealLibraryContainer() {
  const { user, token } = useAuth();
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState("");
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    severity: "",
  });

  const isAdmin = user?.userType === "ADMIN";

  const [meal, setMeal] = useState({
    foodName: "",
    calories: "",
    proteins: "",
    carbs: "",
    quantityUnit: "",
    foodType: isAdmin ? "UNIVERSAL_FOOD" : "CUSTOM_FOOD",
    imageUrl: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingFoodId, setEditingFoodId] = useState(null);

  // useEffect(() => {
   
  // }, [meals]);

  useEffect(() => {
    fetchMealsData();
  }, []);

  const fetchMealsData = async () => {
    try {
      const data = await fetchMeals(user.userId, token);
      setMeals(data);
    } catch {
      setError("Failed to fetch meals.");
    }

  
  };

  const handleChange = (e) => {
    setMeal((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file)
      setMeal((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
  };

  const handleSubmit = async () => {
    setAlertMessage({ message: "", severity: "" });

    try {
      const fileInput = document.querySelector('input[type="file"]');
      const file = fileInput?.files[0] || null;

      if (isEditing) {
        await updateMeal(user.userId, token, editingFoodId, meal);
        setAlertMessage({
          message: "Meal updated successfully!",
          severity: "success",
        });
      } else {
        await addMeal(user.userId, token, meal, file);
        setAlertMessage({
          message: "Meal added successfully!",
          severity: "success",
        });
      }

      fetchMealsData();
    } catch {
      setAlertMessage({ message: "Something went wrong.", severity: "error" });
    }

    setMeal({
      foodName: "",
      calories: "",
      proteins: "",
      carbs: "",
      quantityUnit: "",
      foodType: isAdmin ? "UNIVERSAL_FOOD" : "CUSTOM_FOOD",
      imageUrl: "",
    });

    setIsEditing(false);
    setEditingFoodId(null);
  };

  const handleEdit = (selectedMeal) => {
    if (
      (isAdmin && selectedMeal.foodType === "CUSTOM_FOOD") ||
      (!isAdmin && selectedMeal.foodType === "UNIVERSAL_FOOD")
    ) {
      setAlertMessage({
        message: "You cannot edit this meal type.",
        severity: "error",
      });
      return;
    }
    setMeal(selectedMeal);
    setIsEditing(true);
    setEditingFoodId(selectedMeal.foodId);
  };

  const handleDelete = async (foodId, foodType) => {
    if (
      (isAdmin && foodType === "CUSTOM_FOOD") ||
      (!isAdmin && foodType === "UNIVERSAL_FOOD")
    ) {
      setAlertMessage({
        message: "You cannot delete this meal type.",
        severity: "error",
      });
      return;
    }

    try {
      await deleteMeal(user.userId, token, foodId);
      setMeals((prev) => prev.filter((item) => item.foodId !== foodId));
      setAlertMessage({
        message: "Meal deleted successfully!",
        severity: "success",
      });
    } catch {
      setError("Failed to delete meal.");
    }
  };

  return (
    <Box sx={{ mt: 10, px: { xs: 2, md: 5 }, pb: 5 }}>
      <Snackbar
        open={!!error}
        autoHideDuration={500}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={() => setError("")}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
      <Snackbar
        open={!!alertMessage.message}
        autoHideDuration={500}
        onClose={() => setAlertMessage({ message: "", severity: "" })}
      >
        <Alert severity={alertMessage.severity} sx={{ width: "100%" }}>
          {alertMessage.message}
        </Alert>
      </Snackbar>

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Paper
            elevation={4}
            sx={{ padding: 3, borderRadius: 2, backgroundColor: "#6A9C89" }}
          >
            <MealForm
              meal={meal}
              setMeal={setMeal}
              isEditing={isEditing}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              user={user}
            />
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mt: 5, textAlign: "center" }}>
      <Typography
  variant="h5"
  fontWeight="bold"
  className="bg-[#6A9C89] text-white px-5 py-2 rounded-lg text-center inline-block cursor-pointer transition duration-300 hover:bg-[#0F312A]"
>
  Your Meals
</Typography>

      </Box>
      <Grid container spacing={2} sx={{ mt: 3 }}>
        {meals.map((item, index) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={3}
            lg={2}
            key={item.foodId ? `meal-${item.foodId}` : `index-${index}`}
          >
            <MealCard
              meal={item}
              onEdit={handleEdit}
              onDelete={() => handleDelete(item.foodId, item.foodType)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
