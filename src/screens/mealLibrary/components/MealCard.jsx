import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "@mui/material";

const HOST = "http://localhost:8081/";
export default function MealCard({ meal, onEdit, onDelete }) {
  return (
    <div className="p-1 rounded-xl shadow-md flex flex-col justify-between" style={{ backgroundColor: "#C4DAD2", minHeight: "220px" }}>
      {meal.imageUrl && (
        <img
          src={meal.imageUrl}
          // src={`${HOST}/${meal.imageUrl}`}
          alt={meal.foodName}
          className="w-full h-32 object-cover rounded-xl"
        />
      )}
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-white mt-2">{meal.foodName}</h3>
        <p>Calories: {meal.calories}</p>
        <p>Proteins: {meal.proteins}g</p>
        <p>Carbs: {meal.carbs}g</p>
      </div>

      {/* Edit & Delete Buttons */}
      <div className="mt-2 h-10 flex justify-between">
        {/* Edit Button */}
        <Tooltip title="Edit meal">
          <button
            onClick={() => onEdit(meal)}
            className="px-3 py-1 rounded-md text-sm flex items-center gap-1 bg-green-300 text-white"
          >
            <PencilIcon className="h-4 w-4" /> Edit
          </button>
        </Tooltip>

        {/* Delete Button */}
        <Tooltip title="Delete meal">
          <button
            onClick={() => onDelete(meal.foodId)}
            className="px-3 py-1 rounded-md text-sm flex items-center gap-1 bg-green-800 text-white"
          >
            <TrashIcon className="h-4 w-4" /> Delete
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
