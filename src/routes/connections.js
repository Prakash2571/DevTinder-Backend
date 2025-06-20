import express from "express";

import userAuth from "../config/utils/middleware.js";
import connectionModel from "../models/connections.js";

const connectionRouter=express.Router();

connectionRouter.post("/request/:status/:toUserId",userAuth,async (req,res)=>{

    const status=req.params.status;
    const toUserId=req.params.toUserId;

    try{

     const allowed=["interested","ignored"]
     if(!allowed.includes(status))
     {
        throw new Error(status+"is not allowed.");
     }
     const fromUserId=req.user._id;
    

     if (fromUserId.toString() === toUserId.toString())
     {
        throw new Error("This behaviour is not allowed")
     }

      const find=await connectionModel.find({  $or: [
    { fromUser: fromUserId, toUser: toUserId },
    { fromUser: toUserId, toUser: fromUserId }
  ]})
      if(find.length>0)
      {
        throw new Error("This is not allowed")
      }

      const connect =new connectionModel({fromUser:fromUserId,
        toUser:toUserId,
        connections:status,
       
      })

     await connect.save();
     res.send("Request Send sucessfully")

     
    }
    catch(err){res.status(404).send("Something went wrong "+err.message)}
})

export default connectionRouter;