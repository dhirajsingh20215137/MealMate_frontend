import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Tooltip, Grid, Box, Typography, Button } from "@mui/material";

const HOST = "http://localhost:8081/";

export default function MealCard({ meal, onEdit, onDelete }) {
  return (
    <Grid
      container
      className="p-3 rounded-xl shadow-md bg-[#C4DAD2]"
      style={{ minHeight: "220px" }}
      direction="column"
      justifyContent="space-between"
    >
      
      {meal.imageUrl && (
        <Grid item>
          <img
            src={meal.imageUrl} 
            alt={meal.foodName}
            className="w-full h-32 object-cover rounded-xl"
          />
        </Grid>
      )}
    
      <Grid item className="flex-1">
        <Typography variant="h6" className="text-green-1000 mt-2 font-semibold">
          {meal.foodName}
        </Typography>
        <Typography>Calories: {meal.calories}kcl</Typography>
        <Typography>Proteins: {meal.proteins}g</Typography>
        <Typography>Carbs: {meal.carbs}g</Typography>
      </Grid>

      <Grid item className="mt-2">
        <Box display="flex" justifyContent="space-between">
       
          <Tooltip title="Edit meal">
            <Button
              onClick={() => onEdit(meal)}
              className="px-3 py-1 rounded-md text-sm flex items-center gap-1 bg-green-900 text-white"
            >
              <PencilIcon className="h-4 w-4" /> Edit
            </Button>
          </Tooltip>

      
          <Tooltip title="Delete meal">
            <Button
              onClick={() => onDelete(meal.foodId)}
              className="px-3 py-1 rounded-md text-sm flex items-center gap-1 bg-green-800 text-white"
            >
              <TrashIcon className="h-4 w-4" /> Delete
            </Button>
          </Tooltip>
        </Box>
      </Grid>
    </Grid>
  );
}