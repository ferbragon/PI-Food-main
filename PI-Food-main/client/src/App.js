import './App.css';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import React from 'react';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import RecipeDetail from "./components/RecipeDetail";
import CreateNewRecipe from './components/CreateNewRecipe';
import { allDiets, fetchAllRecipes, fetchDataBaseRecipes } from './redux/actions';


function App() {
  const dispatch = useDispatch();

  const handleRecipes = async () =>{
      await dispatch(fetchAllRecipes());
      await dispatch(fetchDataBaseRecipes());
      await dispatch(allDiets());
  };


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage handleRecipes={handleRecipes} />} />
        <Route path="/home" element={<Home />} />
        <Route path='/:id' element={<RecipeDetail />} />
        <Route path="/createNewRecipe" element={<CreateNewRecipe />} />
      </Routes>
    </div>
  );
};

export default App;
