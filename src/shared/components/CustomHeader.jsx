import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../auth";
import { AppBar, Toolbar } from "@mui/material";

const CustomHeader = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getButtonClasses = (path) =>
    `px-4 py-2 rounded transition ${
      location.pathname === path ? "bg-[#6A9C89]" : "bg-transparent"
    } text-white hover:bg-[#6A9C89]`;

  return (
    <AppBar position="fixed" className="bg-[#16423C] shadow-md">
      <Toolbar className="grid grid-cols-2 items-center w-full">
        <div className="flex items-center space-x-6">
          <Link to="/profile" className="flex items-center space-x-3">
            <img
              src="/MealMate.png"
              alt="MealMate Logo"
              className="w-12 h-12 rounded-full bg-[#144442] p-2"
            />
            <span className="text-white text-xl font-bold">MealMate</span>
          </Link>

          {user && (
            <nav className="grid grid-flow-col gap-4">
              {[
                { path: "/meal-library", label: "Meal Library" },
                { path: "/plan-meal", label: "Plan Meal" },
                { path: "/profile", label: "Profile" },
                { path: "/nutrition-stats", label: "Nutrition Analysis" },
              ].map(({ path, label }) => (
                <Link key={path} to={path} className={getButtonClasses(path)}>
                  {label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          {user ? (
            <button
              className="bg-white text-black px-5 py-2 rounded transition hover:bg-[#6A9C89] hover:text-white"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/signup" className={getButtonClasses("/signup")}>
                Signup
              </Link>
              <Link to="/signin" className={getButtonClasses("/signin")}>
                Login
              </Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default CustomHeader;
