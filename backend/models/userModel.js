import mongoose from "mongoose";

import connectDB from "../config/db_config.js";



connectDB();




const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  task: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "task",
    },
  ],
  role : {
type : String,
enum : ['user', 'admin'],
default:"user"

  }
});


const userModel = mongoose.model("user", userSchema);
export default userModel
