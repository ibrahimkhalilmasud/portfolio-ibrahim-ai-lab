"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const roles = [
  "AI Engineer",
  "Computer Vision Researcher",
  "Fashion AI Builder",
  "Technical Founder",
];

const stats = [
  { value: "10+", label: "AI Projects" },
  { value: "5+", label: "Years Research" },
  { value: "CV", label: "Specialist" },
  { value: "Fashion", label: "AI Pioneer" },
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Three.js particle field
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationId: number;
    let localRenderer: import("three").WebGLRenderer | null = null;

    (async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 60;

      localRenderer = new THREE.WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
      });
      localRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      localRenderer.setSize(window.innerWidth, window.innerHeight);
      localRenderer.setClearColor(0x000000, 0);

      // Particle field
      const count = 8000;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);

      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

        const blue = Math.random() > 0.7;
        const violet = Math.random() > 0.85;
        if (violet) {
          colors[i * 3] = 0.49;
          colors[i * 3 + 1] = 0.23;
          colors[i * 3 + 2] = 0.98;
        } else if (blue) {
          colors[i * 3] = 0;
          colors[i * 3 + 1] = 0.83;
          colors[i * 3 + 2] = 1;
        } else {
          colors[i * 3] = 0.4;
          colors[i * 3 + 1] = 0.4;
          colors[i * 3 + 2] = 0.4;
        }
        sizes[i] = Math.random() * 2 + 0.5;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.PointsMaterial({
        size: 0.4,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      });

      const particles = new THREE.Points(geometry, material);
      scene.add(particles);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        localRenderer?.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener("resize", onResize);

      const onMouseMove = (e: MouseEvent) => {
        mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("mousemove", onMouseMove);

      let time = 0;
      const animate = () => {
        animationId = requestAnimationFrame(animate);
        time += 0.0005;

        particles.rotation.y = time * 0.1 + mouseRef.current.x * 0.05;
        particles.rotation.x = mouseRef.current.y * 0.03;

        localRenderer?.render(scene, camera);
      };
      animate();

      return () => {
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouseMove);
        cancelAnimationFrame(animationId);
        geometry.dispose();
        material.dispose();
        localRenderer?.dispose();
      };
    })();

    return () => {
      cancelAnimationFrame(animationId);
      localRenderer?.dispose();
    };
  }, []);

  const nameLetters = "Muhammad Ibrahim Khalil".split("");

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #000 0%, #050510 100%)" }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(0,212,255,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Role tag */}
        <motion.div
          key={roleIndex}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full text-xs font-mono tracking-widest"
          style={{
            border: "1px solid rgba(0,212,255,0.3)",
            background: "rgba(0,212,255,0.05)",
            color: "#00d4ff",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse"
          />
          {roles[roleIndex]}
        </motion.div>

        {/* Name */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-none">
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.4, ease: "easeOut" }}
              style={{
                display: letter === " " ? "inline" : "inline-block",
                background:
                  i < 8
                    ? "linear-gradient(135deg, #ffffff, #aaaaaa)"
                    : "linear-gradient(135deg, #00d4ff 0%, #7c3aed 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "#888" }}
        >
          Building AI systems for{" "}
          <span style={{ color: "#00d4ff" }}>fashion</span>,{" "}
          <span style={{ color: "#a855f7" }}>automation</span>, and intelligent
          digital experiences.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="#lab"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("lab")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 rounded font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #0070f3)",
              color: "#000",
              boxShadow: "0 0 20px rgba(0,212,255,0.4)",
            }}
          >
            Explore AI Lab
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3.5 rounded font-semibold text-sm tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              border: "1px solid rgba(0,212,255,0.4)",
              color: "#00d4ff",
              background: "rgba(0,212,255,0.05)",
            }}
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div
                className="text-2xl sm:text-3xl font-bold"
                style={{ color: "#00d4ff" }}
              >
                {stat.value}
              </div>
              <div className="text-xs tracking-widest mt-1" style={{ color: "#555" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: "#444" }}
      >
        <span className="text-xs tracking-widest font-mono">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8"
          style={{ background: "linear-gradient(180deg, #00d4ff, transparent)" }}
        />
      </motion.div>

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #000 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
