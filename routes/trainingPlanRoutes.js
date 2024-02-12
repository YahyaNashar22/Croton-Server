import express from "express";
import { createPlan, updatePlan,deletePlan,getAllPlans,getOnePlan } from "../controllers/trainingPlanController.js"
import { authorized,checkRole } from "../middlewares/authorization.js";

const trainingPlanRouter = express.Router();

trainingPlanRouter.post('/create', createPlan);
trainingPlanRouter.put('/update/:id',updatePlan);
trainingPlanRouter.delete('/delete/:id',deletePlan);
trainingPlanRouter.get('/getall',getAllPlans);
trainingPlanRouter.get('/getone/:id',getOnePlan);

export default trainingPlanRouter;