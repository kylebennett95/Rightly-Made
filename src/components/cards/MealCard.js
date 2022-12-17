import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./MealCard.css"

export const MealCard = ({recipeId}) => {
    const [meal, setMeal] = useState([]);
    const [favoriteMeal, setFavoriteMeal] = useState({
      userId: 0,
      recipeId: recipeId
    });
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

    useEffect((id) => {
      fetch(`http://localhost:8088/recipes?_expand=favoriteRecipes`)
      .then((response) => response.json())
      .then((data) => {
          setFavoriteMeal(data.filter((obj) => obj.recipes.id === recipeId));
      });
  }, [recipeId]);

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

        const FavoriteMeal = (id) => {
          const userFavoriteMeal = {
            userId: projectUserObject.id,
            recipeId: id,
          };

          
    

          return fetch(`http://localhost:8088/favoriteRecipe`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userFavoriteMeal)
          })
            .then((response) => {
              console.log(favoriteMeal)
            fetchData();
          });
        };
    

    return (
        <>
        <div class="container">
        <article className="savedMeals">
          {filteredMeal.map((meal) => (
            <section className="card">
              <div className="cardHeader">
              <header className="header">{meal.name}</header>
              </div>
              <div className="cardBody">
              <p className="labels">Ingredients:</p>
              <p className="cardContents">{meal.ingredients}</p>
              <p className="labels">Instructions:</p>
              <p className="cardContents">{meal.instructions}</p>
              </div>
              <div className="cardButtons">
              <Link to={`/${meal.id}/edit`} className="link">
                    Edit Meal
              </Link>
              <div className="cardButtons">
              <button className="cardButton" onClick={() => FavoriteMeal(meal.id)}>Add to Favorites</button>
              <button className="cardButton" onClick={() => deleteButton(meal.id)}>Delete</button>
              </div>
              </div>
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