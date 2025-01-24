import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ENV_VARS } from '../config/envVars.js';


export const protectRoute=async(req,resp,next)=>{
    try {
        const token=req.cookies["jwt-netflix"];

        if(!token){
            return resp.status(401).json({success:false,message:"Unauthorised-No Token provided"});
        }

        const decoded=jwt.verify(token,ENV_VARS.JWT_SECRET);
        if(!decoded){
            return resp.status(401).json({success:false,message:"Unauthorised-Invalid Token"});
        }

        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            return resp.status(404).json({success:false,message:"User not found"});
        }
        req.user=user;
        next();
    } catch (error) {
        console.log("Error in protectRoute Middleware : ",  error.message);
        resp.status(500).json({success:true,message:"Internal Server Error"});
    }
}
