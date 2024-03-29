import exerciseSchema from "../models/exerciseModel.js";
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

  // Create Exercise
export const addExercise = async(req,res)=>{
    try{
        const {name, muscleGrp, category, type, intensity, instructions} = req.body;
        const image = req.files.map((file)=>file.filename);
        const newExercise = new exerciseSchema({
            name: name,
            muscleGrp:muscleGrp,
            category:category,
            type:type,
            intensity:intensity,
            instructions:instructions,
            gif:image
        })
        await newExercise.save();
        res.status(200).json({message:"exercise added successfully !", exercise:newExercise});
    } catch(e) {
        res.status(400).json({message:"could not add exercise",error:e.message})
    }
}

    // Edit Exercise
export const updateExercise = async(req,res)=>{
    const id = req.params.id;
    try{
        const exercise = await exerciseSchema.findById(id);
        if(!exercise){
            return res.status(404).json("exercise is not found!");
        }
        if(req.file && exercise.gif){
            exercise.gif.map(file=>removeImage(exercise.file))
        }
        const {name,muscleGrp,category,type,intensity,instructions} = req.body;
        const image = req.files? req.files.map(file => file.filename): exercise.gif;
        const updatedExercise = await exerciseSchema.findByIdAndUpdate({_id:id},
           {$set:{
            name: name,
            muscleGrp:muscleGrp,
            category:category,
            type:type,
            intensity:intensity,
            instructions:instructions,
            gif:image
        }});
        
        return res.status(201).json({message:"exercise updated successfully !", exercise:updatedExercise});
    } catch(e) {
        res.status(400).json({message:"could not update exercise", error:e.message})
    }
}

    // Delete Exercise
export const deleteExercise = async (req, res) => {
    const id = req.params.id;
    try {
        const exercise = await exerciseSchema.findById(id);
        if(!exercise){
            return res.status(404).json({message:"exercise not found !"})
        }
        if(exercise.gif){
            exercise.gif.map(file=>removeImage(exercise.file))
        }
      await exerciseSchema.deleteOne({ _id: id });
      res.status(200).json({ message: "exercise deleted successfully" });
    } catch (err) {
      res.status(400).json({ message: " could not delete exercise", error:err });
    }
  };

    // Get all exercises
export const getAllExercises = async (req, res) => {
    try {
      const allExercises = await exerciseSchema.find();
      return res.status(200).json({exercises:allExercises});
    } catch (err) {
      res.status(400).json({ message:"exercises could not be fetched", error:err });
    }
  };

  // Get one exercise by ID
export const getOneExercise = async(req,res)=>{
    const id = req.params.id;
    try{
        const exercise = await exerciseSchema.findById(id);
        if(exercise){
            res.status(200).json({message:"exercise found !", exercise:exercise})
        }else{
            res.status(404).json({message:"exercise not found !"})
        }
    } catch(e) {
        res.status(400).json({message:"problem getting exercise",error:e.message})
    }
}

export const searchExercise = async(req,res)=>{
    const { search } = req.body;
    const searchRegex = new RegExp(search, "i");
    console.log(searchRegex)
    try{
        const foundExercises = await exerciseSchema.find({
            name:{$regex:searchRegex}
        });
        if(foundExercises.length>0){
            res.status(200).json({message:"exercises found!", foundExercises:foundExercises})
        }else{
            res.status(404).json({message:"no exercises found !"})
        }
    } catch(e) {
        res.json(400).json({message:"problem finding what you're searching for",error:e.message})
    }
}
