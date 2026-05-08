"use client";

import { useEffect, useRef } from "react";

export default function AnimatedFabricMesh() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let animationFrame = 0;
    let renderer: import("three").WebGLRenderer | null = null;
    let cleanupScene: (() => void) | undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    (async () => {
      const THREE = await import("three");

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.z = 4.2;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);

      const geometry = new THREE.PlaneGeometry(8, 4.2, 120, 60);
      const material = new THREE.MeshStandardMaterial({
        color: "#a9a9b2",
        emissive: "#121318",
        metalness: 0.6,
        roughness: 0.3,
        wireframe: false,
        transparent: true,
        opacity: 0.62,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -0.4;
      mesh.rotation.z = -0.15;
      scene.add(mesh);

      scene.add(new THREE.AmbientLight("#777a85", 0.85));
      const key = new THREE.DirectionalLight("#ffffff", 0.75);
      key.position.set(1, 1, 3);
      scene.add(key);

      const pos = geometry.attributes.position;
      const initial = Float32Array.from(pos.array as Iterable<number>);
      let t = 0;

      const render = () => {
        t += 0.014;
        for (let i = 0; i < pos.count; i += 1) {
          const x = initial[i * 3];
          const y = initial[i * 3 + 1];
          const wave = Math.sin(x * 1.2 + t) * 0.07 + Math.cos(y * 1.8 + t * 1.2) * 0.06;
          pos.setZ(i, initial[i * 3 + 2] + wave);
        }
        pos.needsUpdate = true;
        geometry.computeVertexNormals();

        mesh.rotation.y = Math.sin(t * 0.3) * 0.08;
        renderer?.render(scene, camera);
        animationFrame = window.requestAnimationFrame(render);
      };

      render();

      const handleResize = () => {
        if (!renderer) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };

      window.addEventListener("resize", handleResize);
      cleanupScene = () => {
        window.removeEventListener("resize", handleResize);
        window.cancelAnimationFrame(animationFrame);
        geometry.dispose();
        material.dispose();
        renderer?.dispose();
        if (renderer?.domElement && mount.contains(renderer.domElement)) {
          mount.removeChild(renderer.domElement);
        }
      };
    })();

    return () => {
      cleanupScene?.();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      renderer?.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fabric-mesh" aria-hidden="true" />;
}
