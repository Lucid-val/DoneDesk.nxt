import { motion } from "framer-motion";

function WelcomeMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          damping: 10,
          stiffness: 100,
        },
      }}
      exit={{
        opacity: 0,
        y: -40,
        scale: 0.95,
        transition: { duration: 0.4 },
      }}
      className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black/60 backdrop-blur-sm text-center px-6"
    >
      <div className="max-w-2xl space-y-4">
        <motion.h1
          className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Welcome to DoneDesk.nxt
        </motion.h1>

        <motion.p
          className="mt-2 text-lg md:text-xl font-light text-white/80"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Your sleek, local-first productivity hub.
        </motion.p>

        <motion.div
          className="mt-6 h-1 w-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1.5, ease: "anticipate" }}
        />
      </div>
    </motion.div>
  );
}

export default WelcomeMessage;
