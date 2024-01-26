import express from "express";
import { getAllRecipe, getById, getCategorized, getSearched, postRecipe } from "../controllers/recipe-controller";
import { authenticateToken } from "../controllers/user-controller";

const recipeRouter=express.Router();
recipeRouter.get('/', getAllRecipe);
recipeRouter.get('/category',getCategorized);
recipeRouter.get('/search',authenticateToken,getSearched);
recipeRouter.get('/getId',authenticateToken,getById);
recipeRouter.post('/',postRecipe);

export default recipeRouter;