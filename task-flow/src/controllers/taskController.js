import { readFile, writeFile } from "node:fs/promises";
import taskEvents from "../events/taskEvent.js";

const filePath = new URL("../data/task.json", import.meta.url);

const readTasks = async () => {
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data);
};

const writeTasks = async (tasks) => {
  await writeFile(filePath, JSON.stringify(tasks, null, 2), "utf-8");
};

export const getHealth = (req, res) => {
  res.send("taskflow is running");
};

export const getTasks = async (req, res, next) => {
  try {
    const { completed, priority, search } = req.query;

    if (
      completed !== undefined &&
      completed !== "true" &&
      completed !== "false"
    ) {
      return res.status(400).json({
        status: "fail",
        message: "completed must be true or false",
      });
    }

    if (
      priority !== undefined &&
      !["low", "medium", "high"].includes(priority)
    ) {
      return res.status(400).json({
        status: "fail",
        message: "priority must be low, medium, or high",
      });
    }

    const tasks = await readTasks();
    const filteredTasks = tasks.filter((task) => {
      const matchesCompleted =
        completed === undefined || task.completed === (completed === "true");
      const matchesPriority =
        priority === undefined || task.priority === priority;
      const matchesSearch =
        search === undefined ||
        task.title.toLowerCase().includes(search.toLowerCase());

      return matchesCompleted && matchesPriority && matchesSearch;
    });

    res.json(filteredTasks);
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const task = tasks.find((item) => item.id === req.taskId);

    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task Not Found",
      });
    }

    res.status(200).json({ status: "success", data: task });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const newTask = {
      id: Date.now(),
      title: req.body.title,
      completed: Boolean(req.body.completed),
      priority: req.body.priority || "medium",
    };

    tasks.push(newTask);
    await writeTasks(tasks);
    taskEvents.emit("task-created", newTask);

    res.status(201).json({ status: "success", data: newTask });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === req.taskId);

    if (taskIndex === -1) {
      return res
        .status(404)
        .json({ status: "fail", message: "Task not found" });
    }

    const updatedTask = {
      ...tasks[taskIndex],
      ...req.body,
      id: req.taskId,
    };

    tasks[taskIndex] = updatedTask;
    await writeTasks(tasks);
    res.status(200).json({ status: "success", data: updatedTask });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const tasks = await readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === req.taskId);

    if (taskIndex === -1) {
      return res
        .status(404)
        .json({ status: "fail", message: "Task not found" });
    }

    tasks.splice(taskIndex, 1);
    await writeTasks(tasks);
    res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
