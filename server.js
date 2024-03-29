import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';

import dbConnection from './db/dbConnection.js';
import userRouter from './routes/userRoutes.js';
import exerciseRouter from './routes/exerciseRoutes.js';
import trainingPlanRouter from './routes/trainingPlanRoutes.js';
import commentRouter from './routes/commentRoutes.js';
import recipeRouter from './routes/recipeRoutes.js';
import bookRouter from './routes/bookRoutes.js';

dotenv.config();
const app = express();

//CORS Policies
app.use(cors({
  origin:["http://localhost:3000","https://croton-client-2g1bq6o7l-yahyanashar22s-projects.vercel.app","https://croton-client-4t6migihp-yahyanashar22s-projects.vercel.app","https://croton-client.vercel.app"],
  credentials: true,
  optionsSuccessStatus: 200,}
));

//essential middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("images"));


//Routes for different models
app.use('/users', userRouter);
app.use('/exercises',exerciseRouter);
app.use('/trainingplans',trainingPlanRouter);
app.use('/comments',commentRouter);
app.use('/recipe',recipeRouter);
app.use('/books',bookRouter);

  
  app.listen(process.env.PORT, (error) => {
    if (!error) {
      console.log(`Server running on port: ${process.env.PORT}`);
    } else {
      console.log(`Error: ${error}`);
    }
  });
dbConnection();