import express  from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import recipeRouter from "./routes/recipe-routes.js";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import favRouter from "./routes/favorites-route.js";
import fileUpload from 'express-fileupload';
dotenv.config()

const app=express();
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
  }));
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}))
app.use(express.json());
app.use('/api/user',router);
app.use('/api/recipe',recipeRouter);
app.use('/api/favorites',favRouter)


mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})
.then(()=>app.listen(5000))
.then(()=>console.log("listening"))
.catch((err)=>console.log(err.message));
