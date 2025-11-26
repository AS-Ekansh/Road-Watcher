export default function AdminReportCard({ report, onStatusChange }) {
  return (
    <div className="p-5 rounded-xl bg-neutral-900 border border-neutral-700 shadow-xl text-gray-200">

      <img
        src={report.image_url}
        className="w-full md:w-60 rounded-lg mb-4"
        alt="report"
      />

      <p className="text-xl font-semibold text-purple-300">{report.description}</p>

      <p className="text-sm text-gray-400 mb-1">
        Reported by: <span className="text-gray-300">{report.user?.full_name}</span>
      </p>

      <p className="text-sm text-gray-400 mb-3">
        Level: <span className="text-teal-300">{report.danger_level}</span>
      </p>

      <select
        defaultValue={report.status}
        onChange={(e) => onStatusChange(report._id, e.target.value)}
        className="w-full p-2 rounded bg-neutral-800 border border-neutral-700 text-gray-300"
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="solved">Solved</option>
      </select>
    </div>
  );
}
