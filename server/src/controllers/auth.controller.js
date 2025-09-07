import { generateToken } from "../../lib/generateToken.js";
import User from "../models/user.model.js";


class AuthControllers{
    static async register(req,res){
        try{
        const{fullName,email,password}=req.body
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        if(fullName.length<1 || fullName.length>50){
            return res.status(400).json({message:"Full name must be between 1 and 50 characters"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be at least 6 characters"});
        }
        const emailRegex=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"});
        }
        const existUser= await User.findOne({email:email});
        if(existUser){
            return res.status(400).json({message:"user already exist."});

        }
        const idx= Math.floor(Math.random()*100);
        const randomAvatar=`https://avatar.iran.liara.run/public/${idx}.png`
        const newUser= await User.create({
            email,
            password,
            fullName,
            profilePic: randomAvatar,
        })
        const token = generateToken(newUser._id);
        res.cookie('token',token,{
            httpOnly:true,
            sameSite:"strict",
            maxAge: 24*60*60*1000, //1 day
            secure: process.env.NODE_ENV === "production",

        })
       return res.status(201).json({msg:"user created successfully",user:newUser});
    }
    catch(error){
        console.log("signup controller error",error);
        res.status(500).json({message:"Internal Server Error"});
    }
    }
    static async login(req,res){
       try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const existUser= await User.findOne({email:email});
        if(!existUser){
            return res.status(400).json({message:"User doesn't exist"});
        }
        const isMatch= await existUser.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const token= generateToken(existUser._id);
        res.cookie('token',token,{
            httpOnly:true,
            sameSite:"strict",
            maxAge: 24*60*60*1000, //1 day
            secure: process.env.NODE_ENV === "production",
        })
        res.status(200).json({message:"Login successful"});
       }
       catch(error){
        console.log("login controller error",error);
        res.status(500).json({message:"Internal Server Error"});
       }
    }
}

export default AuthControllers;