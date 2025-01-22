import type { Request, Response } from "express";
import { Task, TaskInput, taskSchema } from "../models/Task";

// creating a task
export const createTask = async (req: Request, res: Response) => {
  try {
    const validatedData = taskSchema.parse(req.body);
    const task = new Task(validatedData);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res
      .status(400)
      .json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
};

// getting all tasks
export const getTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await Task.find().sort({ timestamp: -1 });
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const validatedData = taskSchema.parse(req.body);
    const task = await Task.findByIdAndUpdate(req.params.id, validatedData, {
      new: true,
    });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    res
      .status(400)
      .json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
};
