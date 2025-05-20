import express from "express";
const app=express();


app.use("/admin",(req,res,next)=>{
    const token="xyx";
    if(token!="xyz")
    {
        res.status(401).send("Not authorised.");
    }
    else{
        next();
    }
});

app.use("/admin/login",(req,res,next)=>{
    res.send("Sucessfully login.");
})



app.listen(3000,()=>{
    console.log("app is running at port 3000.")
});