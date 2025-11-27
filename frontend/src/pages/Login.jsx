import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
    nav("/dashboard");
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between">
      <div className="flex justify-center items-center flex-1 p-6">
        <form onSubmit={submit} className="bg-neutral-900 p-6 rounded-xl shadow-xl w-80 border border-neutral-800">

          <h2 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-teal-300 to-purple-400 bg-clip-text text-transparent">
            Login
          </h2>

          <input
            className="w-full p-3 mb-4 rounded bg-neutral-800 border border-neutral-700 text-gray-200"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password + Eye Toggle */}
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 rounded bg-neutral-800 border border-neutral-700 text-gray-200"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-3 top-3 cursor-pointer text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>

          <button
            disabled={loading}
            className={`w-full p-3 rounded bg-gradient-to-r from-blue-400 to-teal-400 text-white font-semibold 
            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
