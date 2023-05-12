import { useNavigate } from "react-router-dom";
import "../stylesheets/LandingPage.css";
import React from "react";

const LandingPage = ({ handleRecipes })=> {

    const navigate = useNavigate();

    const handleEnterButton = () =>{
        handleRecipes();
        navigate("/home");
    }

    return(
        <div className="landingPage">
            <h1>Landing Page</h1>
            <button onClick={handleEnterButton} className="landingPage-button">
                Enter
            </button>
        </div>
    )
};

export default LandingPage;