const { conn } = require("../db.js");
const Diet = conn.models.Diet;

const getDiets = async(req, res) => {
    try{
        const diets = await Diet.findAll();
        return res.status(200).json(diets);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
};

module.exports = {
    getDiets
};

