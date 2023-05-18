import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Recipe from "../components/Recipe";
import "../stylesheets/MyRecipes.css";

const MyRecipes = () => {
    const recipesInDataBase = useSelector(state => state.dbRecipes);

    useEffect(() => {

    }, [recipesInDataBase]);

    return(
        <div className="myRecipes">
            <h1>My Recipes</h1>
            <div className="recipesFlex">
            <NavLink to="/createNewRecipe">Create New Recipe</NavLink>
            {
                recipesInDataBase && recipesInDataBase.length > 0 && recipesInDataBase[0].message
                ? <p>{recipesInDataBase[0].message}</p>
                : recipesInDataBase && recipesInDataBase.map((recipe) => (
                    <Recipe
                        key={recipe.id}
                        id={recipe.id}
                        title={recipe.title}
                        image={recipe.image}
                        vegan={recipe.vegan}
                        vegetarian={recipe.vegetarian}
                        glutenFree={recipe.glutenFree}
                        dietTags={recipe.dietTags}
                    />))
            }
            </div>
        </div>
    )
};

export default MyRecipes;