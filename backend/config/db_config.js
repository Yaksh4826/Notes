import mongoose from "mongoose";
import env from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (e) {
    console.error("Connection failed for DB", e.message);
    process.exit(1);
  }
};

export default connectDB;
