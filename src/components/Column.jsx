import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableTask from "./SortableTask";
import { COL_STYLE } from "../utils/constants";

function Column({
  title,
  tasks,
  filterPri,
  filterAss,
  onAdd,
  onEdit,
  onDelete,
}) {
  const s = COL_STYLE[title];

  const { setNodeRef, isOver } = useDroppable({
    id: title,
  });

  const filtered = tasks.filter((task) => {
    if (filterPri !== "All" && task.priority !== filterPri) return false;
    if (filterAss !== "All" && task.assignee !== filterAss) return false;
    return true;
  });

  return (
    <div className="flex flex-col w-[280px] flex-shrink-0">
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ background: s.dot }} />

          <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            {title}
          </span>

          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: s.countBg, color: s.countColor }}
          >
            {filtered.length}
          </span>
        </div>

        <button
          onClick={() => onAdd(title)}
          className="w-6 h-6 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors text-lg"
        >
          +
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 rounded-2xl p-2.5 min-h-[200px] transition-all duration-150 flex flex-col gap-2.5
        ${
          isOver
            ? "bg-indigo-50 dark:bg-indigo-950/20 ring-2 ring-indigo-400/40"
            : "bg-gray-50 dark:bg-gray-800/40"
        }`}
        style={{ borderTop: `2px solid ${s.dot}30` }}
      >
        <SortableContext
          items={filtered.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center flex-1 py-10 text-gray-300 dark:text-gray-600 text-xs gap-2">
              Drop tasks here
            </div>
          ) : (
            filtered.map((task) => (
              <SortableTask
                key={task.id}
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}

export default Column;