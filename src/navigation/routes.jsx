import { lazy } from "react";

export const privateRoutes = [
  { path: "/profile", Component: lazy(() => import("../screens/profile")) },
  { path: "/meal-library", Component: lazy(() => import("../screens/mealLibrary")) },
  { path: "/plan-meal", Component: lazy(() => import("../screens/planMeal")) },
  { path: "/nutrition-stats", Component: lazy(() => import("../screens/macroAnalysis")) },
];

export const publicRoutes = [
  { path: "/signup", Component: lazy(() => import("../screens/signUp")) },
  { path: "/signin", Component: lazy(() => import("../screens/logIn")) },
];
