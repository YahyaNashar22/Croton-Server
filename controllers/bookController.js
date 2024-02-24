import bookSchema from "../models/bookModel.js"
import fs from 'fs';

function removeImage(image) {
    fs.unlinkSync("images/" + image, (err) => {
      if (err) {
        console.log(`we can't delete the image`);
      } else {
        console.log("image deleted");
      }
    });
  }

export const addBook = async(req,res)=>{
    try{
        const {title, author, genre, nbOfPages, summary, language,link} = req.body;
        const image=req.file.filename;
        const newBook = new bookSchema({
            title, author, genre, nbOfPages, summary, cover:image, language, link
        });
        await newBook.save();
        res.status(200).json({message:"book added successfully", book:newBook});
    } catch(e) {
        res.status(400).json({message:"problem  adding the book", error: e.message})
    }
}

export  const updateBook = async(req,res)=> {
    const id = req.params.id;
    try{
        const {title, author, genre, nbOfPages, summary, language,link} = req.body;
        const book = await bookSchema.findById(id);
        if(book && req.file){
            removeImage(book.cover)
        }
            const image = req.file?req.file.filename :book.cover;
            const editedBook = await bookSchema.findByIdAndUpdate(
                {_id:id},
                {$set:{
                    title,
                    author,
                    genre,
                    nbOfPages,
                    summary,
                    language,
                    link,
                    cover:image
                }})
                res.status(200).json({message:"book edited successfully", book:editedBook})
    } catch(e) {
        res.status(400).json({message:"cannot edit book", error:e.message})
    }
}

export const deleteBook = async(req,res)=>{
    const id =req.params.id;
    try{
        const book = await bookSchema.findById(id);
        if(book){
            removeImage(book.cover);
            await bookSchema.findByIdAndDelete(id);
            res.status(200).json({message:"book deleted successfully"})
        }else{
            res.status(404).json({message:"book not found !"})
        }
    } catch(e) {
        res.status(200).json({message:"problem deleting book", error:e.message})
    }
}

export const getAllBooks = async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    try{
        const books = await bookSchema.find().skip(skip).limit(limit).exec();
        if(!books || books.lenght === 0){
            res.status(404).json({message:"no more books to show !"})
        }
        res.status(200).json({message:"books found !", books:books})
    } catch(e) {
        res.status(400).json({message:"problem fetching books", error:e.message})
    }
}

export const getOneBook = async(req,res)=>{
    const id = req.params.id;
    try{
        const book = await bookSchema.findById(id);
        res.status(200).json({message:"book fetched successfully",book:book})
    } catch(e) {
        res.status(400).json({message:"problem fetching book", error:e.message})
    }
}

export const searchBook = async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const { search } = req.body;
    const searchRegex = new RegExp(search, "i");
    try{
        const foundBooks = await bookSchema.find({$or:[{title:searchRegex}, {author:searchRegex}]}).skip(skip).limit(limit).exec();
        const count = await bookSchema.find({$or:[{title:searchRegex}, {author:searchRegex}]}).countDocuments();
        if(!foundBooks || foundBooks.lenght === 0){
            res.status(404).json({message:"no more books to show !"})
        }
        res.status(200).json({message:"books found!", foundBooks:foundBooks, count:count})
    } catch(e) {
        res.json(400).json({message:"problem finding what you're searching for",error:e.message})
    }
}

export const filterBooksByGenre = async(req,res)=>{
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const {genre} = req.body;
    try{
        const foundBooks =await bookSchema.find({genre:genre}).skip(skip).limit(limit).exec();
        const count = await bookSchema.find({genre:genre}).countDocuments();
        if(!foundBooks || foundBooks.lenght === 0){
            res.status(404).json({message:"no more books to show !"})
        }
        res.status(200).json({message:"books found !", foundBooks:foundBooks, count:count})
    } catch(e) {
        res.status(400).json({message:"problem fetching books", error:e.message})
    }
}

export const getLatestBooks = async(req,res)=>{
    try{
        const books = await bookSchema.find()
        .sort({createdAt:-1})
        .limit(10)
        res.status(200).json({message:"latest 10 books found !", payload: books})
    } catch(e) {
     res.status(400).json({message:"problem fetching latest books",error:e.message})   
    }
}

export const getAllGenres = async(req,res)=>{
    try{
       const genres = await bookSchema.distinct('genre')
       res.status(200).json({message:"genres fetched successfully", payload:genres})
    } catch(e) {
        res.status(400).json({message:"problem fetching genres", error:e.message})
    }
}

export const getTotalBookNumber= async(req,res)=>{
    try{
        const count = await bookSchema.countDocuments();
        res.status(200).json({message:"counted succesffuly", payload:count})
    } catch(e) {
        res.status(400).json({message:"problem getting number"})
    }
}