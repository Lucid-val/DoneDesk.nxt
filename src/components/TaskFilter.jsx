import React from "react";

function TaskFilter({ filter, setFilter }) {
  const filters = ["all", "pending", "completed"];

  return (
    <div className="flex justify-center gap-3 mb-2">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-4 py-1 rounded-full text-sm font-medium backdrop-blur-md transition-all
            ${filter === f
              ? "bg-blue-500/30 text-blue-200 border border-blue-500"
              : "bg-white/10 text-white/70 border border-white/20 hover:bg-white/20"}`}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
