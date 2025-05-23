import express from "express";
import connectDB from "./config/database.js";

import cookieParser from "cookie-parser";


const app=express();


app.use(express.json())
app.use(cookieParser());


import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";



app.use("/",authRouter);
app.use("/",userRouter);







connectDB().then(()=>{console.log("Dtabase connection establised...");
    
app.listen(3000,()=>{
    console.log("app is running at port 3000.")
});

}).catch((err)=>{console.error("Dtabase cannot be connected !!"+err.message);})

