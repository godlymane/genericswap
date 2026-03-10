"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3, Color } from "three";
import type { Mesh, Group, InstancedMesh } from "three";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// ── DNA-style double helix of capsules ──
function HelixCapsules() {
  const groupRef = useRef<Group>(null);
  const capsuleCount = 28;

  const capsules = useMemo(() => {
    return Array.from({ length: capsuleCount }, (_, i) => {
      const t = (i / capsuleCount) * Math.PI * 4; // 2 full rotations
      const yPos = (i / capsuleCount) * 8 - 4; // spread vertically
      const strand = i % 2 === 0 ? 1 : -1;
      const radius = 1.2;

      return {
        basePosition: [
          Math.cos(t) * radius * strand,
          yPos,
          Math.sin(t) * radius,
        ] as [number, number, number],
        rotation: [t * 0.3, t, 0] as [number, number, number],
        scale: 0.35 + Math.sin(i * 0.4) * 0.1,
        color: strand === 1 ? "#22d3ee" : "#3b82f6",
        emissive: strand === 1 ? "#06b6d4" : "#2563eb",
        phaseOffset: i * 0.15,
        strand,
      };
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    // Slow rotation of entire helix
    groupRef.current.rotation.y = t * 0.08;

    groupRef.current.children.forEach((child, i) => {
      const cap = capsules[i];
      if (!cap) return;
      // Gentle breathing / pulsing motion
      const pulse = Math.sin(t * 0.8 + cap.phaseOffset) * 0.06;
      child.position.y = cap.basePosition[1] + Math.sin(t * 0.4 + cap.phaseOffset) * 0.15;
      child.scale.setScalar(cap.scale + pulse);
      child.rotation.x = cap.rotation[0] + t * 0.15;
      child.rotation.z = t * 0.1 + cap.phaseOffset;
    });
  });

  return (
    <group ref={groupRef} position={[3.5, 0, -1]} rotation={[0.3, 0, 0.15]}>
      {capsules.map((cap, i) => (
        <mesh key={i} position={cap.basePosition} rotation={cap.rotation} scale={cap.scale}>
          <capsuleGeometry args={[0.12, 0.35, 8, 16]} />
          <meshStandardMaterial
            color={cap.color}
            emissive={cap.emissive}
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.85}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
      {/* Connection lines between strands */}
      {capsules.filter((_, i) => i % 4 === 0 && i + 1 < capsuleCount).map((cap, i) => {
        const next = capsules[i * 4 + 1];
        if (!next) return null;
        return (
          <mesh key={`conn-${i}`} position={[
            (cap.basePosition[0] + next.basePosition[0]) / 2,
            (cap.basePosition[1] + next.basePosition[1]) / 2,
            (cap.basePosition[2] + next.basePosition[2]) / 2,
          ]}>
            <sphereGeometry args={[0.03, 6, 6]} />
            <meshStandardMaterial color="#94a3b8" emissive="#64748b" emissiveIntensity={0.5} transparent opacity={0.4} />
          </mesh>
        );
      })}
    </group>
  );
}

// ── Orbiting ring of pills ──
function OrbitRing({ radius, count, speed, yOffset, color, emissive }: {
  radius: number; count: number; speed: number; yOffset: number; color: string; emissive: string;
}) {
  const groupRef = useRef<Group>(null);

  const pills = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      angle: (i / count) * Math.PI * 2,
      scaleBase: 0.2 + Math.random() * 0.15,
      floatPhase: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * speed;

    groupRef.current.children.forEach((child, i) => {
      const p = pills[i];
      if (!p) return;
      const float = Math.sin(t * 0.6 + p.floatPhase) * 0.08;
      child.position.y = float;
      child.rotation.x = t * 0.3 + p.angle;
      child.rotation.z = t * 0.2;
    });
  });

  return (
    <group ref={groupRef} position={[-2.5, yOffset, 0]} rotation={[0.5, 0, 0.3]}>
      {pills.map((p, i) => (
        <mesh
          key={i}
          position={[Math.cos(p.angle) * radius, 0, Math.sin(p.angle) * radius]}
          scale={p.scaleBase}
        >
          <capsuleGeometry args={[0.15, 0.3, 6, 12]} />
          <meshStandardMaterial
            color={color}
            emissive={emissive}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Floating molecule-like nodes ──
function MoleculeNodes() {
  const groupRef = useRef<Group>(null);

  const nodes = useMemo(() => {
    const pts: { pos: [number, number, number]; size: number; color: string; phase: number }[] = [];
    for (let i = 0; i < 12; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const r = 2 + Math.random() * 3;
      pts.push({
        pos: [
          Math.sin(phi) * Math.cos(theta) * r - 1,
          Math.sin(phi) * Math.sin(theta) * r * 0.6,
          Math.cos(phi) * r * 0.5 - 2,
        ],
        size: 0.04 + Math.random() * 0.06,
        color: ["#22d3ee", "#3b82f6", "#a78bfa", "#34d399"][Math.floor(Math.random() * 4)],
        phase: Math.random() * Math.PI * 2,
      });
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const n = nodes[i];
      if (!n) return;
      child.position.x = n.pos[0] + Math.sin(t * 0.3 + n.phase) * 0.3;
      child.position.y = n.pos[1] + Math.cos(t * 0.4 + n.phase) * 0.25;
      const pulse = 1 + Math.sin(t * 1.5 + n.phase) * 0.3;
      child.scale.setScalar(n.size * pulse);
    });
  });

  return (
    <group ref={groupRef}>
      {nodes.map((n, i) => (
        <mesh key={i} position={n.pos}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial
            color={n.color}
            emissive={n.color}
            emissiveIntensity={1.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Floating particle dust ──
function ParticleDust() {
  const meshRef = useRef<InstancedMesh>(null);
  const count = 120;

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      pos: new Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8,
      ),
      speed: 0.1 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      size: 0.008 + Math.random() * 0.015,
    }));
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    const dummy = new THREE.Object3D();

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      dummy.position.set(
        p.pos.x + Math.sin(t * p.speed + p.phase) * 0.5,
        p.pos.y + Math.cos(t * p.speed * 0.7 + p.phase) * 0.4,
        p.pos.z + Math.sin(t * p.speed * 0.3 + p.phase) * 0.3,
      );
      dummy.scale.setScalar(p.size * (1 + Math.sin(t * 2 + p.phase) * 0.3));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshStandardMaterial
        color="#94a3b8"
        emissive="#64748b"
        emissiveIntensity={0.8}
        transparent
        opacity={0.4}
      />
    </instancedMesh>
  );
}

// ── Interactive mouse-reactive glow ──
function MouseGlow() {
  const lightRef = useRef<any>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useFrame((state) => {
    if (!lightRef.current) return;
    // Get mouse position from pointer events on the canvas
    const pointer = state.pointer;
    mousePos.current.x = MathUtils.lerp(mousePos.current.x, pointer.x * viewport.width * 0.5, 0.05);
    mousePos.current.y = MathUtils.lerp(mousePos.current.y, pointer.y * viewport.height * 0.5, 0.05);

    lightRef.current.position.x = mousePos.current.x;
    lightRef.current.position.y = mousePos.current.y;
    lightRef.current.position.z = 3;
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 3]}
      intensity={2}
      color="#22d3ee"
      distance={8}
    />
  );
}

// ── Large floating hero capsule (center-left) ──
function HeroCapsule() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.15 + 0.3;
    meshRef.current.rotation.y = t * 0.1;
    meshRef.current.rotation.z = Math.cos(t * 0.15) * 0.1 + 0.2;
    meshRef.current.position.y = Math.sin(t * 0.3) * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <mesh ref={meshRef} position={[-3, 0.5, 1]} scale={1.1}>
        {/* Two-tone capsule using groups */}
        <group>
          <mesh position={[0, 0.2, 0]}>
            <capsuleGeometry args={[0.28, 0.15, 12, 24]} />
            <meshStandardMaterial
              color="#22d3ee"
              emissive="#06b6d4"
              emissiveIntensity={0.5}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          <mesh position={[0, -0.2, 0]}>
            <capsuleGeometry args={[0.28, 0.15, 12, 24]} />
            <meshStandardMaterial
              color="#3b82f6"
              emissive="#2563eb"
              emissiveIntensity={0.5}
              roughness={0.1}
              metalness={0.9}
            />
          </mesh>
          {/* Shine stripe */}
          <mesh position={[0.15, 0, 0.2]} rotation={[0, 0, 0.3]} scale={[0.03, 0.5, 0.01]}>
            <boxGeometry />
            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={0.6} transparent opacity={0.3} />
          </mesh>
        </group>
      </mesh>
    </Float>
  );
}

// ── Scene ──
function Scene() {
  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.12} color="#e2e8f0" />
      <directionalLight position={[5, 5, 5]} intensity={0.35} color="#f8fafc" />
      <pointLight position={[-4, 3, 4]} intensity={0.5} color="#a78bfa" distance={15} />
      <pointLight position={[4, -2, 3]} intensity={0.4} color="#22d3ee" distance={12} />
      <MouseGlow />

      {/* Main hero capsule */}
      <HeroCapsule />

      {/* DNA helix on the right side */}
      <HelixCapsules />

      {/* Orbiting rings */}
      <OrbitRing radius={1.8} count={8} speed={0.15} yOffset={-0.5} color="#22d3ee" emissive="#06b6d4" />
      <OrbitRing radius={1.3} count={6} speed={-0.1} yOffset={0.8} color="#a78bfa" emissive="#7c3aed" />

      {/* Molecular nodes */}
      <MoleculeNodes />

      {/* Background particle dust */}
      <ParticleDust />
    </>
  );
}

// ── Exported component ──
export default function HeroCanvas() {
  return (
    <div className="w-full h-full absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
