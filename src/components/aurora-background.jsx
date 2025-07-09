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
  const [isDark, setIsDark] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Create transforms after window size is known
  const rotateX = useTransform(mouseY, [0, windowSize.height], [10, -10]);
  const rotateY = useTransform(mouseX, [0, windowSize.width], [-10, 10]);

  // Theme detection
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Initial check
    setIsDark(document.documentElement.classList.contains("dark"));

    return () => observer.disconnect();
  }, []);

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const currentTheme = isDark ? neoColors : aeroColors;

  return (
    <motion.div
      className="relative w-full min-h-screen overflow-hidden flex"
      style={{
        perspective: 1000,
        backgroundColor: currentTheme.baseBg,
        color: isDark ? "white" : "black",
      }}
    >
      <motion.div
        className="absolute inset-0 blur-[100px] pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${currentTheme.gradientFrom} 0%, ${currentTheme.gradientVia} 50%, ${currentTheme.gradientTo} 100%)`,
          opacity: currentTheme.opacity,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};