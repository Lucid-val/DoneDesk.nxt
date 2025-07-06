import { AuroraBackground } from "./components/aurora-background";
import Header from "./components/Header";
import Taskpane from "./components/Taskpane";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <AuroraBackground >
      <Header />
      <ThemeToggle />
      <div className="flex items-center justify-center h-screen w-screen">
        <Taskpane />
      </div>
    </AuroraBackground>
  );
}

export default App;
