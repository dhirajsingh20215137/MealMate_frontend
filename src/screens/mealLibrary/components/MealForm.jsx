export default function MealForm({
  meal,
  isEditing,
  handleChange,
  handleImageChange,
  handleSubmit,
}) {
  return (
    <div className="flex flex-col h-auto p-1 bg-white rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-2 text-gray-800">Meal Details</h2>

      {["foodName", "calories", "proteins", "carbs", "quantityUnit", "foodType"].map((field) => (
        <input
          key={field}
          type={["calories", "proteins", "carbs"].includes(field) ? "number" : "text"}
          name={field}
          placeholder={field.replace(/([A-Z])/g, " $1").toUpperCase()}
          value={meal[field]}
          onChange={handleChange}
          className="w-full p-1 mb-1 border rounded-md text-sm placeholder-gray-500"
        />
      ))}

      <label className="w-full h-32 bg-gray-50 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center cursor-pointer">
        {meal.imageUrl ? (
          <img src={meal.imageUrl} alt="Meal" className="w-full h-full object-cover rounded-md" />
        ) : (
          <span className="text-gray-400 text-sm">Click to Add Photo</span>
        )}
        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      </label>

      <button
        onClick={handleSubmit}
        className={`w-full mt-2 ${isEditing ? "bg-green-300" : "bg-green-800"} text-white font-semibold py-1.5 rounded-md hover:bg-opacity-90 transition`}
      >
        {isEditing ? "Update Meal" : "Add Meal"}
      </button>
    </div>
  );
}
