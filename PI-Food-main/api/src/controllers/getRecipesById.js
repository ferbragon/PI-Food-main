require('dotenv').config();
const axios = require("axios");
const { API1, API2, API_KEY, API_KEY2 } = process.env;
const { conn } = require("../db.js");
const Recipe = conn.models.Recipe;
const Number = conn.models.Number;
const Diet = conn.models.Diet;

let recipes = [];
let id = 1;

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let errorCount = 0; // Contador de errores

const get100Recipes = async (req, res) => {
  try {
    // Fetch 100 recipes
    while (recipes.length < 100) {
      // Error handling for each recipe
      try {
        let response = await axios(`${API1}${id}${API2}${API_KEY2}`);

        recipes.push(response.data);
        errorCount = 0; // Reestart the error counter in success
      } catch (error) {
        console.log(`Error downloading recipe with id ${id}:`, error.message);
        await Number.create({ id: id });
        errorCount++; // Up the error counter
        
        // Stop if error counter up to 10 consecutive errors
        if (errorCount >= 10) {
          throw new Error("10 consecutive errors occurred while downloading recipes from the API.");
        }
      }
      id++;
      
      // Add a delay after every 27 successful requests
      if (recipes.length % 27 === 0) {
        await delay(60000);
      }
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
    console.log(recipes);

    //Se guardan las recetas para trabajar en el front despues hay que eliminarlas
    await Recipe.bulkCreate(recipes, { ignoreDuplicates: true });
    const allRecipes = await Recipe.findAll();

    //Save each Diet an relation with the recipe//Cuando se elimine hay que cambiar allRecipes por recipes = []
    const dietsRecipes = allRecipes.map((recipe) => {
      if(recipe.vegetarian) recipe.dietTags.push("vegetarian");
      if(recipe.vegan) recipe.dietTags.push("vegan");
      if(recipe.glutenFree) recipe.dietTags.push("gluten free");
      return recipe;
    });

    console.log(dietsRecipes);

    for (const recipe of dietsRecipes) {
      for (const diet of recipe.dietTags) {
        const dietObj = await Diet.findOrCreate({
          where: { name: diet },
          defaults: { name: diet }
        });
        await recipe.addDiet(dietObj[0], { ignoreDuplicates: true });
      }
    };

    const diets = await Diet.findAll();

    console.log(diets);

    

    return res.status(200).json(allRecipes);//Cambiar la base de datos por el array recipes

  } catch (error) {
    console.log("There was an error downloading the data from the API:", error);
  }
};

module.exports = {
  get100Recipes
}



