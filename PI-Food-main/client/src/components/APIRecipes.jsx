import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Recipe from "../components/Recipe";
import "../stylesheets/APIRecipes.css";
import Loading from "./Loading";

//Pages
const APIRecipes = ({ openRecipeDetail }) => {
    //Global state
    const recipes = useSelector(state => state.showRecipes);

    //Local state
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9; // Page size
    const totalData = recipes.length; // All recipes
    const totalPages = Math.ceil(totalData / pageSize);

    // Data in actual page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalData);
    const currentPageData = recipes.slice(startIndex, endIndex);

    // Change page function
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
          }, 180000);
    }, []);

    return (
        <div className="apiRecipes">
            <h1 className="titleApiRecipes">API Recipes</h1>
            {loading ? (
                <Loading />
            ) : (
                <div className="recipesGrid">
                    {currentPageData.map((recipe) => (
                        <Recipe
                            key={recipe.id}
                            id={recipe.id}
                            db={recipe.db}
                            title={recipe.title}
                            image={recipe.image}
                            vegan={recipe.vegan}
                            vegetarian={recipe.vegetarian}
                            glutenFree={recipe.glutenFree}
                            dietTags={recipe.dietTags}
                            openRecipeDetail={openRecipeDetail}
                        />
                    ))}
                </div>
            )}
            <div className="pages">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Prev
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(totalData / pageSize)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default APIRecipes;