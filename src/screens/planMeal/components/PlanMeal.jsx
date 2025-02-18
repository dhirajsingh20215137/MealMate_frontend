import React from "react";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Paper,
  TableContainer,
} from "@mui/material";
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
  filteredMeals,
  totalNutrition,
}) => {
  return (
    <Box
      maxWidth="800px"
      mx="auto"
      mt={5}
      p={4}
      boxShadow={3}
      borderRadius={2}
      sx={{ backgroundColor: "#6A9C89", color: "white" }}
    >
      <Typography variant="h4" align="center" fontWeight="bold" mb={3}>
        Plan Your Meal
      </Typography>

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

      {filteredMeals.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 4, bgcolor: "#6A9C89" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-bold">Food Name</TableCell>
                <TableCell className="font-bold">Quantity</TableCell>
                <TableCell className="font-bold">Unit</TableCell>
                <TableCell className="font-bold">Fats</TableCell>
                <TableCell className="font-bold">Proteins</TableCell>
                <TableCell className="font-bold">Carbs</TableCell>
                <TableCell className="font-bold">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMeals.map((meal) => (
                <TableRow key={meal.mealPlannerId}>
                  <TableCell>{meal.foodName}</TableCell>
                  <TableCell>{meal.quantityValue}</TableCell>
                  <TableCell>{meal.quantityUnit}</TableCell>
                  <TableCell>{meal.fats*meal.quantityValue}</TableCell>
                  <TableCell>{meal.proteins*meal.quantityValue}</TableCell>
                  <TableCell>{meal.carbs*meal.quantityValue}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleRemoveMeal(meal.mealPlannerId)}
                      sx={{ color: "#16423C" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-200">
                <TableCell colSpan={3} className="font-bold">
                  Total
                </TableCell>
                <TableCell className="font-bold">
                  {totalNutrition.totalFats.toFixed(2)}
                </TableCell>
                <TableCell className="font-bold">
                  {totalNutrition.totalProteins.toFixed(2)}
                </TableCell>
                <TableCell className="font-bold">
                  {totalNutrition.totalCarbs.toFixed(2)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default PlanMealComponent;
