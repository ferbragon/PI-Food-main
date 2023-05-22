require('dotenv').config();
const axios = require("axios");
const { API1, API2, API_KEY, API_KEY2 } = process.env;
const { conn } = require("../db.js");
const Recipe = conn.models.Recipe;

const getRecipeDetailById = async (req, res) => {
  try {
    const { idRecipe } = req.params;
    let id = idRecipe;
    if(id[0] === ":") id = idRecipe.slice(1);
    
    const recipeInDb = await Recipe.findByPk(parseInt(id));

    if (recipeInDb) return res.status(200).json(recipeInDb);
    const { data } = await axios(`${API1}${idRecipe}${API2}${API_KEY2}`);

    if (!data) throw Error("Recipe not found");

    const recipe = {
      id: data.id,
      vegetarian: data.vegetarian,
      vegan: data.vegan,
      glutenFree: data.glutenFree,
      title: data.title,
      image: data.image,
      summary: data.summary,
      dietTags: data.diets,
      healthScore: data.healthScore,
      instructions: data.instructions || 'No instructions available.',
      analyzedInstructions: data.analyzedInstructions
    };

    return res.status(200).json(recipe);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, stack: error.stack });
  }
};

module.exports = {
  getRecipeDetailById
};

