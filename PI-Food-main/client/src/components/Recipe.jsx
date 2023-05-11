import { NavLink } from "react-router-dom";

const Recipe = ({ id , vegetarian, vegan, glutenFree, title, image, dietTags }) =>{
    return(
        <div className="recipe">
            <NavLink>
                <img className="recipe-img" src={image} alt={`Picture of ${title}`} />
            </NavLink>
            <p>{title}</p>
        </div>
    )
}

export default Recipe;