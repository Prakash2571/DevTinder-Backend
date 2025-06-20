import express from "express";

import userAuth from "../config/utils/middleware.js";
import connectionModel from "../models/connections.js";


const reviewRequests=express.Router();

reviewRequests.post("/incoming/:status/:fromUserId",userAuth,async(req,res)=>{

    try{
         const status=req.params.status;
        const allowedStatus=["accepted","rejected"];
        if(!allowedStatus.includes(status))
         {
            throw new Error(status+" is not allowed");
         }
          const fromUserId=req.params.fromUserId;
          const toUserId=req.user._id;
         const exist=await connectionModel.findOne({fromUser:fromUserId,toUser:toUserId,connections:"interested"})
         if(!exist)
         {
            throw new Error("no one send u request ! lonely guy")
         }
         exist.connections=status;
         await exist.save();
         res.send("Reviewed sucessufully .")
    } catch(err){res.status(404).send(err.message)}
    })


reviewRequests.get("/incoming/myrequests",userAuth ,async(req,res)=>{

    try{
    
         const userId=req.user._id;

        const requests=await connectionModel.find({toUser:userId,connections:"interested"}).populate("fromUser",["firstName","lastName","gender"])


        res.send(requests);


    }catch(err){res.send(err.message)}
})

reviewRequests.get("/incoming/myfriends", userAuth, async (req, res) => {
  try {
    const userId = req.user._id.toString(); // convert to string for safe comparison

    const connections = await connectionModel
      .find({
        $or: [
          { toUser: userId, connections: "accepted" },
          { fromUser: userId, connections: "accepted" },
        ],
      })
      .populate([
        { path: "fromUser", select: "firstName lastName photo gender" },
        { path: "toUser", select: "firstName lastName photo gender" },
      ]);

    const mySet = new Set();

    connections.forEach((x) => {
      if (x.fromUser._id.toString() !== userId) {
        mySet.add(JSON.stringify(x.fromUser));
      }
      if (x.toUser._id.toString() !== userId) {
        mySet.add(JSON.stringify(x.toUser));
      }
    });

   
    const friendsList = Array.from(mySet).map((item) => JSON.parse(item));

    res.send(friendsList);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


export default reviewRequests;