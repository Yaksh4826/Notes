import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import userModel from "../models/userModel.js";
import env from "../config/config.js";

export const registerUser = function (req, res) {
  let { fullName, email, password } = req.body;
  // Hashing the password

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      // Storing the user
      let user = await userModel.create({
        fullName: fullName,
        email: email,
        password: hash,
      });
      console.log(user);
      
  let token = jwt.sign({ id: user._id }, env.JWT_SECRET);
  res.cookie("token", token);
  res.send("User registered successfully");
    });
  });

};

export const loginUser = async (req, res) => {
  let { email, password } = req.body;
  // First we need to check if the email exists or not
  let user = await userModel.findOne({ email: email });

  if (!user) {
    return res.send("Invalid credientials : Something went wrong");
  } else {
    // Now checking if that user's original password matches the current entered

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        // setting the token
        let token = jwt.sign({ id: user._id }, env.JWT_SECRET);
        res.cookie("token", token);
        return res.send("Logged in sucessfully");
      } else {
        return res.send("Invalid password");
      }
    });
  }
};

export const logoutUser = (req, res) => {
  // In Logout we make the token null
  res.cookie("token", "");
  res.send("Logout sucessfully");
};





