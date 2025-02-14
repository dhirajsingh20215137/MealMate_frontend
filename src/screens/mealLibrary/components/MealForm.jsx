import { TextField, Button, Typography, Grid, Paper, MenuItem } from "@mui/material";

const QUANTITY_UNITS = ["COUNT", "CUP", "GRAMS", "ML", "SLICE"];

export default function MealForm({ meal, setMeal, isEditing, handleImageChange, handleSubmit, user }) {
  const isAdmin = user?.userType === "ADMIN";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMeal((prevMeal) => ({
      ...prevMeal,
      [name]: value,
    }));
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, backgroundColor: "white" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 2, color: "gray.800" }}>
        {isEditing ? "Edit Meal" : "Add Meal"}
      </Typography>

      <Grid container spacing={3}>
        {/* Left Side - Meal Details */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {["foodName", "calories", "proteins", "carbs"].map((field) => (
              <Grid item xs={12} key={field}>
                <TextField
                  fullWidth
                  type={["calories", "proteins", "carbs"].includes(field) ? "number" : "text"}
                  name={field}
                  label={field.replace(/([A-Z])/g, " $1").toUpperCase()}
                  value={meal[field] || ""}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                />
              </Grid>
            ))}

            {/* Fixed Food Type Field Based on User Role */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Food Type"
                value={isAdmin ? "UNIVERSAL_FOOD" : "CUSTOM_FOOD"}
                variant="outlined"
                size="small"
                InputProps={{ readOnly: true }} // Make it non-editable
              />
            </Grid>

            {/* Quantity Unit Dropdown */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                select
                label="Quantity Unit"
                name="quantityUnit"
                value={meal.quantityUnit || "GRAMS"}
                onChange={handleChange}
                variant="outlined"
                size="small"
                helperText="Please select quantity unit"
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

        {/* Right Side - Image Upload */}
        <Grid item xs={12} md={6} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <label
            htmlFor="image-upload"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "180px",
              backgroundColor: "#f9f9f9",
              border: "2px dashed #ccc",
              borderRadius: "8px",
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            {meal.imageUrl ? (
              <img src={meal.imageUrl} alt="Meal" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <Typography variant="body2" color="textSecondary">
                Click to Add Photo
              </Typography>
            )}
          </label>
          <input id="image-upload" type="file" accept="image/*" hidden onChange={handleImageChange} />
        </Grid>

        {/* Submit Button */}
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color={isEditing ? "success" : "primary"}
            onClick={handleSubmit}
            sx={{ fontWeight: "bold" }}
          >
            {isEditing ? "Update Meal" : "Add Meal"}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
