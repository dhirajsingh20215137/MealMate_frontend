import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  MenuItem,
} from "@mui/material";

const QUANTITY_UNITS = ["COUNT", "CUP", "GRAMS", "ML", "SLICE"];

export default function MealForm({
  meal,
  setMeal,
  isEditing,
  handleImageChange,
  handleSubmit,
  user,
}) {
  const isAdmin = user?.userType === "ADMIN";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeal((prevMeal) => ({
      ...prevMeal,
      [name]: value,
    }));
  };

  return (
    <Paper elevation={3} className="p-6 rounded-lg bg-[#6A9C89] shadow-md">
      <Typography
  variant="h4"
  className="font-bold text-white mb-8 text-center"
>
  {isEditing ? "Edit Meal" : "Add Meal"}
</Typography>


      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="text"
                name="foodName"
                label="Food Name"
                value={meal.foodName || ""}
                onChange={handleChange}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  className: "!text-white",
                }}
                InputProps={{
                  className: "!text-white placeholder-white !border-white",
                }}
                className="border-white-100 text-white-100"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                name="calories"
                label="Calories(kcl)"
                value={meal.calories || ""}
                onChange={handleChange}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  className: "!text-white",
                }}
                InputProps={{
                  className: "!text-white placeholder-white !border-white",
                }}
                className="border-white-100 text-white-100"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                name="proteins"
                label="Proteins(g)"
                value={meal.proteins || ""}
                onChange={handleChange}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  className: "!text-white",
                }}
                InputProps={{
                  className: "!text-white placeholder-white !border-white",
                }}
                className="border-white-100 text-white-100"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                name="carbs"
                label="Carbs(g)"
                value={meal.carbs || ""}
                onChange={handleChange}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  className: "!text-white",
                }}
                InputProps={{
                  className: "!text-white placeholder-white !border-white",
                }}
                className="border-white-100 text-white-100"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Food Type"
                value={isAdmin ? "UNIVERSAL_FOOD" : "CUSTOM_FOOD"}
                variant="outlined"
                size="small"
                InputLabelProps={{
                  className: "!text-white", 
                }}
                InputProps={{
                  readOnly: true,
                  className: "!text-white !border-white", 
                }}
                className="!border-white !text-white" 
              />
            </Grid>

  
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Quantity Unit"
                name="quantityUnit"
                value={meal.quantityUnit}
                onChange={handleChange}
                variant="outlined"
                size="small"
                helperText="Please select quantity unit"
                InputLabelProps={{
                  className: "!text-white",
                }}
                InputProps={{
                  className: "!text-white placeholder-white !border-white",
                }}
                className="border-white-100 text-white-100"
              >
                {QUANTITY_UNITS.map((unit) => (
                  <MenuItem key={unit} value={unit}>
                    {unit}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Grid>

  
        <Grid
          item
          xs={12}
          md={6}
          className="flex flex-col items-center justify-center"
        >
          <label
            htmlFor="image-upload"
            className="flex items-center justify-center w-full h-44 bg-gray-100 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer overflow-hidden"
          >
            {meal.imageUrl ? (
              <img
                src={meal.imageUrl}
                alt="Meal"
                className="w-full h-full object-cover"
              />
            ) : (
              <Typography variant="body2" className="text-gray-500">
                Click to Add Photo
              </Typography>
            )}
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </Grid>


        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            className="bg-[#15423C] hover:bg-green-10000 text-white font-bold !py-2 !px-4 !rounded !focus:ring-0 !focus:outline-none !active:bg-green-700"
            disableRipple
            disableFocusRipple
            disableElevation
          >
            {isEditing ? "Update Meal" : "Add Meal"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}