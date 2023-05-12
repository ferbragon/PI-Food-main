import { NavLink } from "react-router-dom";
import "../stylesheets/Recipe.css";

const Recipe = ({ id , vegetarian, vegan, glutenFree, title, image, dietTags }) =>{
    return(
        <div className="recipe">
            <NavLink>
                <div className="label-1 left">Pescatarian</div>
                <img className="recipe-img" src={image} alt={title} />
            </NavLink>
            <p>{title}</p>
        </div>
    )
}

export default Recipe;