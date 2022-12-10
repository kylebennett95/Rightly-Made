import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const MealCard = () => {
    const [meal, setMeal] = useState([]);
    const [filteredMeal, setFiltered] = useState([]);
    const navigate = useNavigate();

    const localProjectUser = localStorage.getItem("project_user");
    const projectUserObject = JSON.parse(localProjectUser);

    useEffect(() => {
        fetch(`http://localhost:8088/recipes`)
        .then((response) => response.json())
        .then((mealArray) => {
            setMeal(mealArray);
        });
    }, []);

    useEffect(() => {
      const myMeals = meal.filter(meal => meal.userId === projectUserObject.id)
      setFiltered(myMeals)
    }, [meal])

    const deleteButton = (id) => {
      return fetch(`http://localhost:8088/recipes/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
        })
      }
    

    return (
        <>
        <article className="SavedEvents">
          {filteredMeal.map((meal) => (
            <section>
              <header>{meal.name}</header>
              <p>{meal.ingredients}</p>
              <p>{meal.instructions}</p>
              <Link to={`/${meal.id}/edit`} className="link">
                    Edit Meal
              </Link>
              <button onClick={() => deleteButton(meal.id)}>Delete</button>
            </section>
          ))}
        </article>
      </>
      );
}

// {
//   "id": 1,
//   "userId": 1,
//   "name": "Test",
//   "ingredients": "Test",
//   "instructions": "Test",
//   "typeId": 2
// },