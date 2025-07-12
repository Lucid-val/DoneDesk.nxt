"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export const AuroraBackground = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rotateX = useTransform(mouseY, [0, windowSize.height], [10, -10]);
  const rotateY = useTransform(mouseX, [0, windowSize.width], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between"
      style={{
        perspective: 1000,
        backgroundColor: "#000",
        color: "white",
      }}
    >
      <motion.div
        className="absolute inset-0 blur-[100px] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, #00ccff 0%, #9e0cff 50%, #d08aff 100%)",
          opacity: 0.3,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      />
      <div className="relative z-10 w-full h-full">{children}</div>
    </motion.div>
  );
};
