import ProfilePage from "../screens/profile";
import MealLibraryPage from "../screens/mealLibrary";
import PlanMealPage from "../screens/planMeal";
import MacroAnalysisPage from "../screens/macroAnalysis";
import SignUpPage from "../screens/signUp";
import LoginPage from "../screens/logIn";

export const privateRoutes = [
  { path: "/profile", Component: ProfilePage },
  { path: "/meal-library", Component: MealLibraryPage },
  { path: "/plan-meal", Component: PlanMealPage },
  { path: "/nutrition-stats", Component: MacroAnalysisPage },
];

export const publicRoutes = [
  { path: "/signup", Component: SignUpPage },
  { path: "/signin", Component: LoginPage },
];

//loadable
