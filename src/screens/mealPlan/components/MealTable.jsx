import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MealTable = ({ mealPlans, mealType, userFoods, handleRemove }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left text-white-700 border border-gray-300">
      <thead className="bg-gray-100 text-gray-900 uppercase text-xs">
        <tr>
          <th className="px-4 py-2">Food Name</th>
          <th className="px-4 py-2">Quantity</th>
          <th className="px-4 py-2">Unit</th>
          <th className="px-4 py-2">Calories</th>
          <th className="px-4 py-2">Proteins</th>
          <th className="px-4 py-2">Carbs</th>
          <th className="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody> 
        {mealPlans
          .filter((meal) => meal.mealType.toLowerCase() === mealType.toLowerCase())
          .map((meal) => {
            const foodDetails = userFoods.find((food) => food.foodId === meal.foodId);
            return (
              <tr key={meal.mealPlannerId} className="border-t text-white">
                <td className="px-4 py-2">{meal.foodName || foodDetails?.foodName}</td>
                <td className="px-4 py-2">{meal.quantityValue}</td>
                <td className="px-4 py-2">{meal.quantityUnit || foodDetails?.quantityUnit}</td>
                <td className="px-4 py-2">{meal.calories || foodDetails?.calories}</td>
                <td className="px-4 py-2">{meal.proteins || foodDetails?.proteins}</td>
                <td className="px-4 py-2">{meal.carbs || foodDetails?.carbs}</td>
                <td className="px-4 py-2">
                <IconButton
  onClick={() => handleRemove(meal.mealPlannerId)}
  sx={{ color: '#16423C' }}  // Applying the color
>
  <DeleteIcon />
</IconButton>
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  </div>
);

export default MealTable;
