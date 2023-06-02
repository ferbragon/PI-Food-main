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

router.get("/recipes/database", getDataBaseRecipes);

router.get("/recipes", get100Recipes);

router.get("/recipes/search", getRecipesByName);

router.get("/recipes/:idRecipe", getRecipeDetailById);

router.post("/recipes", postRecipe);

router.get("/diets", getDiets);



module.exports = router;
