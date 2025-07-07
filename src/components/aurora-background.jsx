"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

// Theme constants
const neoColors = {
  gradientFrom: "#00ccff",
  gradientVia: "#9e0cff",
  gradientTo: "#d08aff",
  baseBg: "#0a0a0a",
  opacity: 0.3,
};

const aeroColors = {
  gradientFrom: "#F8CF01",
  gradientVia: "#0AFAEB",
  gradientTo: "#0AFA22",
  baseBg: "#036CFF",
  opacity: 0.9,
};

export const AuroraBackground = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [0, window.innerHeight], [10, -10]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-10, 10]);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    setIsDark(document.documentElement.classList.contains("dark"));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const currentTheme = isDark ? neoColors : aeroColors;

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden flex"
      style={{
        perspective: 1000,
        backgroundColor: currentTheme.baseBg,
        color: isDark ? "white" : "black",
      }}
    >
      <motion.div
        className="absolute inset-0 blur-3xl"
        style={{
          background: `linear-gradient(to bottom right, ${currentTheme.gradientFrom}, ${currentTheme.gradientVia}, ${currentTheme.gradientTo})`,
          opacity: currentTheme.opacity,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      />
      <div className="relative z-10 w-full">{children}</div>
    </motion.div>
  );
};
