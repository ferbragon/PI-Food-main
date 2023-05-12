import './App.css';
import { Routes, Route } from "react-router-dom";
import { useDispatch } from 'react-redux';
import React from 'react';
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import { fetchAllRecipes } from './redux/actions';

function App() {

  const dispatch = useDispatch();

  const handleRecipes = async () =>{
   await dispatch(fetchAllRecipes());
  };


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage handleRecipes={handleRecipes} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
