import { useState, useEffect } from "react";
import { ingredientValidator } from "./validations.js";
import "../stylesheets/AddIngredient.css";

let idNumber = 0;
const AddIngredient = ({ handleSubmitAddIngredients, handleShowHideIngredient }) => {

    const[ingredient, setIngredient] = useState({
        "id": idNumber,
        "name": "",
        "image": "",
        "localizedName": ""
      });

    const [errors, setErrors] = useState({});

    const handleChange = (event) =>{
        setIngredient({
            ...ingredient,
            [event.target.name]: event.target.value,
            localizedName: event.target.value
        })
        setErrors(ingredientValidator({
            ...ingredient,
            [event.target.name]: event.target.value
        }))
    };

    //Do quick validations

    useEffect(() => {
        setErrors(ingredientValidator(ingredient));
        }, [ingredient]);

    const handleAddIngredient = (ingredient) => {
        handleSubmitAddIngredients(ingredient);
        setIngredient({
            "id": idNumber += 1,
            "name": "",
            "image": "",
            "localizedName": ""
          })
    };


    return(
        <form>
            <label className="label-ingredient" htmlFor="name">Ingredient to add:</label>
            <input className="input-ingredient" name="name" type="text" onChange={handleChange} value={ingredient.name}/>

            {errors.name && <div className="warning-ingredient">
                <ul className="warning-ingredient-message">
                {errors.name === "This field cannot be empty. Please enter an ingredient" && <li className="warning-message inIngredient">This field cannot be empty. Please enter an ingredient</li>}
                {errors.name === "The ingredient must be under 25 characters" && <li className="warning-message inIngredient">The ingredient must be under 25 characters</li>}
                </ul>
                </div>}
            <div className="buttonsIngredients">
            <button type="button" onClick={() => handleAddIngredient(ingredient)} disabled={Object.keys(errors).length > 0}>Add</button>
            <button type="button" onClick={handleShowHideIngredient}>I don't want to add ingredients</button>
            </div>
        </form>
    )
}

export default AddIngredient;