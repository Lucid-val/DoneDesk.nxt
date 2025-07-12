import { useState, useEffect } from "react";
import { AuroraBackground } from "./components/aurora-background";
import Completed from "./components/Completed";
import Header from "./components/Header";
import Taskpane from "./components/Taskpane";
import Footer from "./components/Footer";

function App() {
  const storedTasks = JSON.parse(localStorage.getItem("donedesk_tasks") || "[]");
  const [tasks, setTasks] = useState(storedTasks);

  useEffect(() => {
    localStorage.setItem("donedesk_tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <AuroraBackground>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Completed tasks={tasks} />
        <main className="flex-grow flex items-center justify-center px-4">
          <Taskpane tasks={tasks} setTasks={setTasks} />
        </main>
        <Footer />
      </div>
    </AuroraBackground>
  );
}

export default App;
