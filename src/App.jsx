import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/signup/signup.jsx';
import { Login } from "./components/login/login.jsx";
import { ProfilePage } from "./components/profilePage/profilePage.jsx";
import MealLibrary from "./components/mealPlannerPage/mealPlannerPage.jsx";
import PlanMealPage from './components/planMealPage/planMealPage.jsx';
import NutritionStats from './components/macrosAnalysis/macrosAnalysisPage.jsx';  // ✅ Import the NutritionStats
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { useAuth } from './auth/authContext';

function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="p-4 text-white flex justify-between items-center w-full fixed top-0 left-0 z-50 shadow-md" 
        style={{ backgroundColor: '#1F5756' }}>
            <div className="flex space-x-4 text-lg font-semibold">
                {!user && (
                    <>
                        <Link 
                            to="/signup" 
                            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
                        >
                            Signup
                        </Link>
                        <Link 
                            to="/signin" 
                            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
                        >
                            Login
                        </Link>
                    </>
                )}
                {user && (
                    <>
                        <Link 
                            to="/meal-library" 
                            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
                        >
                            Meal Library
                        </Link>
                        <Link 
                            to="/plan-meal" 
                            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
                        >
                            Plan Meal
                        </Link>
                        <Link 
                            to="/profilePage" 
                            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
                        >
                            Profile
                        </Link>
                        <Link 
                            to="/nutrition-stats" 
                            className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition"
                        >
                            Nutrition Analysis
                        </Link>
                    </>
                )}
            </div>

            {user && (
                <button 
                    className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition" 
                    onClick={logout}
                >
                    Logout
                </button>
            )}
        </nav>
    );
}

function App() {
    return (
        <Router>
            <Navbar />
            <div className="pt-16"> {/* Add padding to prevent content hiding behind the fixed navbar */}
                <Routes>
                    {/* Public Routes */}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Login />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/profilePage" element={<ProfilePage />} />
                        <Route path="/meal-library" element={<MealLibrary />} />
                        <Route path="/plan-meal" element={<PlanMealPage />} />
                        <Route path="/nutrition-stats" element={<NutritionStats />} /> {/* ✅ Added the Nutrition Analysis route */}
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
