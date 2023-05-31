const { conn } = require("../db.js");
const { Sequelize, Op } = require("sequelize");
const Recipe = conn.models.Recipe;
const Diet = conn.models.Diet;

const postRecipe = async(req, res) => {
    try{
        const { vegetarian, vegan, glutenFree, title, image, summary, dietTags, healthScore, instructions, analyzedInstructions } = req.body;
        
        if(!title || !instructions || !image){
            throw Error("Title, instructions and image are required!");
        };

        const maxNegativeId = await Recipe.max('id', {
            where: {
              id: { [Op.lt]: 0 } //Filer negative numbers
            }
          });
          
          let id = maxNegativeId - 1 || -1; //Rest 1 or create id -1 if database arenot data yet
        
          
        const newRecipe = await Recipe.create({id, vegetarian, vegan, glutenFree, title, image, summary, dietTags, healthScore, instructions, analyzedInstructions})
        
        const dietsRecipe = [...newRecipe.dietTags];
            if(newRecipe.vegetarian) dietsRecipe.push("vegetarian");
            if(newRecipe.vegan) dietsRecipe.push("vegan");
            if(newRecipe.glutenFree) dietsRecipe.push("gluten free");

        for (const diet of dietsRecipe) {
            const dietObj = await Diet.findOrCreate({
              where: { name: diet },
              defaults: { name: diet }
            });
            await newRecipe.addDiet(dietObj[0], { through: "diets_recipes" });
          }

        return res.status(200).json(newRecipe)
    }catch(error){
        if (error instanceof Sequelize.UniqueConstraintError) {
            return res.status(400).json({ message: 'The recipe already exists.' });
        }
        return res.status(400).json({ message: error.message });
    }
};


module.exports = {
    postRecipe
};