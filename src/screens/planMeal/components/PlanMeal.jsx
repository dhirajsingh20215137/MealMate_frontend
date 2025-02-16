import React from "react";
import {
  Box,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button,
  FormControl,
} from "@mui/material";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const PlanMealComponent = ({
  mealPlans,
  mealType,
  selectedFoodId,
  quantity,
  userFoods,
  setMealType,
  setSelectedFoodId,
  setQuantity,
  handleAddMeal,
  handleRemoveMeal,
  mealTypes,
}) => {
  return (
    <Box
      maxWidth="800px"
      mx="auto"
      mt={5}
      p={4}
      boxShadow={3}
      borderRadius={2}
      sx={{ backgroundColor: "#6A9C89" }}
    >
      <Box component="h1" className="text-white text-2xl mb-3 text-center text-bold">
        Plan Your Meal
      </Box>

      {/* Form Section */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <Select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              displayEmpty
              sx={{
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              }}
            >
              <MenuItem value="" disabled>
                Select Meal Type
              </MenuItem>
              {mealTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <Select
              value={selectedFoodId}
              onChange={(e) => setSelectedFoodId(e.target.value)}
              displayEmpty
              sx={{
                color: "white",
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              }}
            >
              <MenuItem value="" disabled>
                Select Food
              </MenuItem>
              {userFoods.map((food) => (
                <MenuItem key={food.foodId} value={food.foodId}>
                  {`${food.foodName} (${food.quantityUnit})`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={4}>
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
        </Grid>
      </Grid>

      <Button
        variant="contained"
        onClick={handleAddMeal}
        sx={{
          backgroundColor: "white",
          color: "black",
          transition: "background-color 0.3s",
          "&:hover": { backgroundColor: "#6A9C89" },
        }}
      >
        Add Meal
      </Button>

      {/* Table Section */}
      <Box mt={4} overflow="auto">
        <table className="w-full text-sm text-left text-white border border-gray-300">
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
              .filter(
                (meal) => meal.mealType.toLowerCase() === mealType.toLowerCase()
              )
              .map((meal) => {
                const foodDetails = userFoods.find(
                  (food) => food.foodId === meal.foodId
                );
                return (
                  <tr key={meal.mealPlannerId} className="border-t text-white">
                    <td className="px-4 py-2">
                      {meal.foodName || foodDetails?.foodName}
                    </td>
                    <td className="px-4 py-2">{meal.quantityValue}</td>
                    <td className="px-4 py-2">
                      {meal.quantityUnit || foodDetails?.quantityUnit}
                    </td>
                    <td className="px-4 py-2">
                      {meal.calories || foodDetails?.calories}
                    </td>
                    <td className="px-4 py-2">
                      {meal.proteins || foodDetails?.proteins}
                    </td>
                    <td className="px-4 py-2">
                      {meal.carbs || foodDetails?.carbs}
                    </td>
                    <td className="px-4 py-2">
                      <IconButton
                        onClick={() => handleRemoveMeal(meal.mealPlannerId)}
                        sx={{ color: "#16423C" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

export default PlanMealComponent;
