import express from "express";
import { addExercise,updateExercise,deleteExercise,getAllExercises,getOneExercise,searchExercise } from "../controllers/exerciseController.js";
import upload from "../middlewares/multer.js"
import { authorized, checkRole } from "../middlewares/authorization.js";

const exerciseRouter =  express.Router();

exerciseRouter.post('/create', upload.array('image', 2),addExercise);
exerciseRouter.put('/update/:id',upload.array('image',2), updateExercise);
exerciseRouter.delete('/delete/:id', deleteExercise);
exerciseRouter.get('/getall',getAllExercises);
exerciseRouter.get('/getone/:id',getOneExercise);
exerciseRouter.post('/search', searchExercise)

export default exerciseRouter;