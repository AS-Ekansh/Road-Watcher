import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

export default function Dashboard() {
  const { user } = useAuth();

  // Safely handle missing user
  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <h2 className="text-xl text-gray-300">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-4xl font-bold mb-6">
          Welcome, <span className="text-teal-300">{user.full_name}</span>
        </h1>

        <div className="grid gap-4 max-w-md">
          <Link
            to="/create-report"
            className="p-4 rounded-xl shadow bg-gradient-to-r from-blue-400 to-teal-400 text-white font-semibold hover:opacity-90"
          >
            Create Report
          </Link>

          <Link
            to="/my-reports"
            className="p-4 rounded-xl shadow bg-gradient-to-r from-green-400 to-emerald-400 text-white font-semibold hover:opacity-90"
          >
            My Reports
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/admin/reports"
              className="p-4 rounded-xl shadow bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-semibold hover:opacity-90"
            >
              Admin Dashboard
            </Link>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
