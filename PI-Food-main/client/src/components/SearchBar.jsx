import Search from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { fetchByName, orderRecipes, filterRecipes,login  } from "../redux/actions";
import SwitchButton from "./SwitchButton";
import "../stylesheets/SearchBar.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Global State
    const diets = useSelector(state => state.diets);
    /*const error = useSelector(state => state => state.error);

    if(error){
        navigate("/errors");
    }*/

    //Action call for recipe name

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

    //SwitcButton

    const enter = useSelector((state) => state.login);

    useEffect(() => {
        if (!enter) {
            setTimeout(() => {
                navigate("/");
            }, 1300)
        }
    }, [enter, navigate]);

     const handleEnterButton = () => {
        if(enter){
            dispatch(login(!enter));
            setTimeout(() => {
                navigate("/");
            }, 2200);
    }
}

    return(
        <div className="searchbar">
            <h2 className="logo">Let's search recipes!</h2>
            <select className="searchSelect" onChange={handleOrder} >
                <option className="searchOption" value="A">Ascendent</option>
                <option className="searchOption" value="D">Descendent</option>
                <option className="searchOption" value="a">A to Z</option>
                <option className="searchOption" value="z">Z to A</option>
                <option className="searchOption" value="AHS">Ascendent Health Score</option>
                <option className="searchOption" value="DHS">Descendent Health Score</option>
            </select>
            <select className="searchSelect" onChange={handleFilter}>
                <option className="searchOption" value="All">All Recipes</option>
                <option className="searchOption" value="MyRecipes">My recipes</option>
                <option className="searchOption" value="Spoonacular">Spoonacular recipes</option>
                {diets.map((diet) => {
                    return(
                        <option className="searchOption" value={diet.name} key={diet.id}>{capitalizeFirstLetter(diet.name)}</option>
                    )
                })}
        </select>
            <Search onSearch={onSearch} />
            <SwitchButton handleEnterButton={handleEnterButton}/>
        </div>
    )
};

export default SearchBar;