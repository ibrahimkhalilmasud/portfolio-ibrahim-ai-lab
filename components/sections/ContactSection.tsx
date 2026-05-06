"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/ibrahimkhalilmasud",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/ibrahim-khalil-masud",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:ibrahimkhalilmasud@gmail.com",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

interface FormData {
  name: string;
  email: string;
  message: string;
}

// Pre-computed particle data to avoid Math.random() calls during render
const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  background: i % 3 === 0 ? "#00d4ff" : i % 3 === 1 ? "#7c3aed" : "#ffffff",
  left: `${(i * 5.13 + 2.7) % 100}%`,
  animationDelay: `${(i * 0.43) % 8}s`,
  animationDuration: `${6 + (i * 0.79) % 8}s`,
}));

export default function ContactSection() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulate form submission
    await new Promise((res) => setTimeout(res, 1500));
    setSending(false);
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = (field: string) => ({
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${focused === field ? "rgba(0,212,255,0.5)" : "rgba(255,255,255,0.08)"}`,
    outline: "none",
    boxShadow: focused === field ? "0 0 20px rgba(0,212,255,0.1)" : "none",
    transition: "all 0.3s ease",
    color: "#fff",
  });

  return (
    <section
      id="contact"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Floating CSS particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: particle.background,
              left: particle.left,
              opacity: 0.3,
              animation: `float-particle ${particle.animationDuration} ${particle.animationDelay} infinite linear`,
            }}
          />
        ))}
      </div>

      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(0,212,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Big heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span
            className="text-xs font-mono tracking-widest mb-4 block"
            style={{ color: "#00d4ff" }}
          >
            ◈ INITIALIZE CONNECTION
          </span>
          <h2
            className="text-5xl sm:text-7xl font-bold leading-none mb-6"
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #00d4ff 50%, #7c3aed 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textShadow: "none",
            }}
          >
            LET&apos;S BUILD
            <br />
            THE FUTURE
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Have an AI project in mind? Let&apos;s collaborate and build something extraordinary.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16 px-8 rounded-xl"
                style={{
                  background: "rgba(0,212,255,0.05)",
                  border: "1px solid rgba(0,212,255,0.2)",
                }}
              >
                <div className="text-5xl mb-4">✅</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Message Transmitted
                </h3>
                <p className="text-gray-400 text-sm">
                  Your message has been received. I&apos;ll get back to you soon!
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-6 text-sm font-mono"
                  style={{ color: "#00d4ff" }}
                >
                  Send another →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    className="block text-xs font-mono tracking-widest mb-2"
                    style={{ color: "#555" }}
                  >
                    NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused("name")}
                    onBlur={() => setFocused(null)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg text-sm font-mono placeholder-gray-700"
                    style={inputStyle("name")}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-mono tracking-widest mb-2"
                    style={{ color: "#555" }}
                  >
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={() => setFocused("email")}
                    onBlur={() => setFocused(null)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg text-sm font-mono placeholder-gray-700"
                    style={inputStyle("email")}
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-mono tracking-widest mb-2"
                    style={{ color: "#555" }}
                  >
                    MESSAGE
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-lg text-sm font-mono placeholder-gray-700 resize-none"
                    style={inputStyle("message")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full py-4 rounded-lg font-semibold tracking-wider text-sm transition-all hover:scale-[1.02] disabled:opacity-50 relative overflow-hidden"
                  style={{
                    background: sending
                      ? "rgba(0,212,255,0.3)"
                      : "linear-gradient(135deg, #00d4ff, #0070f3)",
                    color: "#000",
                    boxShadow: "0 0 20px rgba(0,212,255,0.3)",
                  }}
                >
                  {sending ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      TRANSMITTING...
                    </span>
                  ) : (
                    "SEND MESSAGE →"
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Social links */}
            <div>
              <p
                className="text-xs font-mono tracking-widest mb-6"
                style={{ color: "#555" }}
              >
                CONNECT
              </p>
              <div className="space-y-4">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-lg transition-all hover:scale-[1.02] group"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <span
                      className="transition-colors duration-200"
                      style={{ color: "#555" }}
                    >
                      {social.icon}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {social.label}
                      </div>
                      <div className="text-xs font-mono mt-0.5" style={{ color: "#444" }}>
                        {social.href.replace("mailto:", "").replace("https://", "")}
                      </div>
                    </div>
                    <span
                      className="ml-auto text-sm transition-all group-hover:translate-x-1"
                      style={{ color: "#00d4ff" }}
                    >
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Download CV */}
            <div
              className="p-6 rounded-xl"
              style={{
                background: "rgba(124,58,237,0.05)",
                border: "1px solid rgba(124,58,237,0.2)",
              }}
            >
              <p className="text-white font-semibold mb-2">
                Want to see my full resume?
              </p>
              <p className="text-sm mb-4" style={{ color: "#666" }}>
                Download my CV for a comprehensive overview of my experience and skills.
              </p>
              <a
                href="https://github.com/ibrahimkhalilmasud"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                  color: "#fff",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                Download CV
              </a>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 text-sm" style={{ color: "#555" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <span>Pakistan • Available for Remote Work</span>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-24 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p className="text-xs font-mono" style={{ color: "#333" }}>
            © 2024 Muhammad Ibrahim Khalil • Built with Next.js, Three.js & AI
          </p>
        </motion.div>
      </div>
    </section>
  );
}
