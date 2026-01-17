import express from "express";
import isLoggedIn from "../middleware/authmiddleware.js"
import { deleteMyProfile, getMyProfile, updateMyProfile } from "../controllers/userController.js";


const router = express.Router();

// Making the rotues for currently logged in user

// user.routes.js
router.get("/me", isLoggedIn, getMyProfile);
router.patch("/me", isLoggedIn, updateMyProfile);
router.delete("/me" , isLoggedIn, deleteMyProfile)

















export default router;
