import mongoose from "mongoose";

const collection = "Users";

const schema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    age:Number, //El mundo real NUNCA guarda una edad
    password:String,
    role:{
        type:String,
        enum:['client','admin'],
        default:'user'
    }
})

const userModel = mongoose.model(collection,schema);

export default userModel;