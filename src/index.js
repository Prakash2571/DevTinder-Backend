import express from "express";
import connectDB from "./config/database.js";

import cookieParser from "cookie-parser";
import cors from "cors";



const app=express();



app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(express.json())
app.use(cookieParser());


import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import connectionRouter from "./routes/connections.js";
import review from "./routes/review.js";
import feedRouter from "./routes/feed.js";



app.use("/",authRouter);
app.use("/",userRouter);
app.use("/",connectionRouter)
app.use("/",review);
app.use("/",feedRouter)






connectDB().then(()=>{console.log("Dtabase connection establised...");
    
app.listen(3000,()=>{
    console.log("app is running at port 3000.")
});

}).catch((err)=>{console.error("Dtabase cannot be connected !!"+err.message);})

