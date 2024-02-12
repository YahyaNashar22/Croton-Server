import express from "express";
import { addExercise,updateExercise,deleteExercise,getAllExercises,getOneExercise } from "../controllers/exerciseController.js";
import upload from "../middlewares/multer.js"

const exerciseRouter =  express.Router();

exerciseRouter.post('/create', upload.single('image'),addExercise);
exerciseRouter.put('/update/:id',upload.single('image'), updateExercise);
exerciseRouter.delete('/delete/:id', deleteExercise);
exerciseRouter.get('/getall',getAllExercises);
exerciseRouter.get('/getone/:id',getOneExercise);

export default exerciseRouter;