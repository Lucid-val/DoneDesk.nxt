import React, { useState } from "react";
import { motion } from "framer-motion";

function Taskpane() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 2;
    const y = ((e.clientY - top) / height - 0.5) * 2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: newTask.trim(),
        completed: false,
      },
    ]);
    setNewTask("");
  };

  const handleClearInput = () => setNewTask("");

  const handleDeleteAll = () => setTasks([]);

  const toggleTaskCompletion = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-start min-h-[70vh] w-[95vw] md:w-[1100px] p-6 md:p-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20 overflow-hidden relative cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateY: position.x * 1,
        rotateX: position.y * -2,
        transition: { type: "spring", damping: 10, stiffness: 50 },
      }}
      style={{
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
    >
      {/* Inner glow */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/10 mix-blend-overlay" />

      <div className="relative z-10 w-full h-full">
        <form
          onSubmit={handleAddTask}
          className="flex items-center gap-3 mb-6 w-full"
        >
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 px-4 py-3 outline-none transition-all"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 font-light rounded-[50%] 
                     text-black dark:text-white 
                     bg-black/10 dark:bg-blue-400/10 
                     hover:text-blue-500 dark:hover:text-blue-400 
                     hover:bg-blue-400/20 dark:hover:bg-blue-400/20 
                     backdrop-blur-xl transition-all 
                     border border-blue-400"
              aria-label="Add task"
            >
              <i className="fa-solid fa-plus text-sm" />
            </button>

            <button
              type="button"
              onClick={handleClearInput}
              className="px-4 py-2 font-light rounded-[50%] 
                     text-black dark:text-white 
                     bg-black/10 dark:bg-yellow-300/10 
                     hover:text-yellow-500 dark:hover:text-yellow-300 
                     hover:bg-yellow-300/20 dark:hover:bg-yellow-300/20 
                     backdrop-blur-xl transition-all 
                     border border-yellow-300"
              aria-label="Clear input"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>

            <button
              type="button"
              onClick={handleDeleteAll}
              disabled={tasks.length === 0}
              className="px-4 py-2 font-light rounded-[50%] 
                     text-black dark:text-white 
                     bg-black/10 dark:bg-red-500/10 
                     hover:text-red-500 dark:hover:text-red-500 
                     hover:bg-red-500/20 dark:hover:bg-red-500/20 
                     backdrop-blur-xl transition-all 
                     border border-red-500"
              aria-label="Delete all tasks"
            >
              <i className="fa-solid fa-trash text-sm" />
            </button>
          </div>
        </form>

        <ul className="space-y-2 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between px-4 py-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
              onClick={() => toggleTaskCompletion(task.id)}
            >
              <span
                className={`${task.completed ? "line-through opacity-70" : ""}`}
              >
                {task.text}
              </span>
              <div className="flex gap-2">
                <button
                  className="p-1 text-green-400 hover:text-green-300"
                  aria-label="Complete task"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTaskCompletion(task.id);
                  }}
                >
                  <i
                    className={`fa-solid fa-check ${
                      task.completed ? "text-green-500" : ""
                    }`}
                  />
                </button>
                <button
                  className="p-1 text-red-400 hover:text-red-300"
                  aria-label="Delete task"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTasks((prev) => prev.filter((t) => t.id !== task.id));
                  }}
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {tasks.length === 0 && (
  <div className="text-center mt-6 flex flex-col items-center justify-center gap-2 animate-fade-in">
    <i className="fa-regular fa-rectangle-xmark text-4xl text-neutral-900 dark:text-white/70" />
    <p className="italic text-neutral-900 dark:text-white/90">
      Nothing here yet. Start adding your tasks.
    </p>
  </div>
)}



      {/* Dynamic reflection */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"
        animate={{
          opacity: (Math.abs(position.x) + Math.abs(position.y)) * 0.15,
          transition: { duration: 0.1, ease: "easeInOut" },
        }}
      />
    </motion.div>
  );
}

export default Taskpane;
