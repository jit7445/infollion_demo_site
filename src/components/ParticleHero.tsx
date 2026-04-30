"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Three.js particle network — interactive, mouse-reactive points
 * connected by faint lines. Lightweight & runs at 60fps on mobile.
 */

const COUNT = 110;

function ParticleNetwork() {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const { viewport } = useThree();
  const mouse = useRef(new THREE.Vector2(0, 0));

  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial theme and observe changes
    const checkDark = () => setIsDark(document.documentElement.classList.contains("dark"));
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Generate point positions + velocities + initial colors
  const { positions, velocities, isOrangeNode } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const velocities = new Float32Array(COUNT * 3);
    const isOrangeNode = new Array(COUNT).fill(false);
    
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      velocities[i * 3 + 0] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
      isOrangeNode[i] = Math.random() < 0.22;
    }
    return { positions, velocities, isOrangeNode };
  }, []);

  // Update colors when theme changes
  const colors = useMemo(() => {
    const cols = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      if (isOrangeNode[i]) { 
        cols[i * 3] = 1.0; cols[i * 3 + 1] = 0.42; cols[i * 3 + 2] = 0.0; 
      } else { 
        // White in dark mode, dark gray in light mode
        const val = isDark ? 0.95 : 0.15;
        cols[i * 3] = val; cols[i * 3 + 1] = val; cols[i * 3 + 2] = val; 
      }
    }
    return cols;
  }, [isDark, isOrangeNode]);

  // Pre-allocate line buffer (max possible segments)
  const lineGeom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(COUNT * COUNT * 3), 3));
    g.setAttribute("color", new THREE.BufferAttribute(new Float32Array(COUNT * COUNT * 3), 3));
    g.setDrawRange(0, 0);
    return g;
  }, []);

  useFrame(({ pointer }) => {
    mouse.current.set(pointer.x * viewport.width * 0.5, pointer.y * viewport.height * 0.5);
    const pAttr = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const pos = pAttr.array as Float32Array;

    // Update positions
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] += velocities[i * 3];
      pos[i * 3 + 1] += velocities[i * 3 + 1];
      pos[i * 3 + 2] += velocities[i * 3 + 2];
      // Bounce
      if (Math.abs(pos[i * 3]) > 5) velocities[i * 3] *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 3) velocities[i * 3 + 1] *= -1;
      if (Math.abs(pos[i * 3 + 2]) > 2) velocities[i * 3 + 2] *= -1;

      // Mouse repulsion
      const dx = pos[i * 3] - mouse.current.x;
      const dy = pos[i * 3 + 1] - mouse.current.y;
      const d = Math.hypot(dx, dy);
      if (d < 1.2 && d > 0.001) {
        pos[i * 3] += (dx / d) * 0.04;
        pos[i * 3 + 1] += (dy / d) * 0.04;
      }
    }
    pAttr.needsUpdate = true;

    // Build lines between close points
    const linePos = lineGeom.getAttribute("position").array as Float32Array;
    const lineCol = lineGeom.getAttribute("color").array as Float32Array;
    let idx = 0;
    const MAX_DIST = 1.3;
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < MAX_DIST) {
          const a = 1 - d / MAX_DIST;
          linePos[idx * 3] = pos[i * 3];
          linePos[idx * 3 + 1] = pos[i * 3 + 1];
          linePos[idx * 3 + 2] = pos[i * 3 + 2];
          linePos[(idx + 1) * 3] = pos[j * 3];
          linePos[(idx + 1) * 3 + 1] = pos[j * 3 + 1];
          linePos[(idx + 1) * 3 + 2] = pos[j * 3 + 2];
          // colour blend: orange-tinted
          lineCol[idx * 3] = 1.0 * a;
          lineCol[idx * 3 + 1] = 0.45 * a;
          lineCol[idx * 3 + 2] = 0.15 * a;
          lineCol[(idx + 1) * 3] = 1.0 * a;
          lineCol[(idx + 1) * 3 + 1] = 0.45 * a;
          lineCol[(idx + 1) * 3 + 2] = 0.15 * a;
          idx += 2;
        }
      }
    }
    lineGeom.setDrawRange(0, idx);
    (lineGeom.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
    (lineGeom.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.06} vertexColors transparent opacity={0.95} sizeAttenuation depthWrite={false} />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeom}>
        <lineBasicMaterial vertexColors transparent opacity={0.55} depthWrite={false} />
      </lineSegments>
    </group>
  );
}

export default function ParticleHero() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0 z-0 pointer-events-auto"
    >
      <ParticleNetwork />
    </Canvas>
  );
}
