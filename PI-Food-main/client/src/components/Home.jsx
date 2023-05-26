import React, { useState } from "react";
import SearchBar from "./SearchBar";
import APIRecipes from "./APIRecipes";
import MyRecipes from "./MyRecipes";
import "../stylesheets/Home.css";
import RecipeDetail from "./RecipeDetail";
import CreateNewRecipe from "./CreateNewRecipe";
import Errors from "./Errors";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {

    //State to show CreateNewRecipe PopUp
    const [ createNewRecipe, setCreateNewRecipe ] = useState(false);

    //State to show RecipeDetail PopUp
    const [ recipeDetailOpen, setRecipeDetailOpen ] = useState(false);
    const [ selectedRecipeId, setSelectedRecipeId ] = useState(null);

    //State to show errors
    const [errors, setErrors] = useState(false);

    //Local state for searchMode
    const [searchMode, setSearchMode] = useState(false);
    //Global state
    const error = useSelector(state => state.error);

    //handles for searchMode

    const handleSearchMode = () =>{
        setSearchMode(!searchMode);
    }
    
    useEffect(() => {
        if (error) {
          setErrors(true);
        }
      }, [error]);

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
    };

    //HandleCloseErrors
    const closeErrors = () => {
        if(recipeDetailOpen){
            setErrors(false);
            closeRecipeDetail();
        };
        if(createNewRecipe){
            setErrors(false);
            closeCreateNewRecipe();
        }
    }

    return(
        <div className="home">
            <div onClick={closeRecipeDetail} className={recipeDetailOpen ? "overlay" : ""}></div>
            <div onClick={closeCreateNewRecipe} className={createNewRecipe ? "overlay" : ""}></div>
            <div onClick={closeErrors} className={errors ? "overlayErrors" : ""}></div>
            <div className="box-searchBar">
                <SearchBar />
            </div>
            <div className="box-recipes">
                <MyRecipes searchMode={searchMode} openRecipeDetail={openRecipeDetail} openCreateNewRecipe={openCreateNewRecipe} />
                <APIRecipes searchMode={searchMode} handleSearchMode={handleSearchMode} openRecipeDetail={openRecipeDetail}/>
            </div>
            {recipeDetailOpen && <RecipeDetail closeRecipeDetail={closeRecipeDetail} selectedRecipeId={selectedRecipeId}/>}
            {createNewRecipe && <CreateNewRecipe closeCreateNewRecipe={closeCreateNewRecipe}/>}
            {errors && <Errors error={error} closeErrors={closeErrors}/>}
        </div>
    )
};

export default Home;