import mongoose from "mongoose";
import slugify from "slugify";

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
    slug:{
        type:String,
        unique:true
    }
})

trainingPlanSchema.pre("save", function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
  });


const TrainingPlan = mongoose.model("TrainingPlan", trainingPlanSchema);

export default TrainingPlan;