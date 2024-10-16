import mongoose from "mongoose";

const connectMongoDb=async(uri)=>{
    try{
        await mongoose.connect(uri);
        console.log("mongodb connected successfully");
    }catch(error){
        console.log(error);
    }
}
export {connectMongoDb}