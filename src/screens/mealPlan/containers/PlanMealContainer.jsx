import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../auth/index';
import { Select, MenuItem, TextField, Button, FormControl, InputLabel } from '@mui/material';
import MealTable from '../components/MealTable';
import { fetchUserFoods, fetchMealPlans, addMeal, removeMeal } from '../api';
import "../../../index.css";

const mealTypes = ['breakfast', 'lunch', 'dinner', 'snack'];

const PlanMealContainer = () => {
  const { user, token } = useAuth();
  const userId = user.userId;
  const [mealPlans, setMealPlans] = useState([]);
  const [mealType, setMealType] = useState('breakfast');
  const [selectedFoodId, setSelectedFoodId] = useState('');
  const [quantity, setQuantity] = useState('');
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
    setSelectedFoodId('');
    setQuantity('');
  };

  const handleRemoveMeal = async (mealPlannerId) => {
    await removeMeal(userId, token, mealPlannerId);
    setMealPlans((prev) => prev.filter((meal) => meal.mealPlannerId !== mealPlannerId));
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 shadow-md rounded-lg" style={{ backgroundColor: '#6A9C89' }}>
  <h1 className="text-3xl font-semibold text-white mb-6">Plan Your Meal</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        
      <FormControl fullWidth sx={{ 
  "& .MuiOutlinedInput-root": {               
    "& fieldset": { borderColor: "white" },   
    "&:hover fieldset": { borderColor: "white" }, 
    "&.Mui-focused fieldset": { borderColor: "white" }, 
  },
  "& .MuiSelect-root": { color: "white" },    
  "& .MuiSelect-icon": { color: "white" }     
}}>
  <Select
    value={mealType}
    onChange={(e) => setMealType(e.target.value)}
    displayEmpty                            
    sx={{ color: "white" }}                 
  >
    <MenuItem value="" disabled>Select Meal Type</MenuItem> {/* Placeholder */}
    {mealTypes.map((type) => (
      <MenuItem key={type} value={type}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </MenuItem>
    ))}
  </Select>
</FormControl>


<FormControl fullWidth sx={{ 
  "& .MuiOutlinedInput-root": {                              
    "& fieldset": { borderColor: "white" },                  
    "&:hover fieldset": { borderColor: "white" },            
    "&.Mui-focused fieldset": { borderColor: "white" },      
  },
  "& .MuiSelect-root": { color: "white" },                   
  "& .MuiSelect-icon": { color: "white" }                   
}}>
  <Select
    displayEmpty                                          
    value={selectedFoodId}
    onChange={(e) => setSelectedFoodId(e.target.value)}
    sx={{ color: "white" }}                                 
  >
    <MenuItem value="" disabled>Select Food</MenuItem>     
    {userFoods.map((food) => (
      <MenuItem key={food.foodId} value={food.foodId}>
        {`${food.foodName} (${food.quantityUnit})`}
      </MenuItem>
    ))}
  </Select>
</FormControl>


        <TextField
  label="Set Quantity"
  value={quantity}
  onChange={(e) => setQuantity(e.target.value)}
  fullWidth
  sx={{
    input: { color: "white" },              
    label: { color: "white" },               
    "& label.Mui-focused": { color: "white" }, 
    "& .MuiOutlinedInput-root": {            
      "& fieldset": { borderColor: "white" },
      "&:hover fieldset": { borderColor: "white" }, 
      "&.Mui-focused fieldset": { borderColor: "white" }, 
    },
  }}
/>



<Button
  variant="contained"
  onClick={handleAddMeal}
  sx={{
    backgroundColor: 'white',
    color: 'black',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#6A9C89',
    },
  }}
>
  Add Meal
</Button>
      </div>

      <MealTable mealPlans={mealPlans} mealType={mealType} userFoods={userFoods} handleRemove={handleRemoveMeal} />
    </div>
  );
};

export default PlanMealContainer;
