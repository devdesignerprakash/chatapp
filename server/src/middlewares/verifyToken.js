import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';


export const verifyToken = async(req, res, next) => {
    const token= req.cookies.token;

    if(!token){
        return res.status(401).json({message:"No token, authorization denied"});

    }
    try{
        const verifyToken= jwt.verify(token,process.env.JWT_SECRET);
        if(!verifyToken){
            return res.status(401).json({message:"Token verification failed, authorization denied"});
        }
        const user= await User.findById(verifyToken.id).select('-password');
        if(!user){
            return res.status(401).json({message:"User not found, authorization denied"});
        }
        req.user=user;
        next();
    }
    catch(error){
        console.log("verify token error",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}