import { Router } from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTaskStatus
} from "../controllers/task.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create").post(verifyJWT, createTask);
router.route("/").get(verifyJWT, getAllTasks);
router.route("/:id").patch(verifyJWT, updateTaskStatus);
router.route("/:id").delete(verifyJWT, deleteTask);

export default router;