"use client";

import { motion } from "framer-motion";

const languages = [
  { name: "Python", percent: 60, color: "#00d4ff" },
  { name: "TypeScript", percent: 20, color: "#7c3aed" },
  { name: "JavaScript", percent: 10, color: "#f97316" },
  { name: "Other", percent: 10, color: "#22c55e" },
];

const stats = [
  { value: "15+", label: "Repositories" },
  { value: "50+", label: "Stars" },
  { value: "500+", label: "Contributions" },
  { value: "4", label: "Languages" },
];

const featuredRepos = [
  {
    name: "ai-virtual-tryon",
    desc: "AI-powered virtual clothing try-on using computer vision",
    lang: "Python",
    langColor: "#00d4ff",
    stars: 12,
  },
  {
    name: "fabric-to-model-ai",
    desc: "Generate model images wearing fabric designs with Stable Diffusion",
    lang: "Python",
    langColor: "#00d4ff",
    stars: 8,
  },
  {
    name: "ecommerce-ai-platform",
    desc: "Full-stack intelligent e-commerce platform",
    lang: "TypeScript",
    langColor: "#7c3aed",
    stars: 15,
  },
  {
    name: "intrusion-detection-ai",
    desc: "Real-time AI security system with YOLO object detection",
    lang: "Python",
    langColor: "#00d4ff",
    stars: 10,
  },
];

// Simple contribution heatmap - static visual data
const heatmapData = Array.from({ length: 52 * 7 }, (_, i) => {
  const rand = Math.random();
  if (rand > 0.7) return 3;
  if (rand > 0.5) return 2;
  if (rand > 0.35) return 1;
  return 0;
});

function HeatmapCell({ level }: { level: number }) {
  const opacity = level === 0 ? 0.08 : level === 1 ? 0.3 : level === 2 ? 0.6 : 1;
  return (
    <div
      className="w-3 h-3 rounded-sm"
      style={{ background: `rgba(0,212,255,${opacity})` }}
    />
  );
}

function LanguageBar({ lang, index }: { lang: typeof languages[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="space-y-2"
    >
      <div className="flex justify-between text-xs">
        <span style={{ color: lang.color }} className="font-mono">
          {lang.name}
        </span>
        <span style={{ color: "#555" }} className="font-mono">
          {lang.percent}%
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "rgba(255,255,255,0.05)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${lang.percent}%` }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${lang.color}, ${lang.color}80)`,
            boxShadow: `0 0 8px ${lang.color}60`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function GitHubSection() {
  return (
    <section
      id="github"
      className="py-24 px-6 relative"
      style={{
        background: "linear-gradient(180deg, #000 0%, #050510 50%, #000 100%)",
      }}
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
              ◈ OPEN SOURCE
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Open Source &{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Contributions
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center p-6 rounded-xl"
              style={{
                background: "rgba(0,212,255,0.03)",
                border: "1px solid rgba(0,212,255,0.1)",
              }}
            >
              <div
                className="text-3xl font-bold mb-1"
                style={{ color: "#00d4ff" }}
              >
                {stat.value}
              </div>
              <div className="text-xs tracking-wider" style={{ color: "#555" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Language breakdown */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3
              className="text-sm font-mono tracking-widest mb-6"
              style={{ color: "#555" }}
            >
              LANGUAGE BREAKDOWN
            </h3>
            <div className="space-y-5">
              {languages.map((lang, i) => (
                <LanguageBar key={lang.name} lang={lang} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Featured repos */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 rounded-xl"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <h3
              className="text-sm font-mono tracking-widest mb-6"
              style={{ color: "#555" }}
            >
              FEATURED REPOS
            </h3>
            <div className="space-y-4">
              {featuredRepos.map((repo, i) => (
                <motion.a
                  key={repo.name}
                  href="https://github.com/ibrahimkhalilmasud"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start justify-between p-3 rounded-lg transition-all hover:scale-[1.01]"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <div className="flex-1 min-w-0 mr-3">
                    <div
                      className="text-sm font-mono mb-1 truncate"
                      style={{ color: "#00d4ff" }}
                    >
                      {repo.name}
                    </div>
                    <div className="text-xs" style={{ color: "#555" }}>
                      {repo.desc}
                    </div>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ background: repo.langColor }}
                        />
                        <span className="text-xs" style={{ color: "#666" }}>
                          {repo.lang}
                        </span>
                      </div>
                      <span className="text-xs" style={{ color: "#666" }}>
                        ⭐ {repo.stars}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Contribution heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="p-6 rounded-xl mb-10"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <h3
            className="text-sm font-mono tracking-widest mb-6"
            style={{ color: "#555" }}
          >
            CONTRIBUTION ACTIVITY
          </h3>
          <div className="overflow-x-auto">
            <div
              className="grid gap-1"
              style={{
                gridTemplateColumns: "repeat(52, 1fr)",
                gridTemplateRows: "repeat(7, 1fr)",
                gridAutoFlow: "column",
                width: "fit-content",
              }}
            >
              {heatmapData.map((level, i) => (
                <HeatmapCell key={i} level={level} />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4 justify-end">
            <span className="text-xs" style={{ color: "#444" }}>Less</span>
            {[0, 1, 2, 3].map((l) => (
              <div
                key={l}
                className="w-3 h-3 rounded-sm"
                style={{
                  background: `rgba(0,212,255,${l === 0 ? 0.08 : l === 1 ? 0.3 : l === 2 ? 0.6 : 1})`,
                }}
              />
            ))}
            <span className="text-xs" style={{ color: "#444" }}>More</span>
          </div>
        </motion.div>

        {/* GitHub CTA */}
        <div className="text-center">
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            href="https://github.com/ibrahimkhalilmasud"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded text-sm font-semibold tracking-wider transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #0070f3)",
              color: "#000",
              boxShadow: "0 0 20px rgba(0,212,255,0.3)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            View on GitHub
          </motion.a>
        </div>
      </div>
    </section>
  );
}
