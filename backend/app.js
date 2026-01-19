import express from "express";
import env from "./config/config.js";
import authRouter from "./routes/auth_routes.js";
import userRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import adminRouter from "./routes/admin_routes.js"
import taskRouter from "./routes/task.js";
import cors from 'cors'


const app = express();
app.set("trust proxy", 1);

app.use(cors(  {
    origin: env.FRONTEND_URL || "http://localhost:5173", 
    credentials: true,              
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/admin/users", adminRouter);
app.use("/tasks", taskRouter);

app.listen(env.PORT);
