// routes/taskRoutes.js
import express from "express";
import {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask,
  getOneTask
} from "../controllers/taskController.js";
import  isLoggedIn  from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/", isLoggedIn, createTask);
router.get("/", isLoggedIn, getMyTasks);
router.get("/:id", isLoggedIn, getOneTask);
router.patch("/:id", isLoggedIn, updateTask);
router.delete("/:id", isLoggedIn, deleteTask);

export default router;
