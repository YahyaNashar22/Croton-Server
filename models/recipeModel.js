import mongoose from "mongoose";
import slugify from "slugify";

const { Schema } = mongoose;

const recipeSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    ownerID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:false,
    },
    duration:{
        type:Number,
        required:true
    },
    preparation:{
        type:String,
        required:true
    },
    rate:{
        type:Number,
        required:true
    },
    votes:{
        type:Number,
        required:true
    },
    ingredients:{
        ingredient:{
            type:String,
            required:true
        },
        quantity:{
            type:Number,
            required:false
        },
    },
    favorite:{
        type:Boolean,
        required:false
    },
    slug:{
        type:String,
        required:true
    }
})

recipeSchema.pre('validate',(next)=>{
    if(!this.slug){
        this.slug = slugify(name);
    }
    next();
})

const Recipe = mongoose.model("Recipe",recipeSchema);

export default Recipe;