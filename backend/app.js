import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

import userRouter from './routes/user.route.js';
import taskRouter from './routes/task.route.js';
import adminRouter from "./routes/admin.route.js";

app.use("/api/v1/users",userRouter);
app.use("/api/v1/tasks",taskRouter);
app.use("/api/v1/admin", adminRouter);

export { app };