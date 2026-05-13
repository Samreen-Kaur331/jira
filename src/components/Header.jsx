function Header({
  filterPri,
  setFilterPri,
  filterAss,
  setFilterAss,
  allAssignees,
  undo,
  history,
  onNewTask,
}) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b">
      <div className="max-w-6xl mx-auto px-5 h-14 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xs font-black">
            J
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
              Mini Jira
            </p>
            <p className="text-[10px] text-gray-400">Issue Tracker</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1 gap-0.5">
            {["All", "Low", "Medium", "High"].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPri(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold
                ${filterPri === p ? "bg-white dark:bg-gray-900 shadow-sm" : "text-gray-400"}`}
              >
                {p}
              </button>
            ))}
          </div>

          <select
            value={filterAss}
            onChange={(e) => setFilterAss(e.target.value)}
            className="px-3 py-1.5 rounded-xl border text-xs"
          >
            {allAssignees.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>

          <button
            onClick={undo}
            disabled={!history.length}
            className="px-3 py-1.5 rounded-xl border text-xs disabled:opacity-30"
          >
            ↩ Undo
          </button>

          <button
            onClick={onNewTask}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 text-xs font-semibold text-white"
          >
            + New Task
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;