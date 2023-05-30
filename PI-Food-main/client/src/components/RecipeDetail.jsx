import { useState, useEffect } from "react";
import StepByStep from "./StepByStep";
import "../stylesheets/RecipeDetail.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { detailErrors } from "../redux/actions";
import Loading from "./Loading";


const RecipeDetail = ({ closeRecipeDetail, selectedRecipeId }) => {

    const dispatch = useDispatch();

    const [recipe, setRecipe] = useState({});
    const [diets, setDiets] = useState([]);
    //Loading
    const [loading, setLoading] = useState(true);
    //Errors
    const [error, setError] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios(`http://localhost:3001/recipes/${selectedRecipeId}`);
                setRecipe(data);
            } catch (error) {
                setError(true);
                dispatch(detailErrors(error));
            }
        }
        setError(false);
        fetchData();
    }, [dispatch, selectedRecipeId]);

    useEffect(() => {
        let newDiets = [];
        if(recipe.vegetarian && recipe.dietTags.indexOf("vegetarian") === -1) newDiets.push("vegetarian");
        if(recipe.vegan && recipe.dietTags.indexOf("vegan") === -1) newDiets.push("vegan");
        if(recipe.glutenFree && recipe.dietTags.indexOf("gluten free") === -1) newDiets.push("gluten free");
        if(recipe.dietTags) newDiets = [...newDiets,...recipe.dietTags];

        setDiets(newDiets);
    }, [recipe]);

    useEffect(() =>{
        if(Object.keys(recipe).length !== 0 && !error){
            setTimeout(()=>{
                setLoading(false);
            },600);
        };
    },[error, recipe, recipe.image])

    //Capitalize first letter 
    const capitalizeFirstLetter = (string) =>{
        let devide = string.split(" ");
        let upperCase = devide.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
        let join = upperCase.join(" ");
        return join;
    };

    const handleImageLoad = () => {
        setLoading(false);
      };


    return(
        <div className="recipeDetail">
            <button className="closeButtonDetail" onClick={closeRecipeDetail}>
              X
            </button>
            {loading ? <div className="loaderDetail">
                            <Loading />
                        </div> 
                        
                : <div>
                  <div className="gradientImage">
                    <img className="imageDetail" src={recipe.image} alt={recipe.title} onLoad={handleImageLoad}/>
                  </div>
                  <div className="recipeDetailFlex">
                        <h1 className="recipeID">{recipe.id < 0 ? "DB" + recipe.id * -1 : recipe.id}</h1>
                        <h1 className="recipeDetailTitle">{recipe.title}</h1>
                        <h3 className="recipeDetalHS">Health Score: {recipe.healthScore}</h3>
                        {/*<h3 className="recipeDetailSummary">Summary:</h3>
                        <div className="recipeSummary" dangerouslySetInnerHTML={{ __html: recipe.summary }} />*/}
                        <ul className="recipeDetailsDiets">
                            Diets:
                            {diets.length === 0 ? " No diets to show for this recipe" : diets.map((diet, index) => (
                                <li key={index}>{capitalizeFirstLetter(diet)}</li>
                            ))}
                        </ul>
                        <h3 className="recipeDetailInstructions">Instructions:</h3>
                        <p className="recipeInstructions">{recipe.instructions}</p>
                        <h3 className="recipeDetailSteps">Analyzed Instructions:</h3>
                        {recipe.analyzedInstructions && <StepByStep className="recipeDetailStepByStep" stepByStep={recipe.analyzedInstructions}/>}
                    </div>
                </div>
                    }
            
        </div>
    )
};

export default RecipeDetail;
