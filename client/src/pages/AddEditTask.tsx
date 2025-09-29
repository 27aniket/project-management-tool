import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

const AddTask: React.FC = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"todo" | "in-progress" | "done">("todo");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !projectId) {
      alert("Title and project are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/tasks",
        {
          title,
          description,
          status,
          dueDate,
          project: projectId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate(`/project/${projectId}`); 
    } catch (error) {
      console.error(error);
      alert("Failed to save task");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add Task</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "todo" | "in-progress" | "done")}
          className="border p-2 rounded"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In-Progress</option>
          <option value="done">Done</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Save Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;

