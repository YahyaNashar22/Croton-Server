import recipeSchema from "../models/recipeModel.js"

export const addRecipe = async(req,res)=>{
    try{
        const { name,ownerID, duration, preparation, ingredients} = req.body;
        const newRecipe = new recipeSchema({
            name:name,
            ownerID:ownerID,
            duration:duration,
            preparation:preparation,
            ingredients:ingredients
        });
        await newRecipe.save();
        res.status(200).json({message:"recipe added successfully !", recipe:newRecipe})
    } catch(e) {
        res.status(400).json({message:"problem adding recipe", error:e.message})
    }
}

export const updateRecipe = async(req,res)=>{
    const id = req.params.id;
    try{
        const {name, duration, preparation, ingredients} = req.body;
        const editedRecipe = await recipeSchema.findByIdAndUpdate(
            {_id:id},
            {$set:{
            name:name,
            duration:duration,
            preparation:preparation,
            ingredients:ingredients}});
        res.status(200).json({message:"recipe edited successfully", recipe:editedRecipe})
    } catch(e) {
        res.status(400).json({message:"problem editing recipe", error:e.message})
    }
}

export const deleteRecipe = async(req,res)=>{
    const id = req.params.id;
    try{
        await recipeSchema.findByIdAndDelete(id);
        res.status(200).json({message:"deleted successfully"})
    } catch(e) {
        res.status(400).json({message:"problem deleting comment", error:e.message})
    }
}

export const getAllRecipes = async(req,res)=> {
    try{
        const recipes = await recipeSchema.find();
        res.status(200).json({message:"comments fetched successfully", recipes:recipes})
    } catch(e) {
        res.status(200).json({message:"problem fetching comments"})
    }
}

export const getOneRecipe = async(req,res)=>{
    const id = req.params.id;
    try{
        const recipe = await recipeSchema.findById(id);
        if(!recipe){
            res.status(404).json({message:"recipe not found"})
        }else{
            res.status(200).json({message:"recipe fetched successfully",  recipe:recipe})
        }
    } catch(e) {
        res.status(400).json({message:"problem fetching recipe", error:e.message})
    }
}