import { NavLink } from "react-router-dom";
import "../stylesheets/Recipe.css";

const Recipe = ({ id , vegetarian, vegan, glutenFree, title, image, dietTags, db, openRecipeDetail }) =>{

    let diets = [...dietTags];
        if(vegetarian && dietTags.indexOf("vegetarian") === -1) diets.push("vegetarian");
        if(vegan && dietTags.indexOf("vegan") === -1) diets.push("vegan");
        if(glutenFree && dietTags.indexOf("gluten free") === -1) diets.push("gluten free");
    return(
        <div className="recipe" diets={diets} key={id}>
            <div className={db ? "corner-ribbon" : "corner-ribbon-api"}>
            <img className="recipe-img" src={image} alt={title} />
            <NavLink className="navlink" onClick={() => openRecipeDetail(id)}>
            <div className="diets">
                {diets.length === 0 
                    ? "View Detail" 
                    : <ul className="dietList">
                        {diets.map((diet, index) => (
                        <li className="diet" key={index}>{diet}</li>
                        ))}
                    </ul>
                }
                </div>
            </NavLink>
                <div>
                    <div>
                        <div></div>
                    </div>
                </div>
            </div>
            <p className="title">{title}</p>
        </div>
    )
}

export default Recipe;