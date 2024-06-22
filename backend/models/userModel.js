import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:""
    }
    // timestaps add createdAt, and updatedAt field by default
},{timestamps:true});
userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password')){
        next();
    }
    try{
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password,saltRound);
        user.password = hashedPassword;
    }catch(error){
        next(error)
    }
},{timestamps:true})

const User = model("User",userSchema);

export default User;