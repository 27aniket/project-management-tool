import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

interface Project {
  _id: string;
  title: string;
  description: string;
  status: "active" | "completed";
}

interface Props {
  project: Project;
}

const ProjectCard: React.FC<Props> = ({ project }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await API.delete(`/projects/${project._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        navigate(0); // refresh page
      } catch {
        alert("Failed to delete project");
      }
    }
  };

  return (
    <div className="border p-4 rounded shadow hover:shadow-md">
      <h2 className="text-xl font-semibold">{project.title}</h2>
      <p>{project.description}</p>
      <p
  className={`mt-2 font-bold ${
    project.status === "completed" ? "text-green-600" : "text-orange-500"
  }`}
>
  {project.status}
</p>
      <div className="flex gap-4 mt-4">
        <Link to={`/project/${project._id}`} className="text-blue-500">
          View
        </Link>
        <Link to={`/edit-project/${project._id}`} className="text-yellow-600">
          Edit
        </Link>
        <button onClick={handleDelete} className="text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
