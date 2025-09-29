// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/User.js";
import Project from "./models/project.js";
import Task from "./models/task.js";

dotenv.config();

const seed = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("  Database connected");

    // Clear old data
    await User.deleteMany();
    await Project.deleteMany();
    await Task.deleteMany();
    console.log(" Old data cleared");

    // Create test user
    const hashedPassword = await bcrypt.hash("Test@123", 10);
    const user = await User.create({
      email: "test@example.com",
      password: hashedPassword,
    });

    // Create projects
    const project1 = await Project.create({
      title: "Project 1",
      description: "First project",
      status: "active",
      user: user._id,
    });
    const project2 = await Project.create({
      title: "Project 2",
      description: "Second project",
      status: "completed",
      user: user._id,
    });

    // Create tasks for each project
    await Task.create([
      // Project 1 tasks
      {
        title: "Task 1",
        description: "Task for project 1",
        status: "todo",
        dueDate: new Date(),
        project: project1._id,
      },
      {
        title: "Task 2",
        description: "Task for project 1",
        status: "in-progress",
        dueDate: new Date(),
        project: project1._id,
      },
      {
        title: "Task 3",
        description: "Task for project 1",
        status: "done",
        dueDate: new Date(),
        project: project1._id,
      },

      // Project 2 tasks
      {
        title: "Task 1",
        description: "Task for project 2",
        status: "todo",
        dueDate: new Date(),
        project: project2._id,
      },
      {
        title: "Task 2",
        description: "Task for project 2",
        status: "in-progress",
        dueDate: new Date(),
        project: project2._id,
      },
      {
        title: "Task 3",
        description: "Task for project 2",
        status: "done",
        dueDate: new Date(),
        project: project2._id,
      },
    ]);

    console.log(" Seed data created successfully");
    process.exit();
  } catch (error) {
    console.error(" Seed failed:", error);
    process.exit(1);
  }
};

seed();
