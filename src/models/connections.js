import mongoose from "mongoose";



const connectionSchema=new mongoose.Schema({

    fromUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    toUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    connections:{
        type:String,
        validate(value){
            const allow=["interested","ignored","accepted","rejected"]
            if(!allow.includes(value))
            {
                throw new Error(value +"connection not allowed");
            }
        }
    },
 
   
}, {  timestamps: true});

const connectionModel=mongoose.model("connectionModel",connectionSchema);

export default connectionModel;