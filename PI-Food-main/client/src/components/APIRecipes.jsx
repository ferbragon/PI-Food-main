import { useState } from "react";
import { useSelector } from "react-redux";

//Paginado
const APIRecipes = () => {

    //Global state
    const recipes = useSelector(state => state.allRecipes)

    //Local state
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 9; // Tamaño de página
    const totalData = 100; // Datos totales
    const totalPages = Math.floor(totalData/pageSize);

    // Calcula los datos a mostrar en la página actual
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalData);
    const currentPageData = [...Array(endIndex - startIndex)].map(
        (_, index) => `Dato ${startIndex + index + 1}`
    );

    // Función para cambiar de página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return(
        <div className="apiRecipes">
            <h1>API Recipes</h1>
                <ul>
                    {currentPageData.map((data) => (
                    <li key={data}>{data}</li>
                    ))}
                </ul>
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