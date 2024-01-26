import express from 'express';
import { addToFavorites, checkFavorites, getFavorites, removeFromFavorites } from '../controllers/favorites-controller';
import { authenticateToken } from "../controllers/user-controller";

const favRouter=express.Router();
favRouter.get('/',getFavorites);
favRouter.post('/add',addToFavorites);
favRouter.delete('/remove',removeFromFavorites);
favRouter.get('/check',checkFavorites);
export default favRouter;