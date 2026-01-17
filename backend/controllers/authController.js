import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import env from "../config/config.js";

export const registerUser = async function (req, res) {
  let { fullName, email, password } = req.body;


  // First we need to check if the email exists or not
  let user = await userModel.findOne({ email: email });

  if (user) {
    return res.send({
      success: false,
      message: "Account already exists,"
    })
  }
  else {





    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        // Storing the user
        let user = await userModel.create({
          fullName: fullName,
          email: email,
          password: hash,
        });


        let data = { success: true, fullName: user.fullName, email: user.email, message: "Successfully created account" }

        let token = jwt.sign({ id: user._id }, env.JWT_SECRET);
        res.cookie("token", token);
        res.send(data);
      });
    });
  }
};

export const loginUser = async (req, res) => {
  let { email, password } = req.body;
  // First we need to check if the email exists or not
  let user = await userModel.findOne({ email: email });

  if (!user) {
    return res.send({
      success: false,
      message: "something went wrong"
    });
  } else {
    // Now checking if that user's original password matches the current entered

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        // setting the token
        let token = jwt.sign({ id: user._id }, env.JWT_SECRET);
        res.cookie("token", token);
        return res.send({ success: true, fullName: user.fullName, email: user.email, id: user._id, message: "Logged in successfully" });
      } else {
        return res.send({ success: false, message: "Invalid Password" });
      }
    });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};






