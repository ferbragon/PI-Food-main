import { NavLink } from "react-router-dom";
import "../stylesheets/Recipe.css";

const Recipe = ({ id , vegetarian, vegan, glutenFree, title, image, dietTags }) =>{
    let diets = [];
        if(vegetarian && dietTags.indexOf("vegetarian") === -1) diets.push("vegetarian");
        if(vegan && dietTags.indexOf("vegan") === -1) diets.push("vegan");
        if(glutenFree && dietTags.indexOf("gluten free") === -1) diets.push("gluten free");
        if(dietTags) diets = [...diets,...dietTags];
    return(
        <div className="recipe" diets={diets} key={id}>
            <NavLink to={`/:${id}`}>
            <div className="corner-ribbon">
            <img className="recipe-img" src={image} alt={title} />
            <div className="diets">
                {diets.length === 0 
                    ? "View Detail" 
                    : <ul>
                        {diets.map((diet, index) => (
                        <li key={index}>{diet}</li>
                        ))}
                    </ul>
                }
                </div>
                <div>
                    <div>
                        <div></div>
                    </div>
                </div>
            </div>
            </NavLink>
            <p>{title}</p>
        </div>
    )
}

export default Recipe;