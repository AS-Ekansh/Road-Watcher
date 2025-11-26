import { Link } from "react-router-dom";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between">
      <div className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20">
        <h1 className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-teal-300 to-purple-400 bg-clip-text text-transparent">
          RoadWatcher
        </h1>

        <p className="max-w-2xl text-lg text-gray-300 mb-6 leading-relaxed">
          RoadWatcher helps citizens report potholes, broken dividers, damaged signboards,
          flooding zones, and any road danger instantly. Together, we create safer roads.
        </p>

        <div className="flex gap-4">
          <Link className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-400 to-teal-400 font-semibold shadow-lg" to="/login">
            Login
          </Link>

          <Link className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-400 to-pink-400 font-semibold shadow-lg" to="/register">
            Register
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
