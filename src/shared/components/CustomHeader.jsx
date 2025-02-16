import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth";

const CustomHeader = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getLinkStyles = (path) => ({
    backgroundColor: location.pathname === path ? "#6A9C89" : "white",
    color: location.pathname === path ? "white" : "black",
  });

  return (
    <nav
      className="p-4 text-white flex justify-between items-center w-full fixed top-0 left-0 z-50 shadow-md h-20"
      style={{ backgroundColor: "#16423C" }}
    >
      <div className="flex items-center space-x-6">
        <Link to="/profile" className="flex items-center space-x-3">
          <img
            src="/MealMate.png"
            alt="MealMate Logo"
            className="w-16 h-16 rounded-full bg-[#144442] p-2"
          />
          <span className="text-2xl font-bold">MealMate</span>
        </Link>

        {user && (
          <div className="flex space-x-4 text-lg font-semibold">
            <Link
              to="/meal-library"
              className="px-4 py-2 rounded transition"
              style={getLinkStyles("/meal-library")}
            >
              Meal Library
            </Link>
            <Link
              to="/plan-meal"
              className="px-4 py-2 rounded transition"
              style={getLinkStyles("/plan-meal")}
            >
              Plan Meal
            </Link>
            <Link
              to="/profile"
              className="px-4 py-2 rounded transition"
              style={getLinkStyles("/profile")}
            >
              Profile
            </Link>
            <Link
              to="/nutrition-stats"
              className="px-4 py-2 rounded transition"
              style={getLinkStyles("/nutrition-stats")}
            >
              Nutrition Analysis
            </Link>
          </div>
        )}
      </div>

      <div className="flex space-x-4">
        {!user ? (
          <>
            <Link
              to="/signup"
              className="px-4 py-2 rounded transition"
              style={getLinkStyles("/signup")}
            >
              Signup
            </Link>
            <Link
              to="/signin"
              className="px-4 py-2 rounded transition"
              style={getLinkStyles("/signin")}
            >
              Login
            </Link>
          </>
        ) : (
          <button
            className="bg-white text-black px-5 py-2 rounded transition"
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#6A9C89")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default CustomHeader;
