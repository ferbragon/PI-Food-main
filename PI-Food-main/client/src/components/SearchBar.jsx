import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { fetchByName, orderRecipes, filterRecipes } from "../redux/actions";

const SearchBar = () => {

    //Global State
    const diets = useSelector(state => state.diets);

    //Action call for recipe name
    const dispatch = useDispatch();

    const onSearch = async (title) =>{
    await dispatch(fetchByName(title));
    };

    //Order and Filter
    const handleOrder = (event) => {
        dispatch(orderRecipes(event.target.value));
    };

    const handleFilter = (event) => {
        dispatch(filterRecipes(event.target.value));
    };

    //Capitalize first letter 
    const capitalizeFirstLetter = (string) =>{
        let devide = string.split(" ");
        let upperCase = devide.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
        let join = upperCase.join(" ");
        return join;
    };

    return(
        <div>
            <h1>SearchBar</h1>
            <select onChange={handleOrder} >
                <option className="option" value="A">Ascendent</option>
                <option className="option" value="D">Descendent</option>
                <option className="option" value="a">A to Z</option>
                <option className="option" value="z">Z to A</option>
                <option className="option" value="AHS">Ascendent Health Score</option>
                <option className="option" value="DHS">Descendent Health Score</option>
            </select>
            <select onChange={handleFilter}>
                <option className="option" value="All">All Recipes</option>
                <option className="option" value="MyRecipes">My recipes</option>
                <option className="option" value="Spoonacular">Spoonacular recipes</option>
                {diets.map((diet) => {
                    return(
                        <option className="option" value={diet.name} key={diet.id}>{capitalizeFirstLetter(diet.name)}</option>
                    )
                })}
        </select>
            <Search onSearch={onSearch} />
        </div>
    )
};

export default SearchBar;