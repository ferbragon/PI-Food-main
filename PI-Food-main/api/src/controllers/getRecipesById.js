const axios = require("axios");
const { API1, API2, API_KEY } = process.env;

let recipes = [];
let ID = 1;

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const get100Recipes = async () => {
  try {
    // Fetch the first 50 recipes
    while (ID <= 50) {
      let response = await axios(`${API1}${ID}${API2}${API_KEY}`);

      recipes.push(response);
      ID++;
    }

    // Wait for one minute and then fetch the next 50 recipes
    await delay(60000);

    while (ID <= 100) {
      let response = await axios(`${API1}${ID}${API2}${API_KEY}`);

      recipes.push(response);
      ID++;
    }

    recipes = (await Promise.all(recipes))
      .map(response =>
        response.data.map(recipe => {
          return ({
            id: recipe.id,
            vegetarian: recipe.vegetarian,
            vegan: recipe.vegan,
            glutenFree: recipe.glutenFree,
            title: recipe.title,
            image: recipe.image,
            summary: recipe.summary,
            diets: recipe.diets,
            healtScore: recipe.healthScore,
            instructions: recipe.instructions,
            analyzedInstructions: recipe.analyzedInstructions
          })
        })
      )

  } catch (error) {
    console.log("There was an error downloading the data from the API:", error);
  }
};

module.exports = {
  get100Recipes
}

