"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface TimelineItem {
  period: string;
  title: string;
  description: string;
  tags: string[];
  side: "left" | "right";
}

const items: TimelineItem[] = [
  {
    period: "2024 — Present",
    title: "AI Research & Development",
    description:
      "Building advanced computer vision and AI systems. Developing Virtual Try-On technology, Fabric Intelligence AI, and intelligent automation platforms.",
    tags: ["Computer Vision", "PyTorch", "FastAPI", "R&D"],
    side: "right",
  },
  {
    period: "2023 — 2024",
    title: "Fashion AI Pioneer",
    description:
      "Developed pioneering AI systems for the fashion industry including Virtual Try-On systems and Fabric-to-Model AI that generates photorealistic model imagery.",
    tags: ["Fashion AI", "Stable Diffusion", "ComfyUI", "OpenCV"],
    side: "left",
  },
  {
    period: "2022 — 2023",
    title: "Full Stack Development",
    description:
      "Built full-stack e-commerce platforms with AI integration, REST APIs, and modern web technologies. Focused on scalable, production-ready systems.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "AWS"],
    side: "right",
  },
  {
    period: "2021 — 2022",
    title: "Computer Science Education",
    description:
      "University education in AI and software engineering. Deep dive into machine learning, algorithms, data structures, and applied mathematics.",
    tags: ["Machine Learning", "Algorithms", "Mathematics", "CS"],
    side: "left",
  },
  {
    period: "2020 — 2021",
    title: "Office Management",
    description:
      "Business operations and team coordination experience. Developed organizational, communication, and leadership skills in a professional environment.",
    tags: ["Operations", "Leadership", "Management", "Communication"],
    side: "right",
  },
];

function TimelineCard({ item, index }: { item: TimelineItem; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div
      ref={ref}
      className={`flex items-start gap-8 ${item.side === "left" ? "flex-row-reverse" : ""}`}
    >
      {/* Content card */}
      <motion.div
        initial={{ opacity: 0, x: item.side === "left" ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex-1 p-6 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(0,212,255,0.1)",
        }}
      >
        <div
          className="text-xs font-mono mb-2 tracking-wider"
          style={{ color: "#00d4ff" }}
        >
          {item.period}
        </div>
        <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#666" }}>
          {item.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded text-xs font-mono"
              style={{
                background: "rgba(0,212,255,0.05)",
                border: "1px solid rgba(0,212,255,0.15)",
                color: "#888",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Center dot + year */}
      <div className="flex flex-col items-center flex-shrink-0 w-20">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, type: "spring" }}
          className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-xs font-bold font-mono"
          style={{
            borderColor: "#00d4ff",
            background: "#000",
            color: "#00d4ff",
            boxShadow: "0 0 15px rgba(0,212,255,0.4)",
          }}
        >
          {(index + 1).toString().padStart(2, "0")}
        </motion.div>
      </div>

      {/* Spacer for other side */}
      <div className="flex-1 hidden md:block" />
    </div>
  );
}

export default function TimelineSection() {
  return (
    <section id="timeline" className="py-24 px-6" style={{ background: "#000" }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
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
              ◈ EXPERIENCE
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              The{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Journey
              </span>
            </h2>
            <p className="text-gray-500 text-lg">
              From business operations to AI research — a story of constant evolution.
            </p>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(0,212,255,0.3) 10%, rgba(0,212,255,0.3) 90%, transparent)",
            }}
          />

          <div className="space-y-12">
            {items.map((item, i) => (
              <TimelineCard key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
