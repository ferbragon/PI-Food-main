const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const { get100Recipes } = require("../controllers/getRecipesById.js");
const { getRecipeDetailById } = require("../controllers/getRecipeDetailById.js");
const { getRecipesByName } = require("../controllers/getRecipesByName.js");
const { postRecipe } = require("../controllers/postRecipe.js");
const { getDiets } = require("../controllers/getDiets.js");
const { getDataBaseRecipes } = require("../controllers/getDataBaseRecipes.js");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//ruta para trabajar con la base de datos mientras se diseña el front
const { conn } = require("../db.js");
const Recipe = conn.models.Recipe;
router.get("/recipes/front", async (req, res) => {
    try{
        const allRecipes = await Recipe.findAll();
        return res.status(200).json(allRecipes);
    }catch(error){
        return res.status(500).json({message: error.message});
    }
});

//

router.get("/recipes/database", getDataBaseRecipes);

router.get("/recipes", get100Recipes);

router.get("/recipes/search", getRecipesByName);

router.get("/recipes/:idRecipe", getRecipeDetailById);

router.post("/recipes", postRecipe);

router.get("/diets", getDiets);



module.exports = router;
