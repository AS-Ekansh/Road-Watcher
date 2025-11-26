export default function GradientButton({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-xl font-semibold text-white 
      bg-gradient-to-r from-blue-400 to-purple-400
      hover:opacity-90 transition shadow-lg ${className}`}
    >
      {children}
    </button>
  );
}
