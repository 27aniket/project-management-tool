import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API from "../api/api";
import TaskCard from "../components/TaskCard";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  dueDate: string;
  project: string; 
}

interface Project {
  _id: string;
  title: string;
  description: string;
  status: "active" | "completed";
}

const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data: proj } = await API.get(`/projects/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setProject(proj);

        const { data: taskList } = await API.get(`/tasks/project/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTasks(taskList);
      } catch {
        alert("Failed to fetch project details");
      }
    };
    fetchDetails();
  }, [id]);

  return (
    <div className="p-6">
      {project && (
        <>
          <h1 className="text-2xl font-bold mb-2">{project.title}</h1>
          <p>{project.description}</p>
          <p className="font-bold mt-2">Status: {project.status}</p>

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Tasks</h2>
            <Link
              to={`/project/${id}/add-task`}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Task
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {tasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetails;
