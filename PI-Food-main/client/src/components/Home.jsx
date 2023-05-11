import React from "react";
import SearchBar from "./SearchBar";
import APIRecipes from "./APIRecipes";
import MyRecipes from "./MyRecipes";

const Home = () => {
    return(
        <div className="home">
            <h1>Este es el home</h1>
            <div className="box-searchBar">
                <SearchBar />
            </div>
            <div className="box-recipes">
                <MyRecipes />
                <APIRecipes />
            </div>
        </div>
    )
};

export default Home;