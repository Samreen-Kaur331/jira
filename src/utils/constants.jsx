export const COLS = ["Todo", "In Progress", "Done"];

export const COL_STYLE = {
  Todo: { dot: "#6366f1", countBg: "rgba(99,102,241,0.12)", countColor: "#6366f1" },
  "In Progress": { dot: "#f59e0b", countBg: "rgba(245,158,11,0.12)", countColor: "#d97706" },
  Done: { dot: "#10b981", countBg: "rgba(16,185,129,0.12)", countColor: "#059669" },
};

export const PRI = {
  Low: { bg: "rgba(16,185,129,0.1)", color: "#059669", dot: "#10b981" },
  Medium: { bg: "rgba(245,158,11,0.1)", color: "#d97706", dot: "#f59e0b" },
  High: { bg: "rgba(239,68,68,0.1)", color: "#dc2626", dot: "#ef4444" },
};