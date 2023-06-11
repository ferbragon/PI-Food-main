import { useState, useEffect } from "react";
import AddStep from "./AddStep";
import Step from "./Step";
import { recipeValidator } from "./validations";
import "../stylesheets/CreateNewRecipe.css";
import axios from "axios";
import CheckDiets from "./CheckDiets";
import { useSelector, useDispatch } from "react-redux";
import { detailErrors, fetchDataBaseRecipes  } from "../redux/actions";
import Loading from "./Loading";


const CreateNewRecipe = ({ closeCreateNewRecipe }) =>{

    const dispatch = useDispatch();
    //Var for render the diets
    //Global state
    const diets = useSelector(state => state.diets);
    let indexHalf = Math.floor(diets.length / 2) + 1;
    const firstDietsHalf = diets.slice(0, indexHalf);
    const secondDietsHalf = diets.slice(indexHalf, diets.length);

    const dbRecipes = useSelector(state => state.dbRecipes);

    //Local state stepNumber
    const [stepNumber, setStepNumber] = useState(1);
    //Local state for handle otherDiets
    //const [inputValue, setInputValue] = useState("");
    //Local state
    const [recipeData, setRecipeData] = useState({
        title: "",
        summary: "",
        healthScore: 1,
        instructions: "",
        analyzedInstructions: [{
            name:"",
            steps:[]
        }],
        image: "",
        vegan: false,
        vegetarian: false,
        glutenFree: false,
        dairyFree: false,
        pescatarian: false,
        paleolithic: false,
        primal: false,
        whole30: false,
        ketogenic: false,
        fodmapFriendly: false,
        lactoOvoVegetarian: false,
        otherDiets:"",
        dietTags: []
    });

    console.log(recipeData);
    //Local state for errors on handles
    const [errors, setErrors] = useState({});

    //Do quick validations

    useEffect(() => {
        setErrors(recipeValidator(recipeData));
        }, [recipeData]);

    //State show AddStep

    const [showAddStep, setShowAddStep] = useState(false);

    //handle show/hideAddState
    const handleShowStep = () => {
        setShowAddStep(true);
    };
    const handleHideStep = () => {
        setShowAddStep(false);
    };
    //Local state for loading
    const [loading, setLoading] = useState(false);

    //Local state for error in post
    const [error, setError] = useState(false);

    //Fetch dbrecipes again
    const handleDBRecipes = async () =>{
      await dispatch(fetchDataBaseRecipes());
  };

    useEffect(()=>{
      if(loading && dbRecipes.length > 0 && !error){
        setTimeout((
        )=>{
          setLoading(false);
          closeCreateNewRecipe();
        },2200)
      }
    },[loading, dbRecipes]);
    

      // handleChange for inputs
      const handleChange = (event) => {
        const { name, type, checked, value } = event.target;

        if (type === "checkbox") {
          if (["vegan", "vegetarian", "glutenFree"].includes(name)) {
            setRecipeData((prevState) => ({
              ...prevState,
              [name]: checked,
            }));
            setErrors((prevErrors) => ({
              ...prevErrors,
              [name]: null,
            }));
          } else {
            setRecipeData((prevState) => {
              let updatedState;
              if (checked) {
                updatedState = {
                  ...prevState,
                  [name]: checked,
                  dietTags: [...prevState.dietTags, name],
                };
              } else {
                updatedState = {
                  ...prevState,
                  [name]: checked,
                  dietTags: prevState.dietTags.filter((diet) => diet !== name),
                };
              }
              setErrors(recipeValidator(updatedState));
              return updatedState;
            });
          }
        } /*else if (type === "text" && name === "otherDiets") {
          const updatedState = {
            ...recipeData,
            otherDiets: value.trim().toLowerCase(),
          };
          setRecipeData(updatedState);
          setErrors(recipeValidator(updatedState));
        }*/ else {
          const updatedState = {
            ...recipeData,
            [name]: value,
          };
          setRecipeData(updatedState);
          setErrors(recipeValidator(updatedState));
        }
      };
      
      

    //AnalizedInstruction steps
    const addStep = (step) => {
        setStepNumber(() => stepNumber + 1);
        setShowAddStep(false);
        setRecipeData((prevState) => ({
          ...prevState,
          analyzedInstructions: [{
            ...prevState.analyzedInstructions[0],
            steps: [...prevState.analyzedInstructions[0].steps, {...step}]
          }]
        }));
      };
      
      const deleteStep = (stepNum) => {
        setStepNumber((prevStepNumber) => prevStepNumber - 1);
        setRecipeData((prevState) => {
          const steps = [...prevState.analyzedInstructions[0].steps];
          const newSteps = steps.filter((step) => step.number !== stepNum);
      
          // Renumber remaining steps
          newSteps.forEach((step, index) => {
            step.number = index + 1;
          });
      
          return {
            ...prevState,
            analyzedInstructions: [{
              ...prevState.analyzedInstructions[0],
              steps: newSteps
            }]
          };
        });
      };
  
      //handleEvent for addStep
      const handleSubmitAddStep = (step) => {
        addStep(step);
      };
      //handleEvent for deleteStep
      const handleSubmitDeleteStep = (number) => {
        deleteStep(number);
      };

      const handleSubmit = async (event) =>{
        event.preventDefault();
        setLoading(true);
    
            try{
                await axios.post("http://localhost:3001/recipes",{
                    title: recipeData.title,
                    summary: recipeData.summary,
                    healthScore: recipeData.healthScore,
                    instructions: recipeData.instructions,
                    analyzedInstructions: recipeData.analyzedInstructions,
                    image: recipeData.image,
                    vegan: recipeData.vegan,
                    vegetarian: recipeData.vegetarian,
                    glutenFree: recipeData.glutenFree,
                    dietTags: recipeData.dietTags
                });

                handleDBRecipes();

                setRecipeData({
                    title: "",
                    summary: "",
                    healthScore: 1,
                    instructions: "",
                    analyzedInstructions: [{
                      name: "",
                      steps: []
                    }],
                    image: "",
                    vegan: false,
                    vegetarian: false,
                    glutenFree: false,
                    dairyFree: false,
                    pescatarian: false,
                    paleolithic: false,
                    primal: false,
                    whole30: false,
                    ketogenic: false,
                    fodmapFriendly: false,
                    lactoOvoVegetarian: false,
                    otherDiets: "",
                    dietTags: []
                  });
            }catch (error){
                setError(true);
                dispatch(detailErrors(error));
            }
        setError(false);
      }

    return(
        <form onSubmit={handleSubmit} className="form">
          <button className="closeButtonNewRecipe" onClick={closeCreateNewRecipe}>
                X
            </button>
          {loading ? <div className="loaderDetail">
                            <Loading />
                        </div> :
            <div className="createRecipeFlex">
            <h1 className="createNewRecipeTitle">Create New Recipe</h1>
            <label className="label-title" htmlFor="title">Title:</label>
            <input className="input-title" name="title" type="text" onChange={handleChange} value={recipeData.title}/>

            {errors.title && <div className="warning-title">
                <ul className="warning-title-message">
                {errors.title === "This field cannot be empty. Please enter a recipe title" && <li className="warning-message">This field cannot be empty. Please enter a recipe title</li>}
                {errors.title === "The title must be under 250 characters" && <li className="warning-message">The title must be under 250 characters</li>}
                </ul>
            </div>}

            {/*--End Title shield*/}

            {/*Summary shield*/}
            <label className="label-summary" htmlFor="summary">Summary:</label>
            <textarea className="input-summary" name="summary" type="text" onChange={handleChange} value={recipeData.summary} />

            {errors.summary && <div className="warning-summary">
                <ul className="warning-summary-message">
                {errors.summary === "This field cannot be empty. Please enter a summary" && <li className="warning-message">This field cannot be empty. Please enter a summary</li>}
                {errors.summar === "The summary must be under 1000 characters" && <li className="warning-message">The summary must be under 1000 characters</li>}
                </ul>
            </div>}

            {/*--End Summary shield*/}

            {/*HealthScore shield*/}
            <label className="label-healthScore" htmlFor="healthScore">Health Score:</label>
            <input className="input-healthScore" name="healthScore" type="number" onChange={handleChange} value={recipeData.healthScore} placeholder="50" min="0" max="100" />

            {errors.healthScore && <div className="warning-healthSocre">
                <ul className="warning-healthScore-message">
                {errors.healthScore === "The healthScore must be between 0 and 100" && <li className="warning-message">The healthScore must be between 0 and 100</li>}
                </ul>
            </div>}

            {/*--End healthScore shield*/}

            {/*Diets shield*/}
            <h3 className="labelDiets">Select recipe´s types of diets</h3>
            <div className="diets-box">
                <div className="columnLeft">
                    
                      {firstDietsHalf.map((diet, index) => (
                        <CheckDiets 
                        key={index}
                        diet={diet.name}
                        handleChange={handleChange}
                        recipeData={recipeData[diet.name]}
                        />
                          ))}         
                </div>       
                <div className="columnRight"> 
                      
                      {secondDietsHalf.map((diet, index) => (
                        <CheckDiets 
                        key={index}
                        diet={diet.name}
                        handleChange={handleChange}
                        recipeData={recipeData[diet.name]}
                        />
                          ))}
                </div>
                </div> 
                {/*<h3 className="dietsQuestion">Do you have more diets?</h3>
                <label className="labelQuestion" htmlFor="otherDiets">Other diets:</label>
                      <input className="input-title" name="otherDiets" type="text" onChange={handleChange} value={recipeData.otherDiets}/>*/}

            {errors.otherDiets && <div className="warning-otherDiets">
                <ul className="warning-otherDiets-message">
                {errors.otherDiets === "You must choose or create at least a diet" && <li className="warning-message">You must choose at least a diet</li>}
                </ul>
                </div>}

            {/*--End Diets shield*/}

            {/*Instructions shield*/}
            <label className="label-summary" htmlFor="instructions">Instructions:</label>
            <textarea className="input-summary" name="instructions" type="text" onChange={handleChange} value={recipeData.instructions} />

            {errors.instructions && <div className="warning-summary">
                <ul className="warning-summary-message">
                {errors.instructions === "This field cannot be empty. Please enter recipe instructions" && <li className="warning-message">This field cannot be empty. Please enter recipe instructions</li>}
                {errors.instructions === "The instructions must be under 1000 characters" && <li className="warning-message">The instructions must be under 1000 characters</li>}
                </ul>
            </div>}

            {/*--End Instructions shield*/}

            {/*Steps shield*/}
            {recipeData.analyzedInstructions[0].steps.map((step) => (
                <Step
                key={step.number}
                id={step.number}
                step={step.step}
                ingredients={step.ingredients}
                handleSubmitDeleteStep={handleSubmitDeleteStep} />
            ))}

            {recipeData.analyzedInstructions[0].steps.length === 0 
            ? <span className="instructionQuestion">You need to add one step instruction for this recipe</span>
            : <span className="instructionQuestion">Do you want to add step {stepNumber} instruction for this recipe?</span>}
    
            <button className="yes-button-addStep" type="button" onClick={handleShowStep}>Yes</button>
            <button className="no-button-addStep" type="button" onClick={() => handleHideStep()}>No</button>

            {errors.analyzedInstructions && <div className="warning-analyzedInstructions">
                <ul className="warning-analyzedInstructions-message">
                {errors.analyzedInstructions === "You need to create at least a step" && <li className="warning-message quetions">You need to create at least a step</li>}
                </ul>
            </div>}

            {showAddStep
            ? <AddStep handleSubmitAddStep={handleSubmitAddStep} stepNumber={stepNumber} handleHideStep={handleHideStep} />
            : <></>}

            {/*--End Step shield*/}

            {/*Image shield*/}
            <span className="uploadImage">Upload an image</span>
            <label className="label-image" htmlFor="image">URL image:</label>
            <input className="input-image" name="image" type="text" onChange={handleChange} value={recipeData.image}/>
            
            {errors.image && <div className="warning-image">
                <ul className="warning-image-message">
                {errors.image === "You need to upload a recipe's image" && <li className="warning-message quetions">You need to upload a recipe's image</li>}
                </ul>
            </div>}
            
            {/*--End image shield*/}

            <button className={!Object.keys(errors).length > 0 ? "submit-button-disabled" : "submit-button"} value="submit" disabled={Object.keys(errors).length > 0}>SUBMIT</button>
        </div> }    
        </form>
    )
};

export default CreateNewRecipe;