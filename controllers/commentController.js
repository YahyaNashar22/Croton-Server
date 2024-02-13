import commentSchema from "../models/commentModel.js"

export const addComment = async(req,res)=>{
    // May need to be fixed when working on the front end
    const {id} = req.body
    try{
        const {content,trainingPlanID,blogID}= req.body;
        const newComment = new commentSchema({
            userID:id,
            content,
            trainingPlanID,
            blogID
        });
        await newComment.save();
        res.status(200).json({message:"comment added successfully !",comment:newComment})
    } catch(e) {
        res.status(400).json({message:"problem posting comment", error:e.message})
    }
}

export const getAllComments = async(req,res)=>{
    const id = req.params.id
    try{
        const comments = await commentSchema.find({$or:[{trainingPlanID:id},{blogID:id}]})
        if(comments){
            res.status(200).json({message:"comments fetched successfully !",comments:comments})
        }else{
            res.status(404).json({message:"no comments to show !"})
        }
    } catch(e) {
        res.status(400).json({message:"problem loading comments",error:e.message})
    }
}

export const updateComment = async(req,res)=>{
    const id = req.params.id
    try{
        const {content}= req.body;
        const updatedComment = await commentSchema.findByIdAndUpdate({_id:id},{$set:{content:content}});

        res.status(200).json({message:"comment added successfully !", comment:updatedComment})
    } catch(e) {
        res.status(400).json({message:"could not edit comment", error:e.message})
    }
}

export const deleteComment = async(req,res)=>{
    const id = req.params.id;
    try{
        await  commentSchema.findByIdAndDelete(id);
        res.status(200).json({message:"deleted the comment!"});
    } catch(e) {
        res.status(400).json({message:"cannot delete comment !", error:e.message})
    }
}