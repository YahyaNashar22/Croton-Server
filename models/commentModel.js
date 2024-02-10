import mongoose, { mongo } from "mongoose";
import  { User } from "./User.model";

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
    }
})

const Comment = mongoose.model("Comment",commentSchema);
export default Comment;