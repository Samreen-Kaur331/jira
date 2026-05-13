import { uid } from "../utils/helpers.jsx";

export const SEED = [
  { id: uid(), title: "Set up project scaffolding", priority: "High", assignee: "Alex", status: "Done", order: 0 },
  { id: uid(), title: "Design system tokens", priority: "Medium", assignee: "Jamie", status: "Done", order: 1 },
  { id: uid(), title: "Build Kanban board layout", priority: "High", assignee: "Alex", status: "In Progress", order: 0 },
  { id: uid(), title: "Implement drag and drop", priority: "High", assignee: "Taylor", status: "In Progress", order: 1 },
  { id: uid(), title: "Write unit tests", priority: "Low", assignee: "Morgan", status: "Todo", order: 0 },
  { id: uid(), title: "Add task filters", priority: "Medium", assignee: "Jamie", status: "Todo", order: 1 },
  { id: uid(), title: "Polish UI and animations", priority: "Low", assignee: "Taylor", status: "Todo", order: 2 },
];