import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import AddEditProject from "./pages/AddEditProject";
import AddEditTask from "./pages/AddEditTask";

const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:id"
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-project"
          element={
            <ProtectedRoute>
              <AddEditProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-project/:id"
          element={
            <ProtectedRoute>
              <AddEditProject />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:id/add-task"
          element={
            <ProtectedRoute>
              <AddEditTask />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project/:id/edit-task/:taskId"
          element={
            <ProtectedRoute>
              <AddEditTask />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
