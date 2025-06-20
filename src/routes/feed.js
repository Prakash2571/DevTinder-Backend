import express from "express";
import userModel from "../models/users.js";
import userAuth from "../config/utils/middleware.js";
import connectionModel from "../models/connections.js";


const feedRouter=express.Router();


feedRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
 

  
    const connections = await connectionModel.find({
      $or: [{ fromUser: userId }, { toUser: userId }]
    });



    const connectedUserIds = new Set();

    connections.forEach(conn => {
      if (conn.fromUser.toString() !== userId.toString()) {
        connectedUserIds.add(conn.fromUser.toString());
      }
      if (conn.toUser.toString() !== userId.toString()) {
        connectedUserIds.add(conn.toUser.toString());
      }
    });


    connectedUserIds.add(userId.toString());



    const finalFeed = await userModel.find({
      _id: { $nin: Array.from(connectedUserIds) }
    }).select("firstName lastName  age gender photo about_id");

 

    res.send(finalFeed);

  } catch (err) {
  
    res.status(500).send({ error: err.message });
  }
});




export default feedRouter; 