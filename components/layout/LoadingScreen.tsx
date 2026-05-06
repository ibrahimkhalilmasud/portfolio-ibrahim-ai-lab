"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState(0);

  const phases = [
    "INITIALIZING AI SYSTEMS...",
    "LOADING NEURAL NETWORKS...",
    "CALIBRATING VISION MODULES...",
    "SYSTEM READY",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return prev + 1.5;
      });
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 30) setPhase(0);
    else if (progress < 60) setPhase(1);
    else if (progress < 85) setPhase(2);
    else setPhase(3);
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,212,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.3) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#00d4ff] opacity-60" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#00d4ff] opacity-60" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-[#00d4ff] opacity-60" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[#00d4ff] opacity-60" />

          <div className="relative z-10 flex flex-col items-center gap-8 px-8 max-w-lg w-full">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div
                className="text-5xl font-bold tracking-widest mb-2"
                style={{
                  background: "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                IBRAHIM
              </div>
              <div className="text-xs tracking-[0.4em] text-[#888] uppercase">
                AI Laboratory
              </div>
            </motion.div>

            {/* Status text */}
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-mono text-[#00d4ff] tracking-widest text-center"
            >
              {phases[phase]}
            </motion.div>

            {/* Progress bar container */}
            <div className="w-full">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-mono text-[#555]">PROGRESS</span>
                <span className="text-xs font-mono text-[#00d4ff]">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="w-full h-px bg-[#1a1a1a] relative overflow-hidden">
                <motion.div
                  className="h-full absolute left-0 top-0"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #00d4ff, #7c3aed)",
                    boxShadow: "0 0 10px rgba(0,212,255,0.8)",
                  }}
                />
              </div>
              <div className="mt-1 w-full h-px bg-[#0a0a0a]" />
            </div>

            {/* Scanning line effect */}
            <div className="w-full h-24 relative overflow-hidden border border-[#1a1a1a]">
              <motion.div
                className="absolute left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ boxShadow: "0 0 8px rgba(0,212,255,0.6)" }}
              />
              <div className="p-3 font-mono text-xs text-[#333] space-y-1">
                <div>{">"} Loading computer vision modules...</div>
                <div>{">"} Initializing fashion AI systems...</div>
                <div>{">"} Connecting neural networks...</div>
                {progress > 60 && <div className="text-[#00d4ff]">{">"} Systems online</div>}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
