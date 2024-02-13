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
    ingredients:[{
        ingredient:{
            type:String,
            required:false
        },
        quantity:{
            type:Number,
            required:false
        },
    }],
    slug:{
        type:String,
        unique:true
    }
})

recipeSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
  });

const Recipe = mongoose.model("Recipe",recipeSchema);

export default Recipe;