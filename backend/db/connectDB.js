import mongoose from "mongoose";

const ATLAS_URI = process.env.ATLAS_URI;
const COMPASS_URI = process.env.COMPASS_URI;
const connectDb = async()=>{
    try {
        await mongoose.connect(ATLAS_URI);
        console.log("Database connection successful...");
    } catch (error) {
        console.log("Error in connecting to mongoDB",error);
    }
    
}

export default connectDb;