import { useState } from "react";
import axios from "../api/axios";
import Footer from "../components/Footer";

export default function CreateReport() {
  const [form, setForm] = useState({
    description: "",
    latitude: "",
    longitude: "",
    danger_level: "moderate",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const captureLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }));
        alert("Location captured!");
      },
      () => alert("Unable to access location.")
    );
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    if (image) fd.append("image", image);

    await axios.post("/reports", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setLoading(false);
    alert("Report Submitted!");
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6 flex flex-col justify-between">
      <div>
        <h1 className="text-3xl mb-6 font-bold">Create Report</h1>

        <form onSubmit={submit} className="flex flex-col gap-4 max-w-sm">

          <input
            className="border p-2 rounded bg-neutral-800 text-gray-200"
            placeholder="Description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <div className="flex gap-2">
            <input
              className="border p-2 rounded bg-neutral-800 text-gray-200 w-1/2"
              placeholder="Latitude"
              value={form.latitude}
              readOnly
            />
            <input
              className="border p-2 rounded bg-neutral-800 text-gray-200 w-1/2"
              placeholder="Longitude"
              value={form.longitude}
              readOnly
            />
          </div>

          <button
            type="button"
            onClick={captureLocation}
            className="p-2 rounded bg-gradient-to-r from-blue-400 to-teal-400 text-white font-semibold shadow"
          >
            Capture My Location
          </button>

          <select
            className="border p-2 rounded bg-neutral-800 text-gray-200"
            onChange={(e) =>
              setForm({ ...form, danger_level: e.target.value })
            }
          >
            <option value="moderate">Moderate</option>
            <option value="severe">Severe</option>
          </select>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="text-gray-300"
          />

          <button
            disabled={loading}
            className={`p-2 rounded bg-gradient-to-r from-purple-400 to-pink-400 text-white font-semibold shadow
            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}
