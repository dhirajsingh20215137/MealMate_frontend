import { useState, useEffect } from "react";
import { useAuth } from "../../../auth/index";
import { fetchMeals, addMeal, updateMeal, deleteMeal } from "../api";
import MealForm from "../components/MealForm";
import MealCard from "../components/MealCard";
import MealCarousel from "../components/MealCarousel"; // ✅ Import Carousel
import "../../../index.css";

export default function MealLibraryContainer() {
  const { user, token } = useAuth();
  const [meals, setMeals] = useState([]);
  const [meal, setMeal] = useState({ foodName: "", calories: "", proteins: "", carbs: "", foodType: "", quantityUnit: "", imageUrl: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingFoodId, setEditingFoodId] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // ✅ Toggle view: grid or carousel

  useEffect(() => {
    if (user?.userId) {
      fetchMeals(user.userId, token).then(setMeals);
    }
  }, [user?.userId]);

  const handleChange = (e) => setMeal({ ...meal, [e.target.name]: e.target.value });
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setMeal((prev) => ({ ...prev, imageUrl: URL.createObjectURL(file) }));
  };

  const handleSubmit = async () => {
    if (isEditing) {
      const updated = await updateMeal(user.userId, token, editingFoodId, meal);
      setMeals((prev) => prev.map((item) => (item.foodId === editingFoodId ? { ...item, ...updated } : item)));
      setIsEditing(false);
      setEditingFoodId(null);
    } else {
      const fileInput = document.querySelector('input[type="file"]');
      const file = fileInput?.files[0];
      const newMeal = await addMeal(user.userId, token, meal, file);
      setMeals((prev) => [...prev, newMeal]);
    }
    setMeal({ foodName: "", calories: "", proteins: "", carbs: "", foodType: "custom_food", quantityUnit: "count", imageUrl: "" });
  };

  const handleEdit = (meal) => {
    setMeal(meal);
    setIsEditing(true);
    setEditingFoodId(meal.foodId);
  };

  const handleDelete = async (foodId) => {
    await deleteMeal(user.userId, token, foodId);
    setMeals((prev) => prev.filter((item) => item.foodId !== foodId));
  };

  return (
    <div className="mt-20 px-4 md:px-10">
      {/* Meal Form */}
      <div className="grid grid-cols-1 gap-4 p-4 rounded-xl top-10 z-10 h-auto max-w-xl mx-auto" style={{ backgroundColor: "#6A9C89" }}>
        <MealForm meal={meal} isEditing={isEditing} handleChange={handleChange} handleImageChange={handleImageChange} handleSubmit={handleSubmit} />
      </div>

      {/* View Toggle Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={() => setViewMode(viewMode === "grid" ? "carousel" : "grid")}
          className="bg-[#16423C] text-white px-4 py-2 rounded-md shadow-md transition-transform hover:scale-105"
        >
          {viewMode === "grid" ? "Switch to Carousel View" : "Switch to Grid View"}
        </button>
      </div>

      {/* Meals Section */}
      <div className="mt-8 px-2 h-[60vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Meals</h2>

        {viewMode === "grid" ? (
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {meals.map((item) => (
              <MealCard key={item.foodId} meal={item} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <MealCarousel meals={meals} onEdit={handleEdit} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
