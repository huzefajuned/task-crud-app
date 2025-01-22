"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = void 0;
const Task_1 = require("../models/Task");
// creating a task
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = Task_1.taskSchema.parse(req.body);
        const task = new Task_1.Task(validatedData);
        yield task.save();
        res.status(201).json(task);
    }
    catch (error) {
        res
            .status(400)
            .json({
            error: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
});
exports.createTask = createTask;
// getting all tasks
const getTasks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.Task.find().sort({ timestamp: -1 });
        res.json(tasks);
    }
    catch (error) {
        res
            .status(500)
            .json({
            error: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
});
exports.getTasks = getTasks;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = Task_1.taskSchema.parse(req.body);
        const task = yield Task_1.Task.findByIdAndUpdate(req.params.id, validatedData, {
            new: true,
        });
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json(task);
    }
    catch (error) {
        res
            .status(400)
            .json({
            error: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task_1.Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res
            .status(500)
            .json({
            error: error instanceof Error ? error.message : "An unknown error occurred",
        });
    }
});
exports.deleteTask = deleteTask;
