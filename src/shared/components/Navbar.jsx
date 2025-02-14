import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  // Function to handle active link styles
  const getLinkStyles = (path) => ({
    backgroundColor: location.pathname === path ? "#6A9C89" : "white",
    color: location.pathname === path ? "white" : "black",
  });

  return (
    <nav
      className="p-4 text-white flex justify-between items-center w-full fixed top-0 left-0 z-50 shadow-md h-20"
      style={{ backgroundColor: "#16423C" }}
    >
      {/* Left Section: Logo + Name + Navigation */}
      <div className="flex items-center space-x-6">
        {/* Logo and Name */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src="/MealMate.png"
            alt="MealMate Logo"
            className="w-16 h-16 rounded-full bg-[#144442] p-2"
          />
          <span className="text-2xl font-bold">MealMate</span>
        </Link>

        {/* Navigation Links (Only if user is logged in) */}
        {user && (
          <div className="flex space-x-4 text-lg font-semibold">
            <Link
              to="/meal-library"
              className="px-4 py-2 rounded transition"
              style={{ ...getLinkStyles("/meal-library"), transition: "background-color 0.3s" }}
            >
              Meal Library
            </Link>
            <Link
              to="/plan-meal"
              className="px-4 py-2 rounded transition"
              style={{ ...getLinkStyles("/plan-meal"), transition: "background-color 0.3s" }}
            >
              Plan Meal
            </Link>
            <Link
              to="/profile"
              className="px-4 py-2 rounded transition"
              style={{ ...getLinkStyles("/profile"), transition: "background-color 0.3s" }}
            >
              Profile
            </Link>
            <Link
              to="/nutrition-stats"
              className="px-4 py-2 rounded transition"
              style={{ ...getLinkStyles("/nutrition-stats"), transition: "background-color 0.3s" }}
            >
              Nutrition Analysis
            </Link>
          </div>
        )}
      </div>

      {/* Right Section: Signup/Login (if not logged in) OR Logout (if logged in) */}
      <div className="flex space-x-4">
        {!user ? (
          <>
            <Link
              to="/signup"
              className="px-4 py-2 rounded transition"
              style={{ ...getLinkStyles("/signup"), transition: "background-color 0.3s" }}
            >
              Signup
            </Link>
            <Link
              to="/signin"
              className="px-4 py-2 rounded transition"
              style={{ ...getLinkStyles("/signin"), transition: "background-color 0.3s" }}
            >
              Login
            </Link>
          </>
        ) : (
          <button
            className="bg-white text-black px-5 py-2 rounded transition"
            style={{ transition: "background-color 0.3s" }}
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

export default Navbar;
