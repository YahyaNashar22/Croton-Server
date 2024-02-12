import trainingPlanSchema from "../models/trainingPlanModel.js"

// Create training plan
export const createPlan = async(req,res)=>{
    try{
        const{name, focus,nbOfExercises,duration,description,exerciseObject} =req.body; 
        const newPlan = new trainingPlanSchema({
            name:name,
            focus:focus,
            nbOfExercises:nbOfExercises,
            duration:duration,
            description:description,
            exerciseObject:exerciseObject
        })
        await newPlan.save();
        res.status(200).json({message:"training plan created successfully !", plan:newPlan})
    } catch(e) {
        res.status(400).json({message:"error creating plan",error:e.message})
    }
}

// Update Plan
export const updatePlan=async (req,res)=> {
    const id = req.params.id;
    try{
        const{name, focus,nbOfExercises,duration,description,exerciseObject} = req.body;
        const updatedPlan = await trainingPlanSchema.findByIdAndUpdate({_id:id},
            {$set:{
                name:name,
                focus:focus,
                nbOfExercises:nbOfExercises,
                duration:duration,
                description:description,
                exerciseObject:exerciseObject
            }})
            res.status(200).json({message:"plan updated successfully !", plan:updatedPlan})
    } catch(e) {
        res.status(400).json({message:"error updating plan", error:e.message})
    }
}

// Delete Plan
export const deletePlan = async (req,res) => {
    const id = req.params.id;
    try{
        await trainingPlanSchema.findByIdAndDelete(id);
        res.status(200).json({message:"plan deleted successfully !"})
    } catch(e) {
        res.status(400).json({message:"problem deleting plan", error:e.message})
    }
}

// Get all plans
export const getAllPlans = async(req,res)=>{
    try{
        const plans = await trainingPlanSchema.find();
        if(plans){
            res.status(200).json({message:"training plans fetched successfully !", plans:plans});
        }else{
            res.status(404).json({message:"no training plans found !"});
        }        
    } catch(e) {
       res.status(400).json({message:"error fetching plans !", error:e.message}) 
    }
}

// Get one plan by id
export const getOnePlan = async (req,res) => {
    const id = req.params.id;
    try{
        const plan = await trainingPlanSchema.findById(id).populate("exerciseObject.exerciseID");
        if(plan){
            res.status(200).json({message:"plan fetched successfully !",plan:plan})
        }else{
            res.status(404).json({message:"plan does not exist !"})
        }
    } catch(e) {
        res.status(400).json({message:"error fetching plan !", error:e.message}) 
    }
}