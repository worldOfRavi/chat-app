import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protectRoute = async(req, res, next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"Unauthorized- No Token Provide"});
        }
        const decoded = await jwt.verify(token, process.env.SECRET);
        if(!decoded){
            return res.status(401).json({error:"Unauthorized- Invalid token"});
        }
        const user = await User.findById(decoded.userId).select("password:0");
        if(!user){
            return res.status(404).json({error:"User not found"});
        } 
        req.user = user;
        next();
        
    } catch (error) {
        console.log("Error in protect route middleware", error.mesage);
        res.status(500).json({error:"Internal server error"});
    }
}

export default protectRoute;