"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if we are hovering over an interactive element
      if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, mounted]);

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) return null;

  // Don't render cursor on mobile/touch devices
  if (window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Ambient Spotlight Effect (Visible in Dark Mode mainly, gives everything a subtle glow) */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[100] mix-blend-screen opacity-0 dark:opacity-100 transition-opacity duration-700 hidden md:block"
        animate={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(236,147,36,0.06), transparent 80%)`,
        }}
        transition={{ duration: 0 }}
      />
      
      {/* Physical Custom Cursor Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-8 h-8 rounded-full border border-[#ec9324]/50 hidden md:flex items-center justify-center shadow-[0_0_10px_rgba(236,147,36,0.3)]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "rgba(236,147,36,0.15)" : "transparent",
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-[#ec9324] rounded-full shadow-[0_0_5px_#ec9324]" 
          animate={{ scale: isHovering ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
