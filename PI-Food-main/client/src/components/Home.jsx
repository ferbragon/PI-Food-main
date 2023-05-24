import React, { useState } from "react";
import SearchBar from "./SearchBar";
import APIRecipes from "./APIRecipes";
import MyRecipes from "./MyRecipes";
import "../stylesheets/Home.css";
import RecipeDetail from "./RecipeDetail";
import CreateNewRecipe from "./CreateNewRecipe";

const Home = () => {
    //State to show CreateNewRecipe PopUp
    const [ createNewRecipe, setCreateNewRecipe ] = useState(false);

    //State to show RecipeDetail PopUp
    const [ recipeDetailOpen, setRecipeDetailOpen ] = useState(false);
    const [ selectedRecipeId, setSelectedRecipeId ] = useState(null);
  
    //Handles RecipeDetail
    const openRecipeDetail = (id) => {
      setSelectedRecipeId(id);
      setRecipeDetailOpen(true);
    };
  
    const closeRecipeDetail = () => {
      setRecipeDetailOpen(false);
      setSelectedRecipeId(null);
    };

    //Handles CreateNEwRecipe
    const openCreateNewRecipe = () => {
        setCreateNewRecipe(true);
    };

    const closeCreateNewRecipe = () => {
        setCreateNewRecipe(false);
    }

    return(
        <div className="home">
            <div className={recipeDetailOpen ? "overlay" : ""}></div>
            <div className={createNewRecipe ? "overlay" : ""}></div>
            <div className="box-searchBar">
                <SearchBar />
            </div>
            <div className="box-recipes">
                <MyRecipes openRecipeDetail={openRecipeDetail} openCreateNewRecipe={openCreateNewRecipe} />
                <APIRecipes openRecipeDetail={openRecipeDetail}/>
            </div>
            {recipeDetailOpen && <RecipeDetail closeRecipeDetail={closeRecipeDetail} selectedRecipeId={selectedRecipeId}/>}
            {createNewRecipe && <CreateNewRecipe closeCreateNewRecipe={closeCreateNewRecipe}/>}
        </div>
    )
};

export default Home;