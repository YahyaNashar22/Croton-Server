import userSchema from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { createToken, verifyToken } from "../utils/token.js";
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

//Sign up function
export const signup = async(req,res)=>{
    try{
        const {fullname, email,password,phoneNumber,age,gender,height,weight,role} = req.body;
        const profilePic = req.file.filename;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new userSchema({
            fullname:fullname, email:email,password:hash,phoneNumber:phoneNumber,age:age,gender:gender,height:height,weight:weight,role:role,profilePic:profilePic
        });
        await newUser.save();
        const token = createToken(newUser);
        const decoded = verifyToken(token);
        res.status(201).cookie("userToken",token,{
            secure: true,
            httpOnly: true,
            sameSite: "None",
          }).json({messaege:"user created successfully", userToken:decoded})
    } catch(e) {
        res.status(400).json({message:"user cannot be created !",error:e.message})
    }
}

//Google Signup

export const googleSignup = async(req,res)=>{
    try{

         //function to generate random password
        function generateRandomPass(length) {
            const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                let randomPassword = '';
                for (let i = 0; i < length; i++) {
                    const randomIndex = Math.floor(Math.random() * charset.length);
                    randomPassword += charset[randomIndex];
                    }
                    return randomPassword;
                }
                //

        const {fullname, email,phoneNumber,age,gender,height,weight,role} = req.body;
        const photoUrl = req.file;
        const randomPassword = generateRandomPass(10); 
        const password = req.body.password || randomPassword;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        //hadnles if a user is already signed up
        const user = await userSchema.findOne({email:email});
        if (user) {
            const token = createToken(user);
            const decoded = verifyToken(token);
            res
              .cookie("userToken", token, {
                secure: true,
                httpOnly: true,
                sameSite: "None",
              })
              .status(202)
              .json({ message: "user logged in successfully", token: decoded });
            //

          }else{

            //if it's a new user 
            const newUser = new userSchema({
                fullname, email,password:hash,phoneNumber,age,gender,height,weight,role,photoUrl
            });
            await newUser.save();
            const token = createToken(newUser);
            const decoded = verifyToken(token);
            res.status(201).cookie("userToken",token,{
                secure: true,
                httpOnly: true,
                sameSite: "None",
              }).json({messaege:"user created successfully", userToken:decoded})
          }
          //

    } catch(e) {
        res.status(400).json({message:"error creating user", error:e})
    }
}

// Log in function
export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(404).send("user not found !");
    } else {
      try {
        if (await bcrypt.compare(password, user.password)) {
          const token = createToken(user);
          const decoded = verifyToken(token);
          res
            .cookie("userToken", token, {
              secure: true,
              httpOnly: true,
              sameSite: "None",
            })
            .status(200)
            .json({ message: "user logged in successfully", token: decoded });
        }
      } catch (error) {
        res.status(400).json({message:"error !", error:error})
      }
    }
  };

  //logout fct

export const logout = (req, res) => {
    console.log("cookie cleared");
    return res
      .clearCookie("userToken")
      .status(200)
      .send("successfully logged out");
  };

  // Fetch one user by ID
export const getOneUser = async (req, res) => {
    const token = req.cookies.userToken;
    const decoded = verifyToken(token);
    const id = decoded.data ? decoded.data.id : undefined;
    try {
      if (!id) {
        return res.status(401).json({ message: "Token not found !" });
      }
      const user = await userSchema.findById(id);
      if (user) {
        return res.json({
          fullname:user.fullname,
          email:user.email,
          password:user.hash,
          phoneNumber:user.phoneNumber,
          age:user.age,
          gender:user.gender,
          height:user.height,
          weight:user.weight,
          role:user.role,
          profilePic:user.profilePic,
          photoUrl:user.photoUrl
        });
      } else {
        return res.status(404).json({ error: "User Not Found!" });
      }
    } catch (err) {
      res.status(404).json({ message: "Couldn't find user",error:err });
    }
  };

  // Fetch all users
export const getAllUsers = async (req, res) => {
    try {
      const allUsers = await userSchema.find();
      return res.status(200).json(allUsers);
    } catch (err) {
      res.status(400).json({ message:"Users could not be fetched", error:err });
    }
  };

// Update user
export const updateUser = async(req,res)=>{
    const id = req.params.id;
    try{
        const user = await userSchema.findById(id);
        if(!user){
            return res.status(404).json("User is not found!");
        }
        if(req.file && user.profilePic){
            removeImage(user.profilePic)
        }
        const {fullname,phoneNumber,age,gender,height,weight} = req.body;
        const image = req.file? req.file.filename:user.profilePic;
        const updatedUser = await userSchema.findByIdAndUpdate({_id:id},
           {$set:{
            fullname:fullname,
          phoneNumber:phoneNumber,
          age:age,
          gender:gender,
          height:height,
          weight:weight,
          profilePic:image
        }});
        
        return res.status(201).json({message:"user updated successfully !", user:updatedUser});
    } catch(e) {
        res.status(400).json({message:"could not update user", error:e.message})
    }
}

// Forgot password
export const forgotPass = async(req,res)=>{
    const id = req.params.id;
    try{
        const {password} = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        await userSchema.findOneAndUpdate({_id:id},{$set:{
            password:hash
        }})
        res.status(200).json({message:"password updated successfully"})
    } catch(e) {
        res.status(400).json({message:"could not update password", error:e.message})
    }
}

// Change Role
export const changeRole = async (req,res) => {
    const id = req.params.id;
    try{
        const { role } = req.body;
        await userSchema.findByIdAndUpdate({_id:id},{$set:{role:role}});
        res.status(200).json({message:"Role updated successfully !"});
    } catch(e) {
        res.status(400).json({message:"couldn't update role", error:e.message})
    }
}

// Delete user
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await userSchema.findById(id);
        console.log(user)
        if(!user){
            return res.status(404).json({message:"user not found !"})
        }
        if(user.profilePic){
            removeImage(user.profilePic);
        }
      await userSchema.deleteOne({ _id: id });
      res.status(200).json({ message: "user deleted successfully" });
    } catch (err) {
      res.status(400).json({ message: " could not delete user", error:err });
    }
  };
