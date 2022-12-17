import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Views.css"

export const FavoriteMeals = () => {
    const [favoriteMeals, setFavoriteMeals] = useState([]);

    const localProjectUser = localStorage.getItem("project_user");
    const projectUserObject = JSON.parse(localProjectUser);

    var fetchData = () => {
        fetch(`http://localhost:8088/favoriteRecipe?_expand=recipe`)
        .then((response) => response.json())
        .then((favoriteMealArray) => {
            setFavoriteMeals(favoriteMealArray.filter((obj) => obj.userId === projectUserObject.id))
        });
    };

    useEffect(() => {
        fetch(`http://localhost:8088/favoriteRecipe?_expand=recipe`)
        .then((response) => response.json())
        .then((favoriteMealArray) => {
            setFavoriteMeals(favoriteMealArray.filter((obj) => obj.userId === projectUserObject.id))
        });
    }, []);

    const unfavoriteButtonClick = (id) => {
        return fetch(`http://localhost:8088/favoriteRecipe/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          fetchData();
        });
      };

    return (
        <>
            <h2>Favorite Meals</h2>
            <div class="container">
            <article className="savedMeals">
                {favoriteMeals.map((meal) => (
                    <section className="card">
                        <header className="header">{meal.recipe.name}</header>
                        <p className="labels">Ingredients:</p>
                        <p className="cardContents">{meal.recipe.ingredients}</p>
                        <p className="labels">Instructions</p>
                        <p className="cardContents">{meal.recipe.instructions}</p>
                        <button className="unfavoriteButton" onClick={() => unfavoriteButtonClick(meal.id)}>Remove from Favorites</button>
                    </section>
                ))}
            </article>
            </div>
        </>
    )
}