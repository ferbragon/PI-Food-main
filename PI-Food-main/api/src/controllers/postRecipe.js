const { conn } = require("../db.js");
const { Sequelize } = require("sequelize");
const Recipe = conn.models.Recipe;
const Number = conn.models.Number;

const postRecipe = async(req, res) => {
    try{
        const { vegetarian, vegan, glutenFree, title, image, summary, dietTags, healthScore, instructions, analyzedInstructions } = req.body;
        
        if(!title || !instructions || !image){
            throw Error("Title, instructions and image are required!");
        };
        const firstNumber = await Number.findOne({
            order: [['id', 'ASC']]
          });
          
        const newRecipe = await Recipe.create({id: firstNumber.id , vegetarian, vegan, glutenFree, title, image, summary, dietTags, healthScore, instructions, analyzedInstructions})

        await firstNumber.destroy();
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