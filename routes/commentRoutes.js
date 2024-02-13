import express from "express";
import { addComment,updateComment,getAllComments,deleteComment } from "../controllers/commentController.js";
import { authorized } from "../middlewares/authorization.js";

const commentRouter = express.Router();

commentRouter.post('/post',addComment);
commentRouter.get('/getall/:id',getAllComments);
commentRouter.put('/edit/:id',updateComment);
commentRouter.delete('/delete/:id',deleteComment);

export default commentRouter;