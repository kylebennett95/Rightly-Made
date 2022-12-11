import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const FavoriteMeals = () => {
    const [favoriteMeals, setFavoriteMeals] = useState([]);

    const localProjectUser = localStorage.getItem("project_user");
    const projectUserObject = JSON.parse(localProjectUser);

    var fetchData = () => {
        fetch(`http://localhost:8088/recipes?_expand=favoriteRecipe`)
        .then((response) => response.json())
        .then((favoriteMealArray) => {
            setFavoriteMeals(favoriteMealArray.filter((obj) => obj.userId === projectUserObject.id))
        });
    };

    useEffect(() => {
        fetch(`http://localhost:8088/recipes?_expand=favoriteRecipe`)
        .then((response) => response.json())
        .then((favoriteMealArray) => {
            setFavoriteMeals(favoriteMealArray.filter((obj) => obj.userId === projectUserObject.id))
        });
    }, []);

    return (
        <>
            <h2>Favorite Meals</h2>

            <article className="FavoriteMeals">
                <p>Hello</p>
                {favoriteMeals.map((meal) => (
                    <section>
                        <header>{meal.recipes.name}</header>
                        <p>Hello</p>
                        <p>{meal.recipes.instructions}</p>
                    </section>
                ))}
            </article>
            <p>Hi</p>
        </>
    )
}