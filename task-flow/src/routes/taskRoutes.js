import { Router } from "express";
import {
  createTask,
  deleteTask,
  getHealth,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/taskController.js";
import { validateTask } from "../middlewares/validateTask.js";

const router = Router();

router.param("id", (req, res, next, id) => {
  const taskId = Number(id);

  if (!Number.isInteger(taskId) || taskId <= 0) {
    return res.status(400).json({
      status: "fail",
      message: "Task id must be a positive integer",
    });
  }

  req.taskId = taskId;
  next();
});

router.get("/", getHealth);
router.get("/api/v1/tasks", getTasks);
router.get("/api/v1/tasks/:id", getTask);
router.post("/api/v1/tasks", validateTask, createTask);
router.patch("/api/v1/tasks/:id", updateTask);
router.delete("/api/v1/tasks/:id", deleteTask);

export default router;
