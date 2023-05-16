require('dotenv').config();
const { Op } = require("sequelize");
const axios = require("axios");
const { API_TITLE, API_TITLE2, API_KEY, API_KEY2, NUMBER_OF_RECIPES } = process.env;
const { conn } = require("../db.js");
const Recipe = conn.models.Recipe;


const getRecipesByName = async(req, res) => {
    try{
        const { name } = req.query;
        console.log(name);
        let match = name.toLowerCase();
        match = match.trim();
        const searchTerms = match.split(" ");

        // Busca en la base de datos
        const recipesFromDB = await Recipe.findAll({
            where: {
                title: {
                    [Op.or]: searchTerms.map(term => ({ [Op.iLike]: `%${term}%` }))
                }
            }
        });

        // Busca en la API
        const { data } = await axios(`${API_TITLE}${match}&${NUMBER_OF_RECIPES}${API_TITLE2}${API_KEY2}`);

        const recipesFromAPI = data.results.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                image: recipe.image,
            };
        });

        // Combina los resultados
        const combinedRecipes = [...recipesFromDB, ...recipesFromAPI];
        const uniqueRecipes = combinedRecipes.filter((recipe, index) => {
            const firstIndex = combinedRecipes.findIndex(item => item.id === recipe.id);
            return firstIndex === index;
        });

        return res.status(200).json({recipesResults: uniqueRecipes, moreData: data.totalResults})

    } catch(error){
        return res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getRecipesByName
}