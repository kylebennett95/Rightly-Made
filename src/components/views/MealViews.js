import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { MealCard } from "../cards/MealCard"
import { AddMeal } from "../forms/AddMealForm";

export const MealViews = () => {
    const navigate = useNavigate();

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Rightly-Made Recipes</h1>
                    <button onClick={() => navigate("AddMeal")} className="addMealButton">Add New Meal</button>
                    <MealCard />

                    <Outlet />
                </>
            }>
            <Route path="AddMeal" element={<AddMeal />} />
            </Route>
        </Routes>
    )
  }

  //You need to add lines 11 and 12 into a new page like staffupcomingevents. I think this page only needs to be used as a directory