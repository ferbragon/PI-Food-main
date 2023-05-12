import React from "react";
import SearchBar from "./SearchBar";
import APIRecipes from "./APIRecipes";
import MyRecipes from "./MyRecipes";
import "../stylesheets/Home.css";

const Home = () => {
    return(
        <div className="home">
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