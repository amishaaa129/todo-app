import { Router } from "express";
import {
    getAllUsers,
    getAllTasksAdmin,
    deleteAnyTask,
    promoteUserToAdmin
} from "../controllers/admin.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.use(verifyJWT, verifyAdmin);

router.route("/users")
.get(getAllUsers);

router.route("/tasks")
.get(getAllTasksAdmin);

router.route("/tasks/:id")
.delete(deleteAnyTask);

router.route("/users/:userId/promote")
.patch(promoteUserToAdmin);

export default router;