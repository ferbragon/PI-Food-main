import { useState } from "react";
import { useSelector } from "react-redux";
import Recipe from "../components/Recipe";
import "../stylesheets/APIRecipes.css";

//Paginado
const APIRecipes = () => {

    //Global state
    const recipes = useSelector(state => state.allRecipes);

    //Local state
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12; // Page size
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

    return(
        <div className="apiRecipes">
            <h1>API Recipes</h1>
                <div className="recipesGrid">
                    {currentPageData.map((recipe) => (
                        <Recipe
                            key={recipe.id}
                            id={recipe.id}
                            title={recipe.title}
                            image={recipe.image}
                        />
                    ))}
                </div>
            <div>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Prev
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === Math.ceil(totalData / pageSize)}>
                    Next
                </button>
            </div>
        </div>
    )
};

export default APIRecipes;