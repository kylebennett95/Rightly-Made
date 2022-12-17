import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { MealCard } from "../cards/MealCard"
import { AddMeal } from "../forms/AddMealForm";
import { FavoriteMeals } from "./FavoriteMeals";
import "./Views.css"

export const MealViews = () => {
    const navigate = useNavigate();

    return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1 className="title">Rightly-Made Recipes</h1>
                    <div className="main">
                        <div className="mainHeader">
                    <button  onClick={() => navigate("AddMeal")} className="button">Add New Meal</button>
                        </div>
                        <div className="cardMain">
                    <MealCard />
                        </div>
                    <Outlet />
                    </div>
                </>
            }>
            </Route>
        </Routes>
    )
  }

  //You need to add lines 11 and 12 into a new page like staffupcomingevents. I think this page only needs to be used as a directory