import axios from "../api/axios";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    axios.get("/reports").then((res) => setReports(res.data.data));
  }, []);

  const updateStatus = async (id, status) => {
    setLoadingId(id);
    await axios.patch(`/reports/${id}`, { status });
    setLoadingId(null);
    alert("Updated!");
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-4xl mb-6 font-bold">Admin Dashboard</h1>

        <div className="grid gap-6">
          {reports.map((r) => (
            <div
              key={r._id}
              className="p-4 rounded-xl bg-neutral-900 shadow border border-neutral-700"
            >
              <img src={r.image_url} className="w-48 rounded mb-3" />

              <p className="font-semibold text-teal-300">{r.description}</p>
              <p className="text-sm text-gray-400 mb-2">
                By: {r.user?.full_name}
              </p>

              <select
                className="border p-2 rounded bg-neutral-800 text-gray-300"
                defaultValue={r.status}
                disabled={loadingId === r._id}
                onChange={(e) => updateStatus(r._id, e.target.value)}
              >
                {loadingId === r._id ? (
                  <option>Updating...</option>
                ) : (
                  <>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="solved">Solved</option>
                  </>
                )}
              </select>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
