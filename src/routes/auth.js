import express from "express";
import userModel from "../models/users.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


const authRouter=express.Router();

authRouter.post("/signup",async (req,res)=>{
    const userObj=req.body;
    const userPassword=req.body.password;
    const Pass= await bcrypt.hash(userPassword,10)
    userObj.password=Pass;

    const user=new userModel(userObj);
    await user.save();
     res.send("user added sucessfully.");
})


authRouter.post("/login", async (req, res) => {
  const emailId = req.body.email
  const userpass = req.body.password;
  

  try {
    const data = await userModel.findOne({ email: emailId });

    if (!data) {
      throw new Error("Invalid credentials.");
    }

    const pass = data.password;
    const id=data._id;
    const isValid = await bcrypt.compare(userpass, pass);

    if (isValid) {
      const token=jwt.sign({_id:id},"prakash")
      res.cookie("token",token);
      res.send(data);
    } else {
      res.status(401).send("Incorrect password.");
    }
  } catch (err) {
    res.status(401).send("Login unsuccessful: " + err.message);
  }
});


authRouter.post("/logout",(req,res)=>{
  const token=req.cookies.token;
  res.cookie("token",token,{   expires: new Date(Date.now())})
  res.send("Logout Sucessfull")
})


export default authRouter;