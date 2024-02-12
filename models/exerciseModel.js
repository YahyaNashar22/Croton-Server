import mongoose from "mongoose";
import slugify from "slugify";

const { Schema } = mongoose;

const exerciseSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    muscleGrp:{
        type:[String],
        required:true
    },
    category:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    intensity:{
        type:String,
        required:true
    },
    instructions:{
        type:String,
        required:true
    },
    gif:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        unique:true
    }
})

exerciseSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
  });

const Exercise = mongoose.model("Exercise", exerciseSchema);
export default Exercise;