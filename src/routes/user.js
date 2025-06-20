import express from "express";
import userModel from "../models/users.js";
import userAuth from "../config/utils/middleware.js";
import { validateUser } from "../config/utils/middleware.js";


const userRouter=express.Router();




userRouter.get("/profile/view",userAuth,async (req,res)=>{

  try{
    const user=req.user
   res.send(user);

  
      }catch(err){res.send("Problem is there");}
   
});




userRouter.put("/update", userAuth, async (req, res) => {
  const updates = req.body;

  try {
    validateUser(updates); 

    const loggedinUser = req.user;

   
    Object.keys(updates).forEach((key) => {
      loggedinUser[key] = updates[key];
    });

 
    await loggedinUser.save();

    res.status(200).json({ message: "Profile updated successfully", data: loggedinUser });

  } catch (err) {
    
    if (err.name === "ValidationError") {
      const errorMessages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        error: "Validation failed",
        details: errorMessages,
      });
    }

   
    console.error("Update error:", err);
    res.status(500).json({
      error: "Update failed",
      message: err.message || "Internal Server Error",
    });
  }
});






export default userRouter;