"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "👔",
    title: "Virtual Dressing Technology",
    description:
      "Real-time AI clothing simulation powered by computer vision and deep learning. Users can virtually try on any garment with photorealistic accuracy, transforming how people shop for fashion online.",
    accent: "#00d4ff",
  },
  {
    icon: "🔬",
    title: "Intelligent Fabric Systems",
    description:
      "AI that deeply understands fabric texture, drape behavior, and fit characteristics. By analyzing material properties at a pixel level, the system can predict how garments will look and feel on any body type.",
    accent: "#7c3aed",
  },
  {
    icon: "🌐",
    title: "AI Fashion Ecosystem",
    description:
      "An end-to-end intelligent fashion platform connecting virtual try-on, personalized recommendations, automated catalog management, and AI-driven customer experiences into one seamless system.",
    accent: "#00d4ff",
  },
];

const timeline = [
  { year: "Today", label: "Foundation", desc: "Virtual try-on & fabric AI systems operational" },
  { year: "2025", label: "Scale", desc: "Multi-brand platform with 1M+ users" },
  { year: "2027", label: "Intelligence", desc: "Full AI fashion ecosystem live" },
  { year: "2030", label: "Revolution", desc: "AI replaces traditional product photography" },
];

export default function ResearchSection() {
  return (
    <section
      id="research"
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #000 0%, #050510 30%, #080010 70%, #000 100%)",
      }}
    >
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
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
              style={{ color: "#7c3aed" }}
            >
              ◈ VISION
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Future of{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                AI Fashion
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Building the infrastructure for the next generation of intelligent fashion experiences.
            </p>
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="p-8 rounded-xl relative overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${feature.accent}20`,
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 0%, ${feature.accent}08 0%, transparent 70%)`,
                }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${feature.accent}60, transparent)`,
                }}
              />

              <div className="text-5xl mb-6">{feature.icon}</div>
              <h3
                className="text-xl font-bold mb-4"
                style={{ color: feature.accent }}
              >
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#666" }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white">
              Roadmap to the Future
            </h3>
          </div>

          {/* Desktop timeline */}
          <div className="hidden md:flex items-start gap-0">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex-1 relative">
                {/* Connecting line */}
                {i < timeline.length - 1 && (
                  <div
                    className="absolute top-4 left-1/2 right-0 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, #00d4ff, rgba(0,212,255,0.2))",
                    }}
                  />
                )}

                <div className="flex flex-col items-center text-center px-4">
                  {/* Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.4 }}
                    className="w-8 h-8 rounded-full border-2 flex items-center justify-center mb-4 z-10 relative"
                    style={{
                      borderColor: "#00d4ff",
                      background: i === 0 ? "#00d4ff" : "#000",
                      boxShadow: "0 0 12px rgba(0,212,255,0.5)",
                    }}
                  >
                    {i === 0 && (
                      <div className="w-2 h-2 rounded-full bg-black" />
                    )}
                  </motion.div>

                  {/* Year badge */}
                  <span
                    className="text-sm font-bold mb-1 px-3 py-1 rounded-full font-mono"
                    style={{
                      background: "rgba(0,212,255,0.1)",
                      border: "1px solid rgba(0,212,255,0.3)",
                      color: "#00d4ff",
                    }}
                  >
                    {item.year}
                  </span>
                  <div className="text-white font-semibold mt-2 mb-1 text-sm">
                    {item.label}
                  </div>
                  <p className="text-xs" style={{ color: "#555" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile timeline */}
          <div className="md:hidden space-y-6">
            {timeline.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4 items-start"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-6 h-6 rounded-full border-2 flex-shrink-0"
                    style={{
                      borderColor: "#00d4ff",
                      background: i === 0 ? "#00d4ff" : "#000",
                    }}
                  />
                  {i < timeline.length - 1 && (
                    <div
                      className="w-px flex-1 min-h-[40px] mt-1"
                      style={{ background: "rgba(0,212,255,0.2)" }}
                    />
                  )}
                </div>
                <div>
                  <span
                    className="text-xs font-mono"
                    style={{ color: "#00d4ff" }}
                  >
                    {item.year}
                  </span>
                  <div className="text-white font-semibold text-sm mt-0.5">
                    {item.label}
                  </div>
                  <p className="text-xs mt-1" style={{ color: "#555" }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
