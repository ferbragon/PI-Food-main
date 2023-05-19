import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import StepByStep from "./StepByStep";
//import "../stylesheets/RecipeDetail.css";
import axios from "axios";


const RecipeDetail = () => {

    const { id } = useParams();

    const [recipe, setRecipe] = useState({});
    const [diets, setDiets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios(`http://localhost:3001/recipes/${id}`);
                setRecipe(data);
            } catch (error) {
                console.error(error);
            }
        }
    
        fetchData();
    }, [id]);

    useEffect(() => {
        let newDiets = [];
        if(recipe.vegetarian && recipe.dietTags.indexOf("vegetarian") === -1) newDiets.push("vegetarian");
        if(recipe.vegan && recipe.dietTags.indexOf("vegan") === -1) newDiets.push("vegan");
        if(recipe.glutenFree && recipe.dietTags.indexOf("gluten free") === -1) newDiets.push("gluten free");
        if(recipe.dietTags) newDiets = [...newDiets,...recipe.dietTags];

        setDiets(newDiets);
    }, [recipe]);

    //Capitalize first letter 
    const capitalizeFirstLetter = (string) =>{
        let devide = string.split(" ");
        let upperCase = devide.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
        let join = upperCase.join(" ");
        return join;
    };

    console.log(recipe.analyzedInstructions);

    return(
        <div className="recipeDetail">
            <button className="button-detail-close">
              <NavLink to="/home">X</NavLink>
            </button>
            <img src={recipe.image} alt={recipe.title}/>
            <h1>Detail Recipe</h1>
            <h2>{recipe.id}</h2>
            <h1>{recipe.title}</h1>
            <h5>Health Score: {recipe.healthScore}</h5>
            {/*<div dangerouslySetInnerHTML={{ __html: recipe.summary }} />*/}
            <ul>
                {diets.map((diet, index) => (
                    <li key={index}>{capitalizeFirstLetter(diet)}</li>
                ))}
            </ul>
            <span>Instructions:</span>{recipe.instructions}
            {recipe.analyzedInstructions && <StepByStep stepByStep={recipe.analyzedInstructions}/>}
        </div>
    )
};

export default RecipeDetail;
