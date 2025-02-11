import { useState, useEffect, useContext } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 import { useAuth } from "../../auth/authContext";
import "../../index.css";


const HOST = "http://localhost:8081/";

export default function MealLibrary() {
  const navigate = useNavigate();
  const { user, token } = useAuth(); 

  const [meals, setMeals] = useState([]);
  const [meal, setMeal] = useState({
    foodName: "",
    calories: "",
    proteins: "",
    carbs: "",
    foodType: "custom_food",
    quantityUnit: "count",
    imageUrl: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingFoodId, setEditingFoodId] = useState(null);

  useEffect(() => {
    if (user?.userId) {
      fetchMeals();
    }
  }, [user?.userId]);

  const fetchMeals = async () => {
    try {
      const response = await axios.get(`${HOST}user/${user.userId}/foods`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedMeals = response.data.map((meal) => ({
        ...meal,
        imageUrl: meal.imageUrl
          ? meal.imageUrl.startsWith("http")
            ? meal.imageUrl
            : `${HOST}${meal.imageUrl.replace(/^\/+/g, "")}`
          : "/MealMate.png",
      }));

      setMeals(updatedMeals);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  const handleInputChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMeal((prevMeal) => ({
        ...prevMeal,
        imageUrl: URL.createObjectURL(file),
      }));
    }
  };

  const handleAddMeal = async () => {
    if (meal.foodName && meal.calories && meal.proteins && meal.carbs) {
      try {
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

        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput && fileInput.files[0]) {
          formData.append("file", fileInput.files[0]);
        }

        const response = await axios.post(
          `${HOST}user/${user.userId}/foods`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setMeals((prevMeals) => [
          ...prevMeals,
          {
            ...response.data,
            imageUrl: response.data.imageUrl
              ? `${HOST}uploads/${response.data.imageUrl}`
              : "/MealMate.png",
          },
        ]);

        setMeal({
          foodName: "",
          calories: "",
          proteins: "",
          carbs: "",
          foodType: "custom_food",
          quantityUnit: "count",
          imageUrl: "",
        });

        
      } catch (error) {
        console.error("Error adding meal:", error.response?.data || error);
      }
    } else {
      console.warn("All fields are required to add a meal.");
    }
  };

  const handleEditMeal = (meal) => {
    setMeal({
      foodName: meal.foodName,
      calories: meal.calories,
      proteins: meal.proteins,
      carbs: meal.carbs,
      quantityUnit: meal.quantityUnit,
      foodType: meal.foodType,
      imageUrl: meal.imageUrl,
    });
    setEditingFoodId(meal.foodId);
    setIsEditing(true);
  };

  const handleUpdateMeal = async () => {
    if (editingFoodId) {
      try {
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
          `${HOST}user/${user.userId}/foods/${editingFoodId}`,
          updatedMeal,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setMeals((prevMeals) =>
          prevMeals.map((item) =>
            item.foodId === editingFoodId ? { ...item, ...response.data } : item
          )
        );

        setMeal({
          foodName: "",
          calories: "",
          proteins: "",
          carbs: "",
          foodType: "custom_food",
          quantityUnit: "count",
          imageUrl: "",
        });

        setIsEditing(false);
        setEditingFoodId(null);

        
      } catch (error) {
        console.error("Error updating meal:", error);
      }
    }
  };

  const handleDeleteMeal = async (foodId) => {
    try {
      await axios.delete(`${HOST}user/${user.userId}/foods/${foodId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMeals((prevMeals) =>
        prevMeals.filter((item) => item.foodId !== foodId)
      );
    } catch (error) {
      console.error("Error deleting meal:", error);
    }
  };

  return (
    <div className="mt-32 px-4 md:px-10">
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-xl sticky top-20 z-10 h-auto max-w-3xl mx-auto"
        style={{ backgroundColor: "#1F5756" }}
      >
        <div className="flex flex-col h-full">
          <h2 className="text-xl font-bold mb-3 text-white">Meal Details</h2>
          <input
            type="text"
            name="foodName"
            placeholder="Meal Name"
            value={meal.foodName}
            onChange={handleInputChange}
            className="w-full p-1.5 mb-2 border rounded-lg text-sm placeholder-gray-500"
          />
          <input
            type="number"
            name="calories"
            placeholder="Calories"
            value={meal.calories}
            onChange={handleInputChange}
            className="w-full p-1.5 mb-2 border rounded-lg text-sm placeholder-gray-500"
          />
          <input
            type="number"
            name="proteins"
            placeholder="Proteins (g)"
            value={meal.proteins}
            onChange={handleInputChange}
            className="w-full p-1.5 mb-2 border rounded-lg text-sm placeholder-gray-500"
          />
          <input
            type="number"
            name="carbs"
            placeholder="Carbs (g)"
            value={meal.carbs}
            onChange={handleInputChange}
            className="w-full p-1.5 mb-2 border rounded-lg text-sm placeholder-gray-500"
          />
          <input
            type="text"
            name="quantityUnit"
            placeholder="Quantity Unit (e.g., count, cup, grams)"
            value={meal.quantityUnit}
            onChange={handleInputChange}
            className="w-full p-1.5 mb-2 border rounded-lg text-sm placeholder-gray-500"
          />
          <input
            type="text"
            name="foodType"
            placeholder="Food Type (e.g., custom_food, universal_food)"
            value={meal.foodType}
            onChange={handleInputChange}
            className="w-full p-1.5 mb-4 border rounded-lg text-sm placeholder-gray-500"
          />

          <button
            onClick={isEditing ? handleUpdateMeal : handleAddMeal}
            className={`w-full ${
              isEditing ? "bg-yellow-500" : "bg-green-400"
            } text-white font-semibold py-2 rounded-lg hover:bg-opacity-80 transition`}
          >
            {isEditing ? "Update Meal" : "Add Meal"}
          </button>
        </div>

        <div className="flex flex-col items-center justify-center">
          <label className="w-full h-60 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center cursor-pointer">
            {meal.imageUrl ? (
              <img
                src={meal.imageUrl}
                alt="Meal"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <span className="text-gray-400">Click to Add Photo</span>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      <div className="mt-8 px-2 h-[60vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-xl">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Your Meals</h2>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {meals.map((item) => (
            <div
              key={`${item.foodId}-${item.imageUrl}`}
              className="p-4 rounded-xl shadow-md"
              style={{ backgroundColor: "#1F5756" }}
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.foodName}
                  className="w-full h-32 object-cover rounded-xl"
                />
              )}

              <h3 className="font-semibold text-lg text-white mt-2">
                {item.foodName}
              </h3>
              <p>Calories: {item.calories}</p>
              <p>Proteins: {item.proteins}g</p>
              <p>Carbs: {item.carbs}g</p>

              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleEditMeal(item)}
                  className="bg-green-500 text-white px-3 py-1 rounded-md text-sm"
                >
                  <PencilIcon className="h-4 w-4 inline" /> Edit
                </button>

                <button
                  onClick={() => handleDeleteMeal(item.foodId)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md text-sm"
                >
                  <TrashIcon className="h-4 w-4 inline" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
