import mongoose from "mongoose";
import sluigify from "slugify";

const { Schema } = mongoose;

const trainingPlanSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    focus:{
        type:String,
        required:true
    },
    nbOfExercises:{
        type:Number,
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
    duration:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    exerciseObject:[{
        exerciseID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Exercise",
            required:true
        },
        sets:{
            type:Number,
            required:true
        },
        reps:{
            type:Number,
            required:false,
        }
    }],
    comments:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment",
        required:true
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

trainingPlanSchema.pre('validate',(next)=>{
    if(!this.slug){
        this.slug = slugify(name);
    }
    next();
})

const TrainingPlan = mongoose.model("TrainingPlan", trainingPlanSchema);

export default TrainingPlan;