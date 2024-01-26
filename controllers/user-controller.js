import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


export const getAllUser=async(req,res,next)=>{
    let users;
    try {
        users=await User.find();
    } catch (error) {
        return console.log(error.message);
    }
    if(!users){
        return res.status(404).json({message: "No users found"});
    }
    return res.status(200).json({users});
};
export const signup=async(req,res,next)=>{
    const {name,email,password}=req.body;
    let existingUser;
    try {
        existingUser=await User.findOne({email});
    } catch (error) {
        return console.log(error.message);
    }
    if(existingUser){
        return res.status(400).json({message:"User Already Exists! Login Instead"});
    }
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const user= new User({
        name,
        email,
        password: hashedPassword,
    });
    try {
    await user.save();
    const token=createToken(user._id);
    res.cookie('jwt',token,{ httpOnly:true,maxAge:3*60*60*1000 });
    } catch (error) {
    return console.log(error.message);
    }
    return res.status(201).json({user: user._id});
}

export const login=async (req,res,next)=>{
    const{email,password}=req.body;
    let existingUser;
    try {
        existingUser=await User.findOne({email});
    } catch (error) {
        return console.log(error.message);
    }
    if(!existingUser){
        return res.status(404).json({message:"User Does Not Exists! Sign Up Instead"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);
    if(isPasswordCorrect){
        const token=createToken(existingUser._id);
        res.cookie('jwt',token,{ httpOnly:true,maxAge:3*60*60*1000 });
        return res.status(200).json({user: existingUser._id});
    }else{
        return res.status(400).json({message:"Wrong Password Try Again!"});
    }
}

const createToken=(id)=>{
    return jwt.sign({id},process.env.ACCESS_SECRET_TOKEN,{
        expiresIn:3*60*60
    });
}

export const authenticateToken=(req,res,next)=>{
    const token= req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.ACCESS_SECRET_TOKEN,(err,decodedToken)=>{
            if(err){
                console.log(err.message);
                return res.status(401).json({message:"Token Wrong"});
            }else{
                console.log(decodedToken);
                next();
            }
        })
    }else{
        return res.status(401).json({message:"No Token"});
    }
}

export const logout=(req,res,next)=>{
    res.cookie('jwt','',{maxAge:0 });
    return res.sendStatus(200);
}

export const getUser_Id=(req,res,next)=>{
    const token= req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.ACCESS_SECRET_TOKEN, async (err,decodedToken)=>{
            if(err){
                console.log(err.message);
                return res.status(401).json({message:"Token Wrong"});
            }else{
                console.log(decodedToken.id);
                return res.json({id: decodedToken.id});
            }
        })
    }else{
        return res.status(401).json({message:"No Token"});
    }
}