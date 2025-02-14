import ProfilePage from "../screens/profile";
import MealLibraryPage from "../screens/mealLibrary";
import PlanMealPage from "../screens/mealPlan";
import MacroAnalysisPage from "../screens/macroAnalysis";
import SignUpPage from "../screens/signUp";
import LoginPage from "../screens/logIn";
import { PublicRoute } from "../layouts/public";
import { PrivateRoute } from "../layouts/private";

export const privateRoutes = [
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/meal-library",
    element: (
      <PrivateRoute>
        <MealLibraryPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/plan-meal",
    element: (
      <PrivateRoute>
        <PlanMealPage />
      </PrivateRoute>
    ),
  },
  {
    path: "/nutrition-stats",
    element: (
      <PrivateRoute>
        <MacroAnalysisPage />
      </PrivateRoute>
    ),
  },
];

export const publicRoutes = [
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignUpPage />
      </PublicRoute>
    ),
  },
  {
    path: "/signin",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
];
