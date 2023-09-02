import mongoose from "mongoose";

export const connectDB = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "BackendAPI"
    })
    .then(()=>{
        console.log("DATABASE CONNECTION ESTABLISHED");
    }).catch((err)=>{
        console.log("ERROR CONNECTING TO DATABASE", err);
    });
}