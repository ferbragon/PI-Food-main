import React, { useState } from "react";
import "../stylesheets/StepByStep.css";

const StepByStep = ({ stepByStep }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    if (currentPage < stepByStep[0]?.steps.length - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  console.log("Esta es la data que se recibe en StepByStep", stepByStep);

  if (!stepByStep[0]) {
    return <div className="stepByStep">No steps available for this recipe</div>;
  }

  const currentStep = stepByStep[0].steps[currentPage];

  return (
    <div className="stepByStep">
      <div className="step">
        <h3 className="stepByStepStep">Step: {currentStep.number}</h3>
        <p className="stepByStepCurrentStep">{currentStep.step}</p>
        <h3 className="stepByStepIngredients">Ingredients</h3>
        {!currentStep.ingredients ? (
          <div>No ingredients available for this step</div>
        ) : (
          <ul className="ingredients">
            {!currentStep.ingredients ? <div>This step don't have ingredients</div>
            : currentStep.ingredients.map((ingredient, index) => (
              <li className="ingredient" key={index}>
                - {ingredient.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="paginationStepByStep">
        <button className="previousStep" onClick={handlePreviousPage} disabled={currentPage === 0}>
        &lt;
        </button>
        {/*<span className="currentPageStep">{currentPage + 1}</span>*/}
        <button
          className="nextStep"
          onClick={handleNextPage}
          disabled={currentPage === stepByStep[0]?.steps.length - 1}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default StepByStep;



