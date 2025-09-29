import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  dueDate: string;
}

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await API.delete(`/tasks/${task._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        navigate(0); // refresh page
      } catch {
        alert("Failed to delete task");
      }
    }
  };

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      <div className="flex gap-4 mt-4">
        <Link to={`/project/${id}/edit-task/${task._id}`} className="text-yellow-600">
          Edit
        </Link>
        <button onClick={handleDelete} className="text-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
