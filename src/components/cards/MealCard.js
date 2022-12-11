import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./MealCard.css"

export const MealCard = () => {
    const [meal, setMeal] = useState([]);
    const [filteredMeal, setFiltered] = useState([]);
    const navigate = useNavigate();

    const localProjectUser = localStorage.getItem("project_user");
    const projectUserObject = JSON.parse(localProjectUser);

    var fetchData = () => {
      fetch(`http://localhost:8088/recipes?_expand=type`)
      .then((response) => response.json())
      .then((savedMealArray) => {
        setMeal(savedMealArray.filter((obj) => obj.userId === projectUserObject.id));
      });
    }

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

    const deleteButton = async (id) => {
      return await fetch(`http://localhost:8088/recipes/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
        })
          .then((response) => {
            fetchData();
          });
        };

        const FavoriteMeal = () => {
          const userFavoriteMeal = {
            userId: projectUserObject.id,
            recipeId: filteredMeal.id,
          };
        

          return fetch(`http://localhost:8088/favoriteRecipe`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userFavoriteMeal)
          })
            .then((response) => {
            fetchData();
          });
        };
    

    return (
        <>
        <div class="container">
        <article className="savedMeals">
          {filteredMeal.map((meal) => (
            <section className="card">
              <header>{meal.name}</header>
              <p>{meal.ingredients}</p>
              <p>{meal.instructions}</p>
              <Link to={`/${meal.id}/edit`} className="link">
                    Edit Meal
              </Link>
              <button onClick={() => FavoriteMeal(meal.id)}>Add to Favorites</button>
              <button onClick={() => deleteButton(meal.id)}>Delete</button>
            </section>
          ))}
        </article>
        </div>
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