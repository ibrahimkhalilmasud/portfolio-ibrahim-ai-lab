"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

interface Module {
  id: number;
  title: string;
  icon: string;
  description: string;
  tech: string[];
  position: [number, number, number];
  color: string;
}

const modules: Module[] = [
  {
    id: 1,
    title: "Virtual Try-On",
    icon: "👗",
    description: "Real-time AI clothing try-on using computer vision and pose estimation. Users can virtually wear any garment instantly.",
    tech: ["PyTorch", "OpenCV", "FastAPI"],
    position: [0, 2.5, 0],
    color: "#00d4ff",
  },
  {
    id: 2,
    title: "AI Assistant",
    icon: "🧠",
    description: "Intelligent conversational AI for fashion recommendations, style advice, and personalized shopping guidance.",
    tech: ["LLM", "RAG", "Python"],
    position: [2.5, 0, 0],
    color: "#a855f7",
  },
  {
    id: 3,
    title: "Fabric Intelligence",
    icon: "🔬",
    description: "AI that analyzes fabric textures, predicts drape behavior, and generates synthetic fabric-wearing models.",
    tech: ["Stable Diffusion", "ComfyUI", "Vision"],
    position: [-2.5, 0, 0],
    color: "#00d4ff",
  },
  {
    id: 4,
    title: "E-Commerce AI",
    icon: "🛍️",
    description: "End-to-end intelligent shopping platform with personalized recommendations and automated product management.",
    tech: ["Next.js", "FastAPI", "PostgreSQL"],
    position: [1.5, -2.5, 0],
    color: "#a855f7",
  },
  {
    id: 5,
    title: "Smart Automation",
    icon: "⚙️",
    description: "Intelligent workflow automation systems that reduce manual tasks and optimize business processes using AI.",
    tech: ["n8n", "Python", "APIs"],
    position: [-1.5, -2.5, 0],
    color: "#00d4ff",
  },
];

function NeuralNode({
  module,
  onSelect,
  selected,
}: {
  module: Module;
  onSelect: (m: Module | null) => void;
  selected: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      const scale = hovered || selected ? 1.3 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(scale, scale, scale),
        0.1
      );
    }
  });

  const color = selected ? "#ffffff" : hovered ? "#00d4ff" : module.color;

  return (
    <group position={module.position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onSelect(module)}
      >
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered || selected ? 1.5 : 0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      {(hovered || selected) && (
        <mesh scale={[1.6, 1.6, 1.6]}>
          <sphereGeometry args={[0.4, 8, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.1}
            wireframe
          />
        </mesh>
      )}
    </group>
  );
}

function CentralNode() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[0.6, 1]} />
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#00d4ff"
        emissiveIntensity={1}
        metalness={1}
        roughness={0}
        wireframe={false}
      />
    </mesh>
  );
}

function ConnectionLines({ selectedId }: { selectedId: number | null }) {
  return (
    <>
      {modules.map((module) => (
        <Line
          key={module.id}
          points={[[0, 0, 0], module.position]}
          color={selectedId === module.id ? "#ffffff" : module.color}
          lineWidth={selectedId === module.id ? 2 : 0.5}
          transparent
          opacity={selectedId === module.id ? 0.8 : 0.3}
        />
      ))}
    </>
  );
}

function Scene({
  onSelect,
  selected,
}: {
  onSelect: (m: Module | null) => void;
  selected: Module | null;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current && !selected) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
      <pointLight position={[-5, -5, 5]} intensity={0.8} color="#7c3aed" />
      <group ref={groupRef}>
        <CentralNode />
        <ConnectionLines selectedId={selected?.id ?? null} />
        {modules.map((module) => (
          <NeuralNode
            key={module.id}
            module={module}
            onSelect={onSelect}
            selected={selected?.id === module.id}
          />
        ))}
      </group>
      {!selected && <OrbitControls enableZoom={false} enablePan={false} />}
    </>
  );
}

export default function AILabSection() {
  const [selected, setSelected] = useState<Module | null>(null);

  const handleSelect = (module: Module | null) => {
    if (!module) { setSelected(null); return; }
    setSelected((prev) => (prev?.id === module.id ? null : module));
  };

  return (
    <section
      id="lab"
      className="relative py-24 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #000 0%, #050510 50%, #000 100%)" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

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
              ◈ NEURAL ARCHITECTURE
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              AI Research{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Laboratory
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              An interconnected ecosystem of AI modules. Click any node to explore.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[500px] rounded-xl overflow-hidden relative"
            style={{
              border: "1px solid rgba(0,212,255,0.15)",
              background: "rgba(0,0,0,0.6)",
            }}
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
                Loading 3D scene...
              </div>
            }>
              <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
                <Scene onSelect={handleSelect} selected={selected} />
              </Canvas>
            </Suspense>
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono tracking-widest"
              style={{ color: "rgba(0,212,255,0.4)" }}
            >
              {selected ? "CLICK NODE TO DESELECT" : "DRAG TO ROTATE • CLICK NODE"}
            </div>
          </motion.div>

          {/* Module details panel */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="p-8 rounded-xl"
                  style={{
                    background: "rgba(0,212,255,0.03)",
                    border: "1px solid rgba(0,212,255,0.2)",
                  }}
                >
                  <div className="text-5xl mb-4">{selected.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {selected.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {selected.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selected.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-full text-xs font-mono"
                        style={{
                          background: "rgba(0,212,255,0.1)",
                          border: "1px solid rgba(0,212,255,0.3)",
                          color: "#00d4ff",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://github.com/ibrahimkhalilmasud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded text-sm font-medium transition-all hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, #00d4ff, #0070f3)",
                      color: "#000",
                    }}
                  >
                    View on GitHub →
                  </a>
                </motion.div>
              ) : (
                <motion.div
                  key="modules-list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-gray-500 text-sm font-mono mb-6 tracking-wider">
                    SELECT A MODULE TO EXPLORE
                  </p>
                  <div className="space-y-3">
                    {modules.map((module) => (
                      <button
                        key={module.id}
                        onClick={() => handleSelect(module)}
                        className="w-full text-left p-4 rounded-lg transition-all hover:scale-[1.02] flex items-center gap-4"
                        style={{
                          background: "rgba(255,255,255,0.02)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <span className="text-2xl">{module.icon}</span>
                        <div>
                          <div className="text-white font-medium text-sm">
                            {module.title}
                          </div>
                          <div
                            className="text-xs mt-0.5"
                            style={{ color: module.color }}
                          >
                            {module.tech.join(" · ")}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
