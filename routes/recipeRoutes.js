import express from "express";
import { authorized, checkRole } from "../middlewares/authorization.js";
import { addRecipe, updateRecipe, deleteRecipe, getAllRecipes,getOneRecipe } from "../controllers/recipeController.js";

const recipeRouter = express.Router();

recipeRouter.post('/add', addRecipe);
recipeRouter.put('/edit/:id',updateRecipe);
recipeRouter.delete("/delete/:id", deleteRecipe);
recipeRouter.get('/getall', getAllRecipes);
recipeRouter.get('/getone/:id', getOneRecipe);

export default recipeRouter;