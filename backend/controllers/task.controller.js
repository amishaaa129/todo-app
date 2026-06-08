import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const createTask = asyncHandler(async(req,res) => {
    const { title,description,dueDate,priority } = req.body;

    if (!title || title.trim() === "") {
        throw new ApiError(400, "title is required");
    }

    const task = await Task.create({
        title,description,priority,dueDate,user: req.user._id
    });

    return res
    .status(201)
    .json(new ApiResponse(201, task, "Blog created successfully"));
});

const updateTaskStatus = asyncHandler(async(req,res) => {
    const task = await Task.findOne({
        _id: req.params.id,
        user: req.user._id
    });

    if (!task) {
        throw new ApiError(404, "Task not found");
    };

    task.completed=!task.completed;
    await task.save();

    res.json(
        new ApiResponse(200, task, "Task status toggled")
    );
});

const deleteTask = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid task id");
    }

    const deletedTask = await Task.findOneAndDelete({
        _id: id,
        user: userId 
    });

    if (!deletedTask) {
        throw new ApiError(404, "Task not found");
    }

    res.status(200).json(
        new ApiResponse(200, deletedTask, "Task deleted successfully")
    );
});

const getAllTasks = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const { status } = req.query;

    const filter = { user: userId };

    if (status !== undefined) {
        if (status === "true") filter.completed = true;
        else if (status === "false") filter.completed = false;
        else {
        throw new ApiError(400, "status must be true or false");
        }
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 });

    res.status(200).json(
        new ApiResponse(200, tasks, "Tasks fetched successfully")
    );
});

export { createTask,updateTaskStatus,deleteTask,getAllTasks };