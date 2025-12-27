import express from "express";
import isLoggedIn from "../middleware/authmiddleware.js";
import isAdmin from "../middleware/rolemiddleware.js"
import { getAllUsers, getUserById,deleteUser } from "../controllers/adminController.js";
const router  =  express.Router();


// Get all the users
router.get("/", isLoggedIn, isAdmin, getAllUsers);
router.get("/:id", isLoggedIn, isAdmin, getUserById);
router.delete('/:id', isLoggedIn, isAdmin,deleteUser);









export default router;
