import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { AddMeal } from "../forms/AddMealForm";
import { EditMeal } from "../forms/EditMealForm";
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
        <Route path="/:recipesId/edit" element={<EditMeal />} />
      </Route>
    </Routes>
  );
  }