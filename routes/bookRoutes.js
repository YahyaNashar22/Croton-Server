import express from "express";
import {authorized, checkRole} from "../middlewares/authorization.js";
import upload from "../middlewares/multer.js";
import { addBook, updateBook, deleteBook,getAllBooks,getOneBook,searchBook,filterBooksByGenre, getLatestBooks, getAllGenres } from "../controllers/bookController.js";

const bookRouter = express.Router();

bookRouter.post('/add',upload.single('image'),addBook);
bookRouter.put('/edit/:id',upload.single('image'),updateBook);
bookRouter.delete('/delete/:id', deleteBook);
bookRouter.get('/getall',getAllBooks);
bookRouter.get('/getone/:id',getOneBook);
bookRouter.get('/search',searchBook);
bookRouter.get('/genre',filterBooksByGenre);
bookRouter.get('/getlatest',getLatestBooks);
bookRouter.get('/getgenres',getAllGenres);


export default bookRouter;