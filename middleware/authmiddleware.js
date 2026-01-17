import jwt from "jsonwebtoken";
import env from "../config/config.js";

const isLoggedIn = (req, res, next) => {
  let token = req.cookies.token;
  // Verifying the token

  if(token===null || token===" " || token==undefined) return res.send({success:false, message:"You are not logged in"});
  else {
    let userData = jwt.verify(token, env.JWT_SECRET);
    req.user = userData;
    next();
  }
};


export  default isLoggedIn;
