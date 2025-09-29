import express from "express";
import {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware);

// GET tasks for a project
router.get("/project/:projectId", getTasksByProject);

// CREATE a task
router.post("/", createTask);

// UPDATE a task
router.put("/:taskId", updateTask);

// DELETE a task
router.delete("/:taskId", deleteTask);

export default router;
