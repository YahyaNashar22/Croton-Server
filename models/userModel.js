import mongoose from "mongoose";
import slugify from 'slugify';

const { Schema } = mongoose;

const userSchema = new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    profilePic:{
        type:String,
        required:true
    },
    photoUrl:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    favPlans:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TrainingPlan",
        required:false
    }],
    favRecipes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"",//add ref to desired schema here after creating the schema
        required:false
    }],
    favBooks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:false
    }],
    exerciseHistory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Exercise",
        required:false
    }],
    slug:{
        type:String,
        required:true
    }
})

userSchema.pre('validate',(next)=>{
    if(!this.slug){
        this.slug = slugify(fullName)
    }
    next();
})

const User = mongoose.model('User',userSchema)

export default User;