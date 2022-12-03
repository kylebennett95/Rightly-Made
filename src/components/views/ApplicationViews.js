import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { MealCard } from "../cards/MealCard"
import { AddMeal } from "../forms/AddMealForm";
import { MealViews } from "../views/MealViews"

export const ApplicationViews = () => {

 return <MealViews />

  }