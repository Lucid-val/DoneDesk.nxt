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
    <motion.div
      className="relative w-full h-screen z-0 overflow-hidden bg-neutral-950 text-white flex"
      style={{
        perspective: 1000,
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#00ccff] via-[#9e0cff] to-[#d08aff] opacity-30 blur-3xl"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
