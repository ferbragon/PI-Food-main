const { conn } = require("../db.js");
const Recipe = conn.models.Recipe;

const getDataBaseRecipes = async(req, res) => {
    try{
        const allRecipes = await Recipe.findAll();
        return res.status(200).json(allRecipes);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

module.exports = {
    getDataBaseRecipes
};