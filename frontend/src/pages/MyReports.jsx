import axios from "../api/axios";
import { useEffect, useState } from "react";
import ReportCard from "../components/ReportCard";
import Footer from "../components/Footer";

export default function MyReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("/reports/mine").then((res) => setReports(res.data.data));
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between p-6">
      <div>
        <h1 className="text-3xl font-bold mb-6">My Reports</h1>
        <div className="grid gap-4">
          {reports.map((r) => (
            <ReportCard key={r._id} report={r} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
