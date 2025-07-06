"use client";
import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export const AuroraBackground = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const rotateX = useTransform(mouseY, [0, window.innerHeight], [10, -10]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-10, 10]);

  return (
    <div className="relative w-full min-h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Aurora Layer */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#00ccff] via-[#9e0cff] to-[#d08aff] opacity-30 blur-3xl pointer-events-none"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
      />
      
      {/* App Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
