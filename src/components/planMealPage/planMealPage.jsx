import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../auth/authContext';
import { 
  Select, 
  MenuItem, 
  TextField, 
  Button, 
  IconButton, 
  InputLabel, 
  FormControl 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const HOST = "http://localhost:8081/";

const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

const PlanMealPage = () => {
  const { user, token } = useAuth();
  const userId = user.userId;
  const [mealPlans, setMealPlans] = useState([]);
  const [mealType, setMealType] = useState('breakfast');
  const [selectedFoodId, setSelectedFoodId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [userFoods, setUserFoods] = useState([]);

 
  useEffect(() => {
    const fetchUserFoods = async () => {
      try {
        const response = await axios.get(`${HOST}user/${userId}/foods`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        console.log('User foods:', response.data);
        setUserFoods(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching user foods:", error);
      }
    };

    fetchUserFoods();
  }, [userId, token]);

  // Fetch meal plans
  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        const response = await axios.get(`${HOST}user/${userId}/meal-planner`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Meal plans:', response.data);
        setMealPlans(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching meal plans:', error);
        setMealPlans([]);
      }
    };

    if (user?.userId && token) {
      fetchMealPlans();
    }
  }, [user, token]);

  
  const addMeal = async () => {
    if (!selectedFoodId || !quantity) {
      alert('Please select a food and enter a quantity.');
      return;
    }
  
    try {
      const response = await axios.post(
        `${HOST}user/${userId}/meal-planner/add-food`,
        {
          foodId: selectedFoodId,
          quantityValue: quantity,
          mealType: mealType.toUpperCase(),  
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      const foodDetails = userFoods.find((food) => food.foodId === Number(selectedFoodId));
  
      const newMeal = {
        ...response.data,
        foodName: foodDetails?.foodName || 'Unknown Food',
        calories: foodDetails?.calories || 0,
        proteins: foodDetails?.proteins || 0,
        carbs: foodDetails?.carbs || 0,
        mealType: response.data.mealType.toLowerCase(),  
      };
  
      setMealPlans((prevPlans) => [...prevPlans, newMeal]);
  
      setSelectedFoodId('');
      setQuantity('');
  
      console.log('Meal added:', newMeal);
    } catch (error) {
      console.error('Error adding food to meal plan:', error);
    }
  };
  

 
  const removeMeal = async (mealPlannerId) => {
    try {
      await axios.delete(`${HOST}user/${userId}/meal-planner/food/${mealPlannerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMealPlans((prevPlans) =>
        prevPlans.filter((meal) => meal.mealPlannerId !== mealPlannerId)
      );
    } catch (error) {
      console.error('Error removing food from meal plan:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Plan Your Meal</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <FormControl fullWidth>
          {/* <InputLabel>Meal Type</InputLabel> */}
          <Select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            {mealTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
  <InputLabel>Select Food</InputLabel>
  <Select
    value={selectedFoodId}
    onChange={(e) => setSelectedFoodId(e.target.value)}
  >
    {userFoods.map((food) => (
      <MenuItem key={food.foodId} value={food.foodId}>
        {`${food.foodName} (${food.quantityUnit})`}
      </MenuItem>
    ))}
  </Select>
</FormControl>


        <TextField
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
        />

        <Button
          variant="contained"
          color="primary"
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={addMeal}
        >
          Add Meal
        </Button>
      </div>

      <div className="overflow-x-auto">
  <table className="w-full text-sm text-left text-gray-700 border border-gray-300">
    <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
      <tr>
        <th className="px-4 py-2">Food Name</th>
        <th className="px-4 py-2">Quantity</th>
        <th className="px-4 py-2">QuantityUnit</th>
        <th className="px-4 py-2">Calories</th>
        <th className="px-4 py-2">Proteins</th>
        <th className="px-4 py-2">Carbs</th>
        <th className="px-4 py-2">Action</th>
      </tr>
    </thead>
    <tbody>
  {mealPlans
    .filter((meal) => meal.mealType.toLowerCase() === mealType.toLowerCase()) // Case-insensitive comparison
    .map((meal) => {
      const foodDetails = userFoods.find((food) => food.foodId === meal.foodId);

      return (
        <tr key={`${meal.mealPlannerId}-${meal.foodId}`} className="border-t">
          <td className="px-4 py-2">{meal.foodName || foodDetails?.foodName}</td>
          <td className="px-4 py-2">{meal.quantityValue}</td>
          <td className="px-4 py-2">{meal.quantityUnit || foodDetails?.quantityUnit || 0}</td>
          <td className="px-4 py-2">{meal.calories || foodDetails?.calories || 0}</td>
          <td className="px-4 py-2">{meal.proteins || foodDetails?.proteins || 0}</td>
          <td className="px-4 py-2">{meal.carbs || foodDetails?.carbs || 0}</td>
          <td className="px-4 py-2">
            <IconButton color="error" onClick={() => removeMeal(meal.mealPlannerId)}>
              <DeleteIcon />
            </IconButton>
          </td>
        </tr>
      );
    })}
</tbody>



  </table>
</div>




    </div>
  );
};

export default PlanMealPage;
