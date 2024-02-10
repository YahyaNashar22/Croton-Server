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
        required:true
    }
})

userSchema.pre('validate',(next)=>{
    if(!this.slug){
        this.slug = slugify(name)
    }
    next();
})

const Exercise = mongoose.model("Exercise", exerciseSchema);
export default Exercise;