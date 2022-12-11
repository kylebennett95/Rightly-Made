import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AddMealForm.css"

export const AddMeal = () => {
    const [meal, setMeal] = useState({
        userId: "",
        name: "",
        ingredients: "",
        instructions: "",
        typeId: "",
    });
    const [types, setTypes] = useState([]);
    const navigate = useNavigate();

    const localProjectUser = localStorage.getItem("project_user");
    const projectUserObject = JSON.parse(localProjectUser);

    useEffect(() => {
      fetch(`http://localhost:8088/type`)
        .then((response) => response.json())
        .then((setTypesArray) => {
          setTypes(setTypesArray)
        })
    }, []);

    const handleSaveButtonClick = (e) => {
        e.preventDefault();

        const mealToSendToAPI = {
            userId: projectUserObject.id,
            name: meal.name,
            ingredients: meal.ingredients,
            instructions: meal.instructions,
            typeId: parseInt(meal.typeId)
        };

      const recipeData = fetch(`http://localhost:8088/recipes`, {
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

  // const fetchingTypes = () => {
  //     fetch(`http://localhost:8088/type`)
  //     .then((res) => res.json())
  //     .then((type) => {
  //       setTypes(type);
  //     });
  // }
  

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
        <div className="form-group">
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
        </div>
        <div className="footer">
          <button
            onClick={(clickEvent) => {
              handleSaveButtonClick(clickEvent);
            }}
            className="addMeal"
          >
            Add Meal
          </button>
        </div>
      </div>
    </form>
  )
}

/* <option value="1">Breakfast</option>
<option value="2">Lunch</option>
<option value="3">Dinner</option> */

          /* {
            types.map((type) => (
              <option value={type.id}>{type.mealType}</option>
            ))
          } */