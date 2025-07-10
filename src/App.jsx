import { useState, useEffect } from "react";
import { AuroraBackground } from "./components/aurora-background";
import Completed from "./components/Completed";
import Header from "./components/Header";
import Taskpane from "./components/Taskpane";

function App() {
  // Move tasks state here
  const storedTasks = JSON.parse(localStorage.getItem("donedesk_tasks") || "[]");
  const [tasks, setTasks] = useState(storedTasks);

  useEffect(() => {
    localStorage.setItem("donedesk_tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <AuroraBackground>
      <Header />
      <Completed tasks={tasks} />
      <div className="flex items-center justify-center h-screen w-screen">
        <Taskpane tasks={tasks} setTasks={setTasks} />
      </div>
    </AuroraBackground>
  );
}

export default App;
