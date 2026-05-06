"use client";

import { useRef, useState, Suspense, useMemo } from "react";
import { Canvas, useFrame, ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";

interface Skill {
  name: string;
  category: string;
  color: string;
  orbitRadius: number;
  orbitSpeed: number;
  orbitAxis: [number, number, number];
  phase: number;
}

const skills: Skill[] = [
  // AI/ML - blue
  { name: "Python", category: "AI/ML", color: "#00d4ff", orbitRadius: 2.5, orbitSpeed: 0.4, orbitAxis: [0, 1, 0.2], phase: 0 },
  { name: "PyTorch", category: "AI/ML", color: "#00d4ff", orbitRadius: 2.5, orbitSpeed: 0.4, orbitAxis: [0, 1, 0.2], phase: 1.26 },
  { name: "TensorFlow", category: "AI/ML", color: "#00d4ff", orbitRadius: 2.5, orbitSpeed: 0.4, orbitAxis: [0, 1, 0.2], phase: 2.51 },
  { name: "HuggingFace", category: "AI/ML", color: "#00d4ff", orbitRadius: 2.5, orbitSpeed: 0.4, orbitAxis: [0, 1, 0.2], phase: 3.77 },
  { name: "Scikit-learn", category: "AI/ML", color: "#00d4ff", orbitRadius: 2.5, orbitSpeed: 0.4, orbitAxis: [0, 1, 0.2], phase: 5.02 },
  // Vision - violet
  { name: "OpenCV", category: "Vision", color: "#a855f7", orbitRadius: 3.5, orbitSpeed: 0.3, orbitAxis: [0.3, 1, 0], phase: 0 },
  { name: "YOLO", category: "Vision", color: "#a855f7", orbitRadius: 3.5, orbitSpeed: 0.3, orbitAxis: [0.3, 1, 0], phase: 1.57 },
  { name: "Computer Vision", category: "Vision", color: "#a855f7", orbitRadius: 3.5, orbitSpeed: 0.3, orbitAxis: [0.3, 1, 0], phase: 3.14 },
  { name: "Image Processing", category: "Vision", color: "#a855f7", orbitRadius: 3.5, orbitSpeed: 0.3, orbitAxis: [0.3, 1, 0], phase: 4.71 },
  // Web - green
  { name: "React", category: "Web", color: "#22c55e", orbitRadius: 4.5, orbitSpeed: 0.2, orbitAxis: [0, 1, 0.5], phase: 0 },
  { name: "Next.js", category: "Web", color: "#22c55e", orbitRadius: 4.5, orbitSpeed: 0.2, orbitAxis: [0, 1, 0.5], phase: 2.09 },
  { name: "FastAPI", category: "Web", color: "#22c55e", orbitRadius: 4.5, orbitSpeed: 0.2, orbitAxis: [0, 1, 0.5], phase: 4.19 },
  { name: "TypeScript", category: "Web", color: "#22c55e", orbitRadius: 4.5, orbitSpeed: 0.2, orbitAxis: [0, 1, 0.5], phase: 1.05 },
  // Tools - orange
  { name: "Docker", category: "Tools", color: "#f97316", orbitRadius: 5.5, orbitSpeed: 0.15, orbitAxis: [0.5, 1, 0.3], phase: 0 },
  { name: "Git", category: "Tools", color: "#f97316", orbitRadius: 5.5, orbitSpeed: 0.15, orbitAxis: [0.5, 1, 0.3], phase: 2.09 },
  { name: "n8n", category: "Tools", color: "#f97316", orbitRadius: 5.5, orbitSpeed: 0.15, orbitAxis: [0.5, 1, 0.3], phase: 4.19 },
  // Research - pink
  { name: "NLP", category: "Research", color: "#ec4899", orbitRadius: 6.2, orbitSpeed: 0.1, orbitAxis: [0.2, 1, 0.8], phase: 0 },
  { name: "Stable Diffusion", category: "Research", color: "#ec4899", orbitRadius: 6.2, orbitSpeed: 0.1, orbitAxis: [0.2, 1, 0.8], phase: 3.14 },
  { name: "ComfyUI", category: "Research", color: "#ec4899", orbitRadius: 6.2, orbitSpeed: 0.1, orbitAxis: [0.2, 1, 0.8], phase: 1.57 },
];

function SkillNode({
  skill,
  onHover,
  onLeave,
}: {
  skill: Skill;
  onHover: (skill: Skill, pos: THREE.Vector3) => void;
  onLeave: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(skill.phase);
  const posRef = useRef(new THREE.Vector3());
  const axisRef = useRef(new THREE.Vector3(...skill.orbitAxis).normalize());

  useFrame((_, delta) => {
    timeRef.current += delta * skill.orbitSpeed;
    const t = timeRef.current;

    const axis = axisRef.current;
    const perp = new THREE.Vector3(1, 0, 0);
    if (Math.abs(axis.dot(perp)) > 0.9) perp.set(0, 1, 0);
    const u = perp.clone().sub(axis.clone().multiplyScalar(axis.dot(perp))).normalize();
    const v = axis.clone().cross(u).normalize();

    const pos = u
      .clone()
      .multiplyScalar(Math.cos(t) * skill.orbitRadius)
      .add(v.clone().multiplyScalar(Math.sin(t) * skill.orbitRadius));

    if (meshRef.current) {
      meshRef.current.position.copy(pos);
      meshRef.current.rotation.y += delta;
      posRef.current.copy(pos);
    }
  });

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        onHover(skill, posRef.current);
      }}
      onPointerOut={() => onLeave()}
    >
      <sphereGeometry args={[0.15, 8, 8]} />
      <meshStandardMaterial
        color={skill.color}
        emissive={skill.color}
        emissiveIntensity={0.8}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
}

function CentralSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.1;
    }
  });
  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.5, 2]} />
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#00d4ff"
        emissiveIntensity={0.6}
        metalness={1}
        roughness={0}
        wireframe
      />
    </mesh>
  );
}

function Scene({
  onHover,
  onLeave,
}: {
  onHover: (skill: Skill, pos: THREE.Vector3) => void;
  onLeave: () => void;
}) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#00d4ff" />
      <pointLight position={[-5, -5, 5]} intensity={0.6} color="#a855f7" />
      <CentralSphere />
      {skills.map((skill) => (
        <SkillNode
          key={skill.name}
          skill={skill}
          onHover={onHover}
          onLeave={onLeave}
        />
      ))}
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
    </>
  );
}

const categories = [
  { name: "AI/ML", color: "#00d4ff" },
  { name: "Vision", color: "#a855f7" },
  { name: "Web", color: "#22c55e" },
  { name: "Tools", color: "#f97316" },
  { name: "Research", color: "#ec4899" },
];

export default function SkillsSection() {
  const [hovered, setHovered] = useState<{ skill: Skill } | null>(null);

  return (
    <section
      id="skills"
      className="py-24 px-6 relative"
      style={{ background: "linear-gradient(180deg, #000 0%, #050510 50%, #000 100%)" }}
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
              ◈ EXPERTISE
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Technical{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Arsenal
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Hover over orbiting nodes to explore the skill galaxy.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 h-[500px] relative rounded-xl overflow-hidden"
            style={{
              background: "rgba(0,0,0,0.5)",
              border: "1px solid rgba(0,212,255,0.1)",
            }}
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">
                Loading Skills Galaxy...
              </div>
            }>
              <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <Scene
                  onHover={(skill) => setHovered({ skill })}
                  onLeave={() => setHovered(null)}
                />
              </Canvas>
            </Suspense>

            {/* Hover tooltip */}
            {hovered && (
              <div
                className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm font-mono pointer-events-none"
                style={{
                  background: "rgba(0,0,0,0.9)",
                  border: `1px solid ${hovered.skill.color}60`,
                  color: hovered.skill.color,
                  boxShadow: `0 0 15px ${hovered.skill.color}40`,
                }}
              >
                {hovered.skill.name}
                <span className="ml-2 text-xs opacity-60">
                  [{hovered.skill.category}]
                </span>
              </div>
            )}
          </motion.div>

          {/* Skill list */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {categories.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}` }}
                  />
                  <span className="text-xs font-mono tracking-widest" style={{ color: cat.color }}>
                    {cat.name}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills
                    .filter((s) => s.category === cat.name)
                    .map((skill) => (
                      <span
                        key={skill.name}
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          background: `${cat.color}10`,
                          border: `1px solid ${cat.color}30`,
                          color: hovered?.skill.name === skill.name ? "#fff" : cat.color,
                          transition: "color 0.2s",
                        }}
                      >
                        {skill.name}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
