import express from "express";
import userModel from "../models/users.js";
import userAuth from "../config/utils/middleware.js";


const userRouter=express.Router();



userRouter.patch("/update/:userId",async (req,res)=>{
    
    const id=req.params.userId
    const data=req.body;
   
   const allowed_update=["age","gender","photo","about","skills"]

  try{
    const isAllowed=Object.keys(data).every((k)=>
        allowed_update.includes(k));
    if(!isAllowed)
    {
        throw new Error("Update not allowed.")
    }
    

    await userModel.findByIdAndUpdate(id,data,{runValidators:true})
    res.send("User Updated")

   
}catch(err){res.status(404).send("Update failed"+err.message)}
})


userRouter.get("/feed",userAuth,async (req,res)=>{

  try{
    const user=req.user
   res.send(user);

      }catch(err){res.send("User not found");}
   
});



export default userRouter;