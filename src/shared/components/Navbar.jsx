import { Link } from "react-router-dom";
import { useAuth } from "../../auth";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav
      className="p-4 text-white flex justify-between items-center w-full fixed top-0 left-0 z-50 shadow-md"
      style={{ backgroundColor: "#16423C" }}
    >
      <div className="flex space-x-4 text-lg font-semibold">
        {!user ? (
          <>
            <Link
              to="/signup"
              className="bg-white text-black px-4 py-2 rounded transition"
              style={{ transition: "background-color 0.3s" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6A9C89")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
            >
              Signup
            </Link>
            <Link
              to="/signin"
              className="bg-white text-black px-4 py-2 rounded transition"
              style={{ transition: "background-color 0.3s" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6A9C89")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/meal-library"
              className="bg-white text-black px-4 py-2 rounded transition"
              style={{ transition: "background-color 0.3s" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6A9C89")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
            >
              Meal Library
            </Link>
            <Link
              to="/plan-meal"
              className="bg-white text-black px-4 py-2 rounded transition"
              style={{ transition: "background-color 0.3s" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6A9C89")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
            >
              Plan Meal
            </Link>

            <Link
              to="/profile"
              className="bg-white text-black px-4 py-2 rounded transition"
              style={{ transition: "background-color 0.3s" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6A9C89")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
            >
              Profile
            </Link>

            <Link
              to="/nutrition-stats"
              className="bg-white text-black px-4 py-2 rounded transition"
              style={{ transition: "background-color 0.3s" }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#6A9C89")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
            >
              Nutrition Analysis
            </Link>
          </>
        )}
      </div>

      {user && (
        <button
        className="bg-white text-black px-5 py-2 rounded transition"
        style={{ transition: 'background-color 0.3s' }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#6A9C89')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = 'white')}
        onClick={logout}
      >
        Logout
      </button>
      
      )}
    </nav>
  );
};

export default Navbar;
