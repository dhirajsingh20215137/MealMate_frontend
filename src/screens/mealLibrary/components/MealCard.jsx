import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

export default function MealCard({ meal, onEdit, onDelete }) {
  return (
    <div className="p-1 rounded-xl shadow-md" style={{ backgroundColor: "#C4DAD2" }}>
      {meal.imageUrl && (
        <img
          src={meal.imageUrl}
          alt={meal.foodName}
          className="w-full h-32 object-cover rounded-xl"
        />
      )}
      <h3 className="font-semibold text-lg text-white mt-2">{meal.foodName}</h3>
      <p>Calories: {meal.calories}</p>
      <p>Proteins: {meal.proteins}g</p>
      <p>Carbs: {meal.carbs}g</p>
      <div className="flex justify-between mt-2">
        <button
          onClick={() => onEdit(meal)}
          className="bg-green-300 text-white px-3 py-1 rounded-md text-sm"
        >
          <PencilIcon className="h-4 w-4 inline" /> Edit
        </button>
        <button
          onClick={() => onDelete(meal.foodId)}
          className="bg-green-800 text-white px-3 py-1 rounded-md text-sm"
        >
          <TrashIcon className="h-4 w-4 inline" /> Delete
        </button>
      </div>
    </div>
  );
}
