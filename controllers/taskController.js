// controllers/taskController.js
import Task from "../models/taskModel.js";

/* CREATE TASK */
export const createTask = async (req, res) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      content: req.body.content,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      task
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* GET MY TASKS */
export const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      tasks
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

export const getOneTask = async (req, res) => {
  try {
    const task = await Task.findOne({_id:req.params.id});

    res.status(200).json({
      success: true,
      task
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};








/* UPDATE TASK */
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      task
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};

/* DELETE TASK */
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      deletedTask: task
    });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
};
