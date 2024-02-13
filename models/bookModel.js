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
    cover:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:false
    },
    slug:{
        type:String,
        unique:true
    }
})

bookSchema.pre("save", function (next) {
    this.slug = slugify(this.title, { lower: true });
    next();
  });

const Book = mongoose.model("Book",bookSchema);

export default Book;