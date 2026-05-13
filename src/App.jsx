import { useCallback, useEffect, useState } from "react";

import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { arrayMove } from "@dnd-kit/sortable";

import Header from "./components/Header";
import Column from "./components/Column";
import Modal from "./components/Modal";
import Toast from "./components/Toast";

import { COLS } from "./utils/constants";
import { loadTasks } from "./utils/storage";

function App() {
  const [tasks, setTasks] = useState(loadTasks);
  const [modal, setModal] = useState(null);
  const [filterPri, setFilterPri] = useState("All");
  const [filterAss, setFilterAss] = useState("All");
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  useEffect(() => {
    try {
      localStorage.setItem("mini-jira-v2", JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2800);
  };

  const pushHist = (prev) => {
    setHistory((h) => [...h.slice(-19), prev]);
  };

  const undo = useCallback(() => {
    if (!history.length) return;

    setTasks(history[history.length - 1]);
    setHistory((h) => h.slice(0, -1));
    showToast("Action undone ↩");
  }, [history]);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        undo();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [undo]);

  const saveTask = (task) => {
    pushHist(tasks);

    setTasks((prev) => {
      const exists = prev.find((t) => t.id === task.id);

      if (exists) {
        return prev.map((t) => (t.id === task.id ? { ...t, ...task } : t));
      }

      const col = prev.filter((t) => t.status === task.status);

      return [...prev, { ...task, order: col.length }];
    });

    setModal(null);

    const isEdit = tasks.find((t) => t.id === task.id);
    showToast(isEdit ? "Task updated ✓" : "Task created ✓");
  };

  const deleteTask = (id) => {
    pushHist(tasks);
    setTasks((prev) => prev.filter((task) => task.id !== id));
    showToast("Task deleted");
  };

  const tasksFor = (col) =>
    tasks
      .filter((task) => task.status === col)
      .sort((a, b) => a.order - b.order);

  const findTask = (id) => tasks.find((task) => task.id === id);

  const findColumn = (id) => {
    if (COLS.includes(id)) return id;

    const task = findTask(id);
    return task?.status;
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeTask = findTask(activeId);
    if (!activeTask) return;

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn) return;

    pushHist(tasks);

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];

      const oldIndex = updatedTasks.findIndex((task) => task.id === activeId);
      const newIndex = updatedTasks.findIndex((task) => task.id === overId);

      if (activeColumn === overColumn) {
        const columnTasks = updatedTasks
          .filter((task) => task.status === activeColumn)
          .sort((a, b) => a.order - b.order);

        const oldColumnIndex = columnTasks.findIndex(
          (task) => task.id === activeId
        );

        const newColumnIndex = columnTasks.findIndex(
          (task) => task.id === overId
        );

        const movedColumnTasks = arrayMove(
          columnTasks,
          oldColumnIndex,
          newColumnIndex
        ).map((task, index) => ({
          ...task,
          order: index,
        }));

        return updatedTasks.map((task) => {
          const changedTask = movedColumnTasks.find((t) => t.id === task.id);
          return changedTask || task;
        });
      }

      const movedTask = {
        ...activeTask,
        status: overColumn,
      };

      let withoutMovedTask = updatedTasks.filter(
        (task) => task.id !== activeId
      );

      const targetColumnTasks = withoutMovedTask
        .filter((task) => task.status === overColumn)
        .sort((a, b) => a.order - b.order);

      const overIndex = targetColumnTasks.findIndex(
        (task) => task.id === overId
      );

      if (overIndex >= 0) {
        targetColumnTasks.splice(overIndex, 0, movedTask);
      } else {
        targetColumnTasks.push(movedTask);
      }

      const reorderedTargetTasks = targetColumnTasks.map((task, index) => ({
        ...task,
        order: index,
      }));

      return withoutMovedTask
        .filter((task) => task.status !== overColumn)
        .concat(reorderedTargetTasks);
    });

    showToast("Task moved ✓");
  };

  const allAssignees = [
    "All",
    ...Array.from(new Set(tasks.map((task) => task.assignee))),
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <Header
        filterPri={filterPri}
        setFilterPri={setFilterPri}
        filterAss={filterAss}
        setFilterAss={setFilterAss}
        allAssignees={allAssignees}
        undo={undo}
        history={history}
        onNewTask={() => setModal({ mode: "add" })}
      />

      <main className="max-w-6xl mx-auto px-5 py-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-5 overflow-x-auto pb-4 items-start">
            {COLS.map((col) => (
              <Column
                key={col}
                title={col}
                tasks={tasksFor(col)}
                filterPri={filterPri}
                filterAss={filterAss}
                onAdd={(status) =>
                  setModal({ mode: "add", defaultStatus: status })
                }
                onEdit={(task) => setModal({ mode: "edit", task })}
                onDelete={deleteTask}
              />
            ))}
          </div>
        </DndContext>
      </main>

      {modal && (
        <Modal
          task={modal.task}
          defaultStatus={modal.defaultStatus || "Todo"}
          onSave={saveTask}
          onClose={() => setModal(null)}
        />
      )}

      {toast && <Toast message={toast} />}
    </div>
  );
}

export default App;