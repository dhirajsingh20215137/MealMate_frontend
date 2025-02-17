import React from "react";
import {
  Box,
  Grid,
  Select,
  MenuItem,
  TextField,
  Button,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
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
      <Typography variant="h5" align="center" gutterBottom>
        Plan Your Meal
      </Typography>

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

      <TableContainer component={Paper} sx={{ mt: 4, bgcolor: "#6A9C89" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#E0E0E0" }}>
              <TableCell>Food Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Proteins</TableCell>
              <TableCell>Carbs</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mealPlans
              .filter(
                (meal) => meal.mealType.toLowerCase() === mealType.toLowerCase()
              )
              .map((meal) => {
                const foodDetails = userFoods.find(
                  (food) => food.foodId === meal.foodId
                );
                return (
                  <TableRow key={meal.mealPlannerId}>
                    <TableCell>
                      {meal.foodName || foodDetails?.foodName}
                    </TableCell>
                    <TableCell>{meal.quantityValue}</TableCell>
                    <TableCell>
                      {meal.quantityUnit || foodDetails?.quantityUnit}
                    </TableCell>
                    <TableCell>
                      {meal.calories || foodDetails?.calories}
                    </TableCell>
                    <TableCell>
                      {meal.proteins || foodDetails?.proteins}
                    </TableCell>
                    <TableCell>{meal.carbs || foodDetails?.carbs}</TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleRemoveMeal(meal.mealPlannerId)}
                        sx={{ color: "#16423C" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PlanMealComponent;
