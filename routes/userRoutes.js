import express from "express";
import { signup,googleSignup,login,logout,getOneUser,getAllUsers,updateUser,forgotPass,changeRole,deleteUser, addFavPlan, addFavBook, addFavRecipe, removeFavBook, removeFavPlan, removeFavRecipe } from "../controllers/userController.js";
import { authorized,checkRole } from "../middlewares/authorization.js";
import upload from "../middlewares/multer.js"

const userRouter = express.Router();

userRouter.post('/signup',upload.single('image'), signup);
userRouter.post('/gsign', googleSignup);
userRouter.post('/login', login);
userRouter.post('/addtofavplans', addFavPlan)
userRouter.post('/addtofavbooks', addFavBook)
userRouter.post('/addtofavrecipes', addFavRecipe)
userRouter.post('/removefavrecipes', removeFavRecipe)
userRouter.post('/removefavbooks', removeFavBook)
userRouter.post('/removefavplans', removeFavPlan)

userRouter.get('/logout', logout);
userRouter.get('/allusers',getAllUsers);
userRouter.get('/oneuser',getOneUser);

userRouter.put('/updateuser/:id',upload.single('image'),updateUser);
userRouter.put('/forgotpass/:id',forgotPass);
userRouter.put('/changerole/:id',changeRole);

userRouter.delete('/deleteuser/:id',deleteUser);

export default userRouter;