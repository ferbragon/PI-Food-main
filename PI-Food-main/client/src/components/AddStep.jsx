import { useState, useEffect } from 'react';
import AddIngredient from './AddIngredient';
import Ingredient from "./Ingredient";
import { stepValidator } from './validations';
import "../stylesheets/AddStep.css";

const AddStep = ({ handleSubmitAddStep, handleHideStep, stepNumber }) => {

    //Local state
    const [step, setStep] = useState({
        step: '',
        number: 0,
        equipment: [],
        ingredients: []
    });

    const [errors, setErrors] = useState({});

    //State show addIngredient
    const [showAddIngredient, setShowAddIngredient] = useState(false);

    //handle show/hideAddIngredient
    const handleShowAddIngredient = () => {
        setShowAddIngredient(true);
    };

    const handleShowHideIngredient = () => {
        setShowAddIngredient(false);
    };

    //handles to send data to parent
    const handleChange = (event) => {
        setStep({
            ...step,
            [event.target.name]: event.target.value
        });
        setErrors(stepValidator({
            ...step,
            [event.target.name]: event.target.value
        }))
    };

    //Do quick validations

    useEffect(() => {
        setErrors(stepValidator(step));
        }, [step]);


    const handleAddStep = () => {
        handleSubmitAddStep({...step, number: stepNumber});
        //Clean state
        setStep({
          step: '',
          number: stepNumber,
          equipment: [],
          ingredients: [],
        });
      };

    const handleHide = () => {
        handleHideStep()
    };

    //functions to add and delete ingredients
    const addIngredients = (ingredient) =>{
        //const ingredientsToAdd = ingredients.split(","); for 2 or more ingredients
        setStep((prevState) => ({
            ...prevState,
            ingredients: [...prevState.ingredients, ingredient]
        }))
    };

    const deleteIngredient = (id) => {
        const ingredientDelete = step.ingredients.filter((ingredient) => ingredient.id !== id);
        setStep((prevState) => ({
            ...prevState,
            ingredients: [...ingredientDelete]
        }))
    };
    //handles to recieve data of ingredients
    const handleSubmitAddIngredients = (ingredient) => {
        addIngredients(ingredient);
    };


    return (
        <form>
            <label className='label-addStep' htmlFor='step'>Step {stepNumber}</label>
            <textarea className='input-addStep' name="step" type="text" onChange={handleChange} value={step.step} />

            {step.ingredients.length === 0 
            ? <></> : step.ingredients.map((ingredient) => (
                <Ingredient
                key={ingredient.id}
                id={ingredient.id}
                name={ingredient.name}
                deleteIngredient={deleteIngredient} 
                />
            ))}
            
            {step.ingredients.length === 0
            ? <span className="instructionQuestion inAddStep">Do you want to add ingredients for this step?</span>
            : <span className="instructionQuestion inAddStep">Do you want to add an other ingredient for this step?</span>}
            
            <button className='yes-button-addIngredient' type="button" onClick={handleShowAddIngredient}>Yes</button>
            <button className='no-button-addIngredient' type="button" onClick={handleShowHideIngredient}>NO</button>
            
            {showAddIngredient
            ? <AddIngredient handleSubmitAddIngredients={handleSubmitAddIngredients} handleShowHideIngredient={handleShowHideIngredient} />
            : <></>}

            {errors.step && <div className="warning-step">
                <ul className="warning-step-message">
                {errors.step === "This field cannot be empty. Please enter a step" && <li className="warning-message inStep">This field cannot be empty. Please enter a step</li>}
                {errors.step === "The step must be under 612 characters" && <li className="warning-message inStep">The step must be under 612 characters</li>}
                </ul>
            </div>}
            <div className='buttonsStep'>
                <button type="button" onClick={handleAddStep} disabled={Object.keys(errors).length > 0}>Add Step</button>
                <button type="button" onClick={handleHide}>Go Back</button>
            </div>
            
        </form>
    );
};

export default AddStep;
