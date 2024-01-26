import express from 'express';
import { getAllUser, signup, login, logout, getUser_Id } from '../controllers/user-controller';

const router=express.Router();
router.get('/',getAllUser);
router.post('/signup',signup);
router.post('/login',login);
router.get('/logout',logout);
router.get('/getUser_Id',getUser_Id);
export default router;