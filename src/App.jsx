import { useEffect, useState } from "react";
import { AuroraBackground } from "./components/aurora-background";
import { motion, AnimatePresence } from "framer-motion";
import Header from "./components/Header";

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(false), 2000); // 2s
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuroraBackground>
      <div className={showWelcome ? "filter blur-sm transition-all duration-500" : "transition-all duration-500"}>
        <Header />
      </div>

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black/40 text-center text-white dark:text-white px-6"
          >
            <h1 className="text-4xl md:text-6xl">Welcome to DoneDesk.nxt</h1>
            <p className="mt-2 text-base md:text-lg font-light">
              Your sleek, local-first productivity hub.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuroraBackground>
  );
}

export default App;
