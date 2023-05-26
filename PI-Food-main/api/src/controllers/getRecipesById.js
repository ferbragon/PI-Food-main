require('dotenv').config();
const axios = require("axios");
const { API1, API2, API_KEY, API_KEY2, API3100RECIPES, API_KEY13, API_KEY23, API3100RECIPES2 } = process.env;
const { conn } = require("../db.js");
const Diet = conn.models.Diet;
const Recipe = conn.models.Recipe;


const get100Recipes = async (req, res) => {
  let recipes = [];
  try {
    // Fetch 100 recipes
      try {
        const response = await axios(`${API3100RECIPES}${API_KEY23}${API3100RECIPES2}`);
        recipes = response.data.results;
      } catch (error) {
        return res.status(500).json({ message: error.message });
    };
  
    
    recipes = recipes.map(recipe => {
      return ({
        id: recipe.id,
        vegetarian: recipe.vegetarian,
        vegan: recipe.vegan,
        glutenFree: recipe.glutenFree,
        title: recipe.title,
        image: recipe.image,
        summary: recipe.summary,
        dietTags: recipe.diets,
        healthScore: recipe.healthScore,
        instructions: recipe.instructions || 'No instructions available.',
        analyzedInstructions: recipe.analyzedInstructions
      })
    })

    console.log("This the recipe clean", recipes);

    //Save each Diet an relation with the recipe//Cuando se elimine hay que cambiar allRecipes por recipes = []
    const dietsRecipes = recipes.map((recipe) => {
      if(recipe.vegetarian && recipe.dietTags.indexOf("vegetarian") === -1) recipe.dietTags.push("vegetarian");
      if(recipe.vegan && recipe.dietTags.indexOf("vegan") === -1) recipe.dietTags.push("vegan");
      if(recipe.glutenFree && recipe.dietTags.indexOf("gluten free") === -1) recipe.dietTags.push("gluten free");
      return recipe;
    });

    console.log("The diets", dietsRecipes);

    for (const recipe of dietsRecipes) {
      for (const diet of recipe.dietTags) {
        const dietObj = await Diet.findOrCreate({
          where: { name: diet },
          defaults: { name: diet }
        });
      }
    }

    const diets = await Diet.findAll();

    return res.status(200).json(recipes);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  get100Recipes
}



