import { PRI } from "../utils/constants";

function TaskCard({ task, onEdit, onDelete, isDragging }) {
  const p = PRI[task.priority];

  return (
    <div
      className={`group relative rounded-xl border p-3.5 cursor-grab active:cursor-grabbing transition-all duration-150 select-none
      ${isDragging
        ? "opacity-40 border-dashed border-indigo-400 bg-indigo-50 dark:bg-indigo-950/30"
        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold"
          style={{ background: p.bg, color: p.color }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.dot }} />
          {task.priority}
        </span>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className="w-6 h-6 rounded-md text-gray-400 hover:bg-indigo-50 hover:text-indigo-500 text-xs"
          >
            ✎
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className="w-6 h-6 rounded-md text-gray-400 hover:bg-red-50 hover:text-red-500 text-xs"
          >
            ✕
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-200 leading-snug mb-3">
        {task.title}
      </p>

      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[10px] font-bold">
          {task.assignee[0].toUpperCase()}
        </div>
        <span className="text-xs text-gray-400">{task.assignee}</span>
      </div>
    </div>
  );
}

export default TaskCard;