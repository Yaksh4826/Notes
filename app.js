import express from "express";
import env from "./config/config.js";
import authRouter from "./routes/auth_routes.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/admin_routes.js"
import taskRouter from "./routes/task.js";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/admin/users",  adminRouter);
app.use("/tasks", taskRouter);

app.listen(env.PORT);
