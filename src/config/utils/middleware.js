import jwt from "jsonwebtoken";
import userModel from "../../models/users.js";


const userAuth= async (req,res,next)=>{


    try{
        const cookie=req.cookies;
        const token=cookie.token;

        if(!token)
        {
            throw new Error("NNo token found.");
        }
          const decode=await jwt.verify(token,"prakash")
             
           const {_id}=decode;
           const user=await userModel.findById(_id);
             if (!user) {
         throw new Error( res.status(404).send("User not found in DB."))
}
            req.user=user;
             next();
         

    }catch(err){res.send("Problem arised"+err.message)}

}
export default userAuth;