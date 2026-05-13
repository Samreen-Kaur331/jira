import { useEffect, useRef, useState } from "react";
import { COLS } from "../utils/constants";
import { uid } from "../utils/helpers";

function Modal({ task, defaultStatus, onSave, onClose }) {
  const [title, setTitle] = useState(task?.title || "");
  const [priority, setPriority] = useState(task?.priority || "Medium");
  const [assignee, setAssignee] = useState(task?.assignee || "");
  const [status, setStatus] = useState(task?.status || defaultStatus || "Todo");
  const [err, setErr] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const save = () => {
    if (!title.trim()) {
      setErr("Title is required");
      return;
    }

    onSave({
      id: task?.id || uid(),
      title: title.trim(),
      priority,
      assignee: assignee.trim() || "Unassigned",
      status,
      order: task?.order ?? 99,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold">
            {task ? "Edit task" : "New task"}
          </h3>
          <button onClick={onClose}>✕</button>
        </div>

        <input
          ref={inputRef}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setErr("");
          }}
          placeholder="What needs to be done?"
          className="w-full px-3 py-2 rounded-xl border mb-2"
        />

        {err && <p className="text-xs text-red-500 mb-3">{err}</p>}

        <div className="grid grid-cols-2 gap-3 mb-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-3 py-2 rounded-xl border"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border"
          >
            {COLS.map((col) => (
              <option key={col}>{col}</option>
            ))}
          </select>
        </div>

        <input
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
          placeholder="Who's responsible?"
          className="w-full px-3 py-2 rounded-xl border mb-6"
        />

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl border">
            Cancel
          </button>

          <button
            onClick={save}
            className="flex-1 py-2 rounded-xl bg-indigo-600 text-white"
          >
            {task ? "Save changes" : "Create task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;