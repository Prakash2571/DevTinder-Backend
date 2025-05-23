import mongoose from "mongoose";
import validator from "validator";

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)
            ){throw new Error("Not a valid email")}
        }
    },
    age:{
        type:Number,
        min:18
    },
    password:{
        type:String
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value))
            {
                throw new Error("Gender data is not valid ");
            }
        }
    },
    photo:{
        type:String,
        default:"https://images.pexels.com/photos/1557652/pexels-photo-1557652.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    about:{
        type:String,
        default:"This is a default value"
    },
    skills:{
        type:[String],
        validate(value){
            if(value.length>10)
            {
                throw new Error("Not more than then 10 skills supported");
            }
        }
    }
},{timestamp:true})


const userModel=mongoose.model("User",userSchema);

export default userModel;