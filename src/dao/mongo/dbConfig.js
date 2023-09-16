import mongoose from "mongoose";

const URI =
  "mongodb+srv://edwardbastos:OK24LQcwHFH7r4x8@cluster0.cdu1txg.mongodb.net/ecommerce?retryWrites=true&w=majority";
await mongoose.connect(URI, {
  serverSelectionTimeoutMS: 5000,
});
console.log("Base de datos conectada....");
