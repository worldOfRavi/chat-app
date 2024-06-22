import User from "../models/userModel.js";
import bcrypt from 'bcryptjs';
import generateTolkenAndSetCookie from "../utils/generateToken.js";

//logic for user signup
export const signup = async(req, res)=>{
    try {
        const {fullName, username, password, confirmPassword, gender} = req.body;
        if(password!= confirmPassword){
            return res.status(400).json({message:"Passwords do not match"});
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        //hash passowrd here
        // in this application I hashed the password in the user Model

        // profile pic
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        const newUser = new User({
            fullName,
            username,
            password,
            gender,
            profilePic: gender==="male"? boyProfilePic : girlProfilePic
        });
        if(newUser){
            // create jwt token here
            generateTolkenAndSetCookie(newUser._id, res);
            await newUser.save();
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic
            })
        }else{
            return res.status(400).json({message:"Invalid user data"});
        }
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

//logic for user login
export const login = async(req, res)=>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({error:"Credentials do not match"});
        }
        const verifiedPassword = await bcrypt.compare(password, user?.password);
        if(!verifiedPassword){
            return res.status(400).json({error:"Username or password do not match"});
        }
        await generateTolkenAndSetCookie(user._id, res);
        res.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic
        })

    } catch (error) {
        console.log('Error in login controller', error.message);
        res.status(500).json({error:"internal server error"});
    }
}

//logic fro user logout
export const logout = (req, res)=>{
    try {
        res.cookie('jwt',"",{
            maxAge:0
        });
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log('Error in logout controller', error.message);
        res.status(500).json({error:"nternal server error"});
    }
}

