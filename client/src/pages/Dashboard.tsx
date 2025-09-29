import { useEffect, useState } from "react";
import API from "../api/api";
import ProjectCard from "../components/ProjectCard";

interface Project {
  _id: string;
  title: string;
  description: string;
  status: "active" | "completed";
}

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await API.get("/projects", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProjects(data);
      } catch {
        alert("Failed to fetch projects");
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="p-6 ">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
  PROJECTS
</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
