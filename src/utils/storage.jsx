// src/utils/storage.jsx
import { SEED } from "../data/initalTasks.jsx";

export function loadTasks() {
  try {
    const saved = localStorage.getItem("mini-jira-v2");
    return saved ? JSON.parse(saved) : SEED;
  } catch {
    return SEED;
  }
}