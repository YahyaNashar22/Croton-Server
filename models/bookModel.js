import mongoose from "mongoose";
import slugify from "slugify";

const { Schema }= mongoose;

const bookSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    genre:{
        type:[String],
        required:true
    },
    nbOfPages:{
        type:Number,
        required:true
    },
    summary:{
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
    cover:{
        type:String,
        required:true
    },
    language:{
        type:String,
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

userSchema.pre('validate',(next)=>{
    if(!this.slug){
        this.slug = slugify(title);
    }
    next();
})

const Book = mongoose.model("Book",bookSchema);

export default Book;