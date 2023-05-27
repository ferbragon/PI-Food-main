import { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink, /*useNavigate*/ } from "react-router-dom";
import Recipe from "../components/Recipe";
import "../stylesheets/MyRecipes.css";


const MyRecipes = ({ openRecipeDetail, openCreateNewRecipe, searchMode }) => {


    const recipesInDataBase = useSelector(state => state.dbRecipes);
    
    

    useEffect(() => {

    }, [recipesInDataBase]);

    return(
        <div className={!searchMode ? "myRecipes" : "myRecipesSearchMode"}>
             <h1 className="titleMyRecipes">My Recipes</h1>
            <div className="recipesFlex">
            <NavLink className="createNewRecipe" onClick={openCreateNewRecipe}>+</NavLink>
                {recipesInDataBase &&
                    recipesInDataBase.map((recipe) => (
                        <Recipe
                            key={recipe.id}
                            db={recipe.db}
                            id={recipe.id}
                            title={recipe.title}
                            image={recipe.image}
                            vegan={recipe.vegan}
                            vegetarian={recipe.vegetarian}
                            glutenFree={recipe.glutenFree}
                            dietTags={recipe.dietTags}
                            openRecipeDetail={openRecipeDetail}
                        />
                    ))
                }
            </div>
        </div>
    )
};

export default MyRecipes;