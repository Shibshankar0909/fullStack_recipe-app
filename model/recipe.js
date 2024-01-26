import mongoose from "mongoose";

const Schema = mongoose.Schema;
const recipeSchema=new Schema({
    vegetarian:{
        type:Boolean
    },
    title:{
        type:String
    },
    image:{
        type:String
    },
    summary:{
        type:String
    },
    instructions:{
        type:String
    },
    category:{
        type:String
    }
},);

export default mongoose.model("recipe",recipeSchema);