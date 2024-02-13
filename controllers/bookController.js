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
    try{
        const books = await bookSchema.find();
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
    const { search } = req.body;
    const searchRegex = new RegExp(search, "i");
    try{
        const foundBooks = await bookSchema.find({$or:[{title:searchRegex}, {author:searchRegex}]});
        res.status(200).json({message:"books found!", foundBooks:foundBooks})
    } catch(e) {
        res.json(400).json({message:"problem finding what you're searching for",error:e.message})
    }
}

export const filterBooksByGenre = async(req,res)=>{
    const {genre} = req.body;
    try{
        const foundBooks =await bookSchema.find({genre:genre});
        res.status(200).json({message:"books found !", foundBooks:foundBooks})
    } catch(e) {
        res.status(400).json({message:"problem fetching books", error:e.message})
    }
}