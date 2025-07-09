import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Taskpane() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const storedTasks = JSON.parse(localStorage.getItem("donedesk_tasks") || "[]");
  const [tasks, setTasks] = useState(storedTasks);
  
  const storedTheme = localStorage.getItem("donedesk_theme") || "aero";
  const [theme, setTheme] = useState(storedTheme);

  useEffect(() => {
    localStorage.setItem("donedesk_theme", theme);
  }, [theme]);
  

  useEffect(() => {
    localStorage.setItem("donedesk_tasks", JSON.stringify(tasks));
  }, [tasks]);


  const handleMouseMove = (e) => {
    if (window.innerWidth > 768) {
      const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 2;
      const y = ((e.clientY - top) / height - 0.5) * 2;
      setPosition({ x, y });
    }
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
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]);
    setNewTask("");
  };

  const handleClearInput = () => setNewTask("");
  

  const toggleTaskCompletion = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditSave = (id) => {
    if (!editedText.trim()) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, text: editedText.trim(), updatedAt: new Date().toISOString() }
          : task
      )
    );
    setEditingId(null);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-start min-h-[70vh] w-[92vw] p-4 md:p-6 lg:p-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/20 overflow-hidden relative cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateY: window.innerWidth > 768 ? position.x * 1 : 0,
        rotateX: window.innerWidth > 768 ? position.y * -2 : 0,
        transition: { type: "spring", damping: 10, stiffness: 50 },
      }}
      style={{
        transformStyle: "preserve-3d",
        transformPerspective: window.innerWidth > 768 ? 1000 : 0,
      }}
    >
      <div className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none border border-white/10 mix-blend-overlay" />

      <div className="relative z-10 w-full h-full">
        <form
          onSubmit={handleAddTask}
          className="flex flex-col md:flex-row items-center gap-3 mb-4 md:mb-6 w-full"
        >
          <input
            type="text"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 w-full px-4 py-3 text-sm md:text-base outline-none placeholder:text-white/60"
          />
          <div className="flex gap-2 w-full md:w-auto justify-center">
            <button
              type="submit"
              className="px-4 py-2 rounded-[50%] bg-blue-400/10 hover:bg-blue-400/20 border border-blue-400/30 hover:border-blue-400/50 hover:text-blue-500 dark:hover:text-blue-600 backdrop-blur-md transition-all"
              aria-label="Add task"
            >
              <i className="fa-solid fa-plus text-sm" />
            </button>
            <button
              type="button"
              onClick={handleClearInput}
              className="px-4 py-2 rounded-[50%] bg-yellow-300/10 hover:bg-yellow-300/20 border border-yellow-300/30 hover:border-yellow-300/50 hover:text-yellow-500 dark:hover:text-yellow-300  backdrop-blur-md transition-all"
              aria-label="Clear input"
            >
              <i className="fa-solid fa-xmark text-sm" />
            </button>
            <button
              type="button"
              onClick = {() => setShowDeleteModal(true)}
              disabled={tasks.length === 0}
              className={`px-4 py-2 rounded-[50%] ${
                tasks.length === 0 ? "opacity-50 cursor-not-allowed" : ""
              } bg-red-500/10 hover:bg-red-500/20 border hover:text-red-500 dark:hover:text-red-500 border-red-500/30 hover:border-red-500/50 backdrop-blur-md transition-all`}
              aria-label="Delete all tasks"
            >
              <i className="fa-solid fa-trash text-sm" />
            </button>
          </div>
        </form>

        <ul className="space-y-2 max-h-[55vh] md:max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
          {tasks.map((task) => (
            <motion.li
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between px-3 py-1 md:px-4 md:py-2 rounded-lg hover:bg-white/10 transition-all cursor-pointer"
              onClick={() => toggleTaskCompletion(task.id)}
            >
              <div className="flex-1 mr-4">
                {editingId === task.id ? (
                  <input
                    type="text"
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onBlur={() => handleEditSave(task.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.target.blur();
                    }}
                    autoFocus
                    className="w-full bg-transparent border-b border-white/20 outline-none text-white"
                  />
                ) : (
                  <>
                    <p className={`${task.completed ? "line-through opacity-70" : ""}`}>
                      {task.text}
                    </p>
                    <p className="text-[10px] italic text-white mt-1">
                      Created: {new Date(task.createdAt).toLocaleString()}
                    </p>
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  className="p-1 mx-2 text-green-600 hover:text-green-900"
                  aria-label="Complete task"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTaskCompletion(task.id);
                  }}
                >
                  <i className={`fa-solid fa-check md:text-sm`} />
                </button>

                <button
                  className="p-1 mx-2 text-yellow-400 hover:text-yellow-300"
                  aria-label="Edit task"
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingId(task.id);
                    setEditedText(task.text);
                  }}
                >
                  <i className="fa-solid fa-pen" />
                </button>

                <button
                  className="p-1  text-red-400 hover:text-red-300"
                  aria-label="Delete task"
                  onClick={(e) => {
                    e.stopPropagation();
                    setTasks((prev) => prev.filter((t) => t.id !== task.id));
                  }}
                >
                  <i className="fa-solid fa-trash md:text-sm" />
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      {showDeleteModal && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      className="bg-white/10 dark:bg-black/20 border border-white/20 rounded-2xl backdrop-blur-lg p-6 w-[90%] md:w-[400px] text-center shadow-xl"
    >
      <h2 className="text-lg font-semibold text-white mb-4">
        Delete all tasks?
      </h2>
      <p className="text-sm text-white/70 mb-6">
        This action cannot be undone. Are you sure?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => {
            setTasks([]);
            setShowDeleteModal(false);
          }}
          className="px-4 py-2 bg-red-500/30 hover:bg-red-500/50 text-white rounded-lg transition-all"
        >
          Yes, Delete
        </button>
        <button
          onClick={() => setShowDeleteModal(false)}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
        >
          Cancel
        </button>
      </div>
    </motion.div>
  </div>
)}








      {tasks.length === 0 && (
        <div className="text-center mt-6 flex flex-col items-center justify-center gap-2 animate-fade-in">
          <i className="fa-regular fa-rectangle-xmark text-3xl md:text-7xl text-neutral-800 dark:text-white/60" />
          <p className="italic text-sm md:text-base text-neutral-900 dark:text-white/90">
            Nothing here yet. Start adding your tasks.
          </p>
        </div>
      )}

      {window.innerWidth > 768 && (
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"
          animate={{
            opacity: (Math.abs(position.x) + Math.abs(position.y)) * 0.15,
            transition: { duration: 0.1, ease: "easeInOut" },
          }}
        />
      )}
    </motion.div>
  );
}

export default Taskpane;
