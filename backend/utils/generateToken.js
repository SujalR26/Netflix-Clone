import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie=(userId,resp)=>{
    const token=jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:"1d"});
    resp.cookie("jwt-netflix",token,{
        maxAge:1*24*60*60*1000, //1 day in millisecond
        httpOnly:true, //prevent xss attacks from cross-site scripting attacks,make it not accessible by js (search it for better understanding)
        sameSite:"strict", //CSRF attacks cross-site request forgery attack
        secure:ENV_VARS.NODE_ENV!="development"
    });
    return token;
}