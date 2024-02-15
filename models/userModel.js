import mongoose from "mongoose";
import slugify from 'slugify';

const { Schema } = mongoose;

const userSchema = new Schema({
    fullname:{
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
        required:false
    },
    profilePic:{
        type:String,
        required:false
    },
    photoUrl:{
        type:String,
        required:false
    },
    age:{
        type:Number,
        required:false
    },
    gender:{
        type:String,
        required:true
    },
    height:{
        type:Number,
        required:false
    },
    weight:{
        type:Number,
        required:false
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
        ref:"Recipe",
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
        unique:true
    }
})

userSchema.pre("save", function (next) {
    this.slug = slugify(this.fullname, { lower: true });
    next();
  });

const User = mongoose.model('User',userSchema)

export default User;