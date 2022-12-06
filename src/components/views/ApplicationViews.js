import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { MealCard } from "../cards/MealCard"
import { AddMeal } from "../forms/AddMealForm";
import { MealViews } from "../views/MealViews"

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <MealViews />
            <Outlet />
          </>
        }
      >
        <Route path="AddMeal" element={<AddMeal />} />
        <Route path="/staffUpcomingEvents/:recipesId/edit" element={<EditMeal />} />
      </Route>
    </Routes>
  );
  }