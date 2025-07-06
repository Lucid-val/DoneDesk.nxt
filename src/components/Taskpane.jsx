import React, { useState } from "react";
import { motion } from "framer-motion";

function Taskpane() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 2; // Range: -1 to 1
    const y = ((e.clientY - top) / height - 0.5) * 2; // Range: -1 to 1
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-start min-h-[70vh] w-[95vw] md:w-[1100px] p-6 md:p-10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl shadow-black shadow-2xl border border-white/20 overflow-hidden relative cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateY: position.x * 1,  // Tilt left/right based on X position
        rotateX: position.y * -2, // Tilt up/down based on Y position (negative for natural direction)
        transition: { type: "spring", damping: 10, stiffness: 50 }
      }}
      style={{
        transformStyle: "preserve-3d",
        transformPerspective: 1000
      }}
    >
      {/* Inner glow */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none border border-white/10 mix-blend-overlay" />
      
      {/* Content container */}
      <div className="relative z-10 w-full h-full">
        {/* Your taskpane content goes here */}
      </div>

      {/* Dynamic reflection */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/20 to-transparent"
        animate={{
          opacity: (Math.abs(position.x) + Math.abs(position.y)) * 0.1,
          transition: { duration: 0.1, ease: "easeInOut" }
        }}
      />
    </motion.div>
  );
}

export default Taskpane;