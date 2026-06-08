import { User } from "../models/user.model.js";
import { Task } from "../models/task.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find()
        .select("-password -refreshToken")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            users,
            "Users fetched successfully"
        )
    );
});

const getAllTasksAdmin = asyncHandler(async (req, res) => {
    const tasks = await Task.find()
        .populate("user", "fullname username email")
        .sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            tasks,
            "All tasks fetched successfully"
        )
    );
});

const deleteAnyTask = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(400, "Invalid task id");
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
        throw new ApiError(404, "Task not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            task,
            "Task deleted successfully"
        )
    );
});

const promoteUserToAdmin = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid user id");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.role = "admin";
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "User promoted to admin successfully"
        )
    );
});

export {
    getAllUsers,
    getAllTasksAdmin,
    deleteAnyTask,
    promoteUserToAdmin
};