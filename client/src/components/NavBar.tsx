import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-purple-400 via-purple-500 to-blue-500  p-4 text-white flex justify-between items-center">
      <Link to="/dashboard" className="font-bold text-lg">
        Project Manager Tool 
      </Link>
      <div className="flex gap-4">
        {token ? (
          <>
            <Link to="/add-project" className="hover:underline">
              Add Project
            </Link>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
