import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    trainingPlanID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TrainingPlan",
        required:false
    },
    blogID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"",
        required:false
    }
})

const Comment = mongoose.model("Comment",commentSchema);
export default Comment;