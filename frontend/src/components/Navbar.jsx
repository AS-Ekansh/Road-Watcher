import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
    navigate("/", { replace: true });
  };

  return (
    <div className="w-full flex justify-between items-center p-4 
      bg-neutral-900 border-b border-neutral-800 text-gray-200 shadow-lg">

      <Link
        to="/"
        className="font-bold text-xl bg-gradient-to-r from-teal-300 to-purple-400 text-transparent bg-clip-text"
      >
        RoadWatcher
      </Link>

      <div className="flex gap-4 font-medium">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-teal-300">Login</Link>
            <Link to="/register" className="hover:text-purple-300">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className="hover:text-teal-300">Dashboard</Link>

            <button
              onClick={handleLogout}
              disabled={loading}
              className="hover:text-red-400 disabled:opacity-50"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
