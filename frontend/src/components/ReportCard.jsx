export default function ReportCard({ report }) {
  return (
    <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-700 shadow-lg text-gray-200">
      
      {report.image_url && (
        <img
          src={report.image_url}
          className="w-full md:w-56 rounded-lg mb-3"
          alt="report"
        />
      )}

      <p className="text-lg font-semibold text-teal-300">{report.description}</p>

      <div className="mt-2 text-sm">
        <p><span className="text-gray-400">Status:</span> {report.status}</p>
        <p><span className="text-gray-400">Danger:</span> {report.danger_level}</p>

        {report.latitude && report.longitude && (
          <p className="text-gray-400 text-xs mt-1">
            {report.latitude}, {report.longitude}
          </p>
        )}
      </div>
    </div>
  );
}
