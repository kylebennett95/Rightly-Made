import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddMealForm.css"

export const EditMeal = () => {
  const [meal, setMeal] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    typeId: "",
});
  const [types, setTypes] = useState([]);
  const { recipesId } = useParams();
  const navigate = useNavigate();

   useEffect( () => {
   fetch(`http://localhost:8088/recipes/${recipesId}`)
      .then((response) => response.json())
      .then((data) => {
        setMeal(data);
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/type`)
      .then((response) => response.json())
      .then((setTypesArray) => {
        setTypes(setTypesArray)
      })
  }, []);

  const handleSaveButtonClick = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8088/recipes/${meal.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meal),
    })
      .then((response) => response.json())
      .then(() => {
        navigate("/");
      });
  };

  return (
    <>
    <h1 className="title">Rightly-Made Recipes</h1>
    <div className="container">
    <form className="mealForm">
      <h2 className="mealForm_title">Add Meal</h2>
      <div className="formContainer">
        <fieldset>
            <div className="form-group">
              <section className="instructions">
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
                </section>
            </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
          <section className="instructions">
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
            </section>
          </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
          <section className="instructions">
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
            </section>
          </div>
        </fieldset>
        <section className="mealType" key={`type--${types.id}`}>
        <label htmlFor="type">Meal Type:</label>
        <select onChange={(evt) => {
          const copy = { ...meal };
          copy.typeId = evt.target.value;
          setMeal(copy)}}>{types.map((type) => (
            <option value={type.id}>{type.mealType}</option>
          ))
        }     
        </select>
        </section>
        <div className="footer">
          <button className="cardButton" onClick={(clickEvent) => {handleSaveButtonClick(clickEvent)}}>Edit Meal
          </button>
        </div>
      </div>
    </form>
    </div>
    </>
  )
}