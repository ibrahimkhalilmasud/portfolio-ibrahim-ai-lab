"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Project {
  name: string;
  description: string;
  tech: string[];
  github: string;
  accent: string;
  icon: string;
}

const projects: Project[] = [
  {
    name: "AI Virtual Try-On System",
    description:
      "AI-powered virtual clothing try-on using computer vision and pose estimation. Real-time garment fitting with photorealistic output.",
    tech: ["PyTorch", "OpenCV", "FastAPI", "React"],
    github: "https://github.com/ibrahimkhalilmasud",
    accent: "#00d4ff",
    icon: "👗",
  },
  {
    name: "Fabric-to-Model AI",
    description:
      "Generates photorealistic model images wearing fabric designs using Stable Diffusion and custom ComfyUI pipelines.",
    tech: ["Python", "Stable Diffusion", "ComfyUI", "PIL"],
    github: "https://github.com/ibrahimkhalilmasud",
    accent: "#a855f7",
    icon: "🎨",
  },
  {
    name: "E-commerce AI Platform",
    description:
      "Full-stack intelligent shopping platform with AI recommendations, automated catalog management, and smart search.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "Redis"],
    github: "https://github.com/ibrahimkhalilmasud",
    accent: "#00d4ff",
    icon: "🛍️",
  },
  {
    name: "AI Flipbook Maker",
    description:
      "Automated flipbook generation from videos using computer vision. Extracts key frames and applies artistic transformations.",
    tech: ["Python", "FFmpeg", "OpenCV", "PIL"],
    github: "https://github.com/ibrahimkhalilmasud",
    accent: "#a855f7",
    icon: "📚",
  },
  {
    name: "Intrusion Detection System",
    description:
      "Real-time AI security system using YOLO object detection for person tracking, anomaly detection, and alert generation.",
    tech: ["Python", "TensorFlow", "YOLO", "OpenCV"],
    github: "https://github.com/ibrahimkhalilmasud",
    accent: "#00d4ff",
    icon: "🔒",
  },
  {
    name: "AI Automation Suite",
    description:
      "Intelligent workflow automation systems that connect AI models to business processes, reducing manual work by 80%.",
    tech: ["n8n", "Python", "REST APIs", "Docker"],
    github: "https://github.com/ibrahimkhalilmasud",
    accent: "#a855f7",
    icon: "⚙️",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * -10;
    setTilt({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        setHovered(false);
      }}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.1s ease",
      }}
      className="relative rounded-xl overflow-hidden flex flex-col"
    >
      {/* Top accent border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 0.3s",
        }}
      />

      <div
        className="flex flex-col flex-1 p-6 rounded-xl"
        style={{
          background: hovered
            ? "rgba(255,255,255,0.04)"
            : "rgba(255,255,255,0.02)",
          border: `1px solid ${hovered ? project.accent + "40" : "rgba(255,255,255,0.06)"}`,
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease",
          boxShadow: hovered
            ? `0 0 30px ${project.accent}15, 0 20px 40px rgba(0,0,0,0.4)`
            : "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Icon + name */}
        <div className="flex items-start gap-3 mb-4">
          <span className="text-3xl">{project.icon}</span>
          <div>
            <h3
              className="font-bold text-lg leading-tight"
              style={{
                color: hovered ? project.accent : "#fff",
                transition: "color 0.3s",
                textShadow: hovered ? `0 0 20px ${project.accent}60` : "none",
              }}
            >
              {project.name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "#777" }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs font-mono rounded"
              style={{
                background: `${project.accent}10`,
                border: `1px solid ${project.accent}30`,
                color: project.accent,
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Button */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded text-sm font-medium transition-all duration-300 hover:scale-105 self-start"
          style={{
            background: hovered
              ? `linear-gradient(135deg, ${project.accent}, ${project.accent}99)`
              : "rgba(255,255,255,0.05)",
            border: `1px solid ${project.accent}40`,
            color: hovered ? "#000" : project.accent,
            transition: "all 0.3s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View Project
        </a>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-24 px-6"
      style={{ background: "#000" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="text-xs font-mono tracking-widest mb-4 block"
              style={{ color: "#00d4ff" }}
            >
              ◈ PORTFOLIO
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              AI Systems &{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Projects
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Production-ready AI systems spanning computer vision, fashion tech, and automation.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/ibrahimkhalilmasud"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 rounded text-sm font-medium transition-all hover:scale-105"
            style={{
              border: "1px solid rgba(0,212,255,0.3)",
              color: "#00d4ff",
              background: "rgba(0,212,255,0.05)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            See All Projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
