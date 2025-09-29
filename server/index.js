import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
import connectDb from './config/db.js';
import authRoutes from "./routers/authRoutes.js"; 
import projectRoutes from "./routers/projectRoutes.js";
import taskRoutes from "./routers/taskRoutes.js"


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); 
app.use("/api/projects", projectRoutes);
app.use("/api/tasks",taskRoutes);


app.listen(PORT, () => {
    connectDb();
    console.log(`Server running on port ${PORT}`)
});

