import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const MealCard = () => {
    const [meal, setMeal] = useState([]);
    const navigate = useNavigate();

    const localProjectUser = localStorage.getItem("project_user");
    const projectUserObject = JSON.parse(localProjectUser);

    useEffect(() => {
        fetch(`http://localhost:8088/recipes`)
        .then((response) => response.json())
        .then((mealArray) => {
            setMeal(mealArray);
        });
    });

    return (
        <>
        <article className="SavedEvents">
          {meal.map((meal) => (
            <section>
              <header>{meal.name}</header>
              <p>{meal.ingredients}</p>
              <p>{meal.instructions}</p>
            </section>
          ))}
        </article>
      </>
      );
}