import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/api";

const AddEditProject: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"active" | "completed">("active");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        try {
          const { data } = await API.get(`/projects/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          });
          setTitle(data.title);
          setDescription(data.description);
          setStatus(data.status);
        } catch {
          alert("Failed to load project");
        }
      };
      fetchProject();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = { title, description, status };
      if (id) {
        await API.put(`/projects/${id}`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      } else {
        await API.post("/projects", payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
      }
      navigate("/dashboard");
    } catch {
      alert("Failed to save project");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Edit Project" : "Add Project"}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          className="border p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value as "active" | "completed")}
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          {id ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default AddEditProject;
