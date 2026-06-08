import { Router } from "express";
import { logoutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createTask } from "../controllers/task.controller.js";

const router = Router();

router.route('/signup').post(registerUser);
router.route('/login').post(loginUser);

router.route('/logout').post(verifyJWT,logoutUser);
router.route('/refresh-token').post(refreshAccessToken);

export default router;