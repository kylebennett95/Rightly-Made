import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AddMeal = () => {
    const [meal, setMeal] = useState({
        name: "",
        ingredients: "",
        instructions: "",
    });

    const navigate = useNavigate();

    const handleSaveButtonClick = (e) => {
        e.preventDefault();

        const mealToSendToAPI = {
            name: meal.name,
            ingredients: meal.ingredients,
            instructions: meal.instructions,
        };

        return fetch(`http://localhost:8088/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mealToSendToAPI),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/");
      });
  };

  return (
    <form className="mealForm">
      <h2 className="mealForm_title">Add Meal</h2>
      <div className="formContainer">
        <fieldset>
            <div className="form-group">
                <label htmlFor="mealName">Name:</label>
                <input
                  required
                  autoFocus
                  type="text"
                  className="form-control"
                  value={meal.name}
                  onChange={(evt) => {
                    const copy = { ...meal };
                    copy.name = evt.target.value;
                    setMeal(copy);
                  }}
                />
            </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
            <label htmlFor="ingredients">Ingredients:</label>
            <input
              required
              autoFocus
              type="text"
              className="form-control"
              value={meal.ingredients}
              onChange={(evt) => {
                const copy = { ...meal };
                copy.ingredients = evt.target.value;
                setMeal(copy);
              }}
            />
          </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
            <label htmlFor="instructions">Instructions:</label>
            <input
              required
              autoFocus
              type="text"
              className="form-control"
              value={meal.instructions}
              onChange={(evt) => {
                const copy = { ...meal };
                copy.instructions = evt.target.value;
                setMeal(copy);
              }}
            />
          </div>
        </fieldset>
        <div className="footer">
          <button
            onClick={(clickEvent) => {
              handleSaveButtonClick(clickEvent);
            }}
            className="addEvent"
          >
            Add Meal
          </button>
        </div>
      </div>
    </form>
  )
}