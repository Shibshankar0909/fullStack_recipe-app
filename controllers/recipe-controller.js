import Recipe from "../model/recipe";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'dthefchlz', 
    api_key: '552588688295941', 
    api_secret: 'l692DLwh5dabx8J8tdBbA7esxf8',
  });

export const getAllRecipe=async(req,res,next)=>{
    let recipes;
    try {
        recipes=await Recipe.find();
    } catch (error) {
        return console.log(error.message);
    }
    if(!recipes){
        return res.status(404).json({message: "No recipes found"});
    }
    return res.status(200).json({recipes});
};

export const getCategorized=async(req,res,next)=>{
    let recipes;
    try {
        recipes=await Recipe.find().where('category').equals(req.query.category);
    } catch (error) {
        return console.log(error.message);
    }
    if(!recipes){
        return res.status(404).json({message: "No recipes found"});
    }
    return res.status(200).json({recipes});
}

export const getSearched=async(req,res,next)=>{
    let recipes;
    console.log(req.query.text);
    try {
        recipes=await Recipe.find({"title":{$regex:req.query.text,$options:'i'}});
    } catch (error) {
        return console.log(error.message);
    }
    if(!recipes){
        return res.status(404).json({message: "No recipes found"});
    }
    return res.status(200).json({recipes});
}

export const getById=async(req,res,next)=>{
    let recipes;
    console.log(req.query.id);
    try {
        recipes=await Recipe.findById(req.query.id);
    } catch (error) {
        return console.log(error.message);
    }
    if(!recipes){
        return res.status(404).json({message: "No recipes found"});
    }
    return res.status(200).json({recipes});
}

export const postRecipe = async (req, res, next) => {
    const file = req.files.photo;
  
    try {
      const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
      const url = uploadResult.secure_url;
      const recipeId = req.query.id;
      let recipe;
      try {
        recipe = await Recipe.findById(recipeId);
      } catch (error) {
        console.error("Error fetching recipe:", error.message);
        return res.status(500).json({ message: "Error fetching recipe" });
      }
  
      if (!recipe) {
        return res.status(404).json({ message: "No recipes found" });
      }
  
      recipe.image = url;
  
      try {
        await recipe.save();
      } catch (error) {
        console.error("Error saving recipe:", error.message);
        return res.status(500).json({ message: "Error saving recipe" });
      }
  
      return res.status(200).json({ message: "Recipe updated successfully", recipe });
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error.message);
      return res.status(500).json({ message: "Error in postRecipe" });
    }
  };
  