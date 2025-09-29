import Project from "../models/Project.js";

export const getProjects = async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.json(projects);
};

export const getProjectById = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
};

export const createProject = async (req, res) => {
  const { title, description, status } = req.body;
  const project = new Project({
    title,
    description,
    status,
    user: req.user._id,
  });
  await project.save();
  res.json(project);
};

export const updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
};

export const deleteProject = async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json({ message: "Project deleted" });
};
