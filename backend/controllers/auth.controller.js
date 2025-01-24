import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req,resp){
    try {
        const {email,password,userName}=req.body;
        if(!email || !password || !userName){
            return resp.status(400).json({success:false,message:"All fields are required"});
        }
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return resp.status(400).json({success:false,message:"Invalid Email"});
        }
        if(password.length<6){
            return resp.status(400).json({success:false,message:"Password must be atleast 6 characters"});
        }

        const existingUserByEmail=await User.findOne({email:email});

        if(existingUserByEmail){
            return resp.status(400).json({success:false,message:"Email already exists"});
        }
        const existingUserByUserName=await User.findOne({userName:userName});

        if(existingUserByUserName){
            return resp.status(400).json({success:false,message:"Username already exists"});
        }

        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);


        const image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREh8TIFWYXVR4v4TeSVn20PTQ5WNaF5IteeQ&s"
        const newUser=new User({
            email:email,
            password:hashedPassword,
            userName:userName,
            image:image
        })
        generateTokenAndSetCookie(newUser._id,resp);
        await newUser.save();
        //remove password from response
        resp.status(201).json({
            success:true,
            user:{
            ...newUser._doc,
            password:""
        }})
        
        
        
    } catch (error) {
        console.log("Error in signup controller ",error.message);
        resp.status(500).json({success:false,message:"Internal server error"});
    }
}

export async function login(req,resp){
    try {
        const {email,password}=req.body;
        if(!email || !password) {
            return resp.status(400).json({success:false,message:"All fields are required"});
        }
        const user=await User.findOne({email:email});
        if(!user){
            return resp.status(404).json({success:false,message:"Invalid credentials"});
        }  
        const isPasswordCorrect=await bcryptjs.compare(password,user.password);
        if(!isPasswordCorrect){
            return resp.status(404).json({success:false,message:"Invalid credentials"});
        }

        generateTokenAndSetCookie(user._id,resp);
        resp.status(200).json({
            success:true,
            user:{
                ...user._doc,
                password:""
            }
        })

    } catch (error) {
        console.log("Error in login controller ",error.message);
        resp.status(500).json({success:false,message:"Internal server error"});
    }
}

export async function logout(req,resp){
    try {
        resp.clearCookie("jwt-netflix");
        resp.status(200).json({success:true,message:"Logged out successfully"});
    } catch (error) {
        console.log("Error in logout Controller",error.message);
        resp.status(500).json({success:false,message:"Internal server error"});
    }
}

export async function authCheck(req,resp){
    try {
        resp.status(200).json({success:true,user:req.user});
    } catch (error) {
        console.log("Error in authCheck controller");
        resp.status(500).json({success:false,message:"Internal Server Error"});
    }
}