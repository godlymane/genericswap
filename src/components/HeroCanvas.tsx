"use client";

import { useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import type { Mesh, Group } from "three";

// ── Target positions for the 15 generic capsules in a sphere formation ──
function generateOrbitPositions(count: number, radius: number): Vector3[] {
  const positions: Vector3[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    positions.push(
      new Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius)
    );
  }
  return positions;
}

// ── Single capsule mesh ──
function Capsule({
  position,
  targetPosition,
  isDispersed,
  mousePos,
  index,
  scale,
  color,
  emissive,
  emissiveIntensity,
}: {
  position: [number, number, number];
  targetPosition: Vector3;
  isDispersed: boolean;
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
  index: number;
  scale: number;
  color: string;
  emissive: string;
  emissiveIntensity: number;
}) {
  const meshRef = useRef<Mesh>(null);
  const currentPos = useRef(new Vector3(...position));
  const currentScale = useRef(scale);
  const rotationSpeed = useRef(0.002 + Math.random() * 0.005);
  const phaseOffset = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;
    const lerpFactor = 0.03 + index * 0.002;

    if (isDispersed) {
      // Float around mouse position with offset
      const mouseInfluence = 0.3;
      const targetX =
        targetPosition.x + mousePos.current.x * mouseInfluence;
      const targetY =
        targetPosition.y + mousePos.current.y * mouseInfluence;
      const targetZ = targetPosition.z;

      // Add gentle floating motion
      const floatX = Math.sin(time * 0.5 + phaseOffset.current) * 0.15;
      const floatY = Math.cos(time * 0.7 + phaseOffset.current) * 0.1;

      currentPos.current.x = MathUtils.lerp(
        currentPos.current.x,
        targetX + floatX,
        lerpFactor
      );
      currentPos.current.y = MathUtils.lerp(
        currentPos.current.y,
        targetY + floatY,
        lerpFactor
      );
      currentPos.current.z = MathUtils.lerp(
        currentPos.current.z,
        targetZ,
        lerpFactor
      );

      currentScale.current = MathUtils.lerp(currentScale.current, scale, 0.05);
    } else {
      // Merge back to center
      currentPos.current.x = MathUtils.lerp(currentPos.current.x, 0, 0.04);
      currentPos.current.y = MathUtils.lerp(currentPos.current.y, 0, 0.04);
      currentPos.current.z = MathUtils.lerp(currentPos.current.z, 0, 0.04);

      currentScale.current = MathUtils.lerp(
        currentScale.current,
        index === 0 ? scale : 0,
        0.05
      );
    }

    meshRef.current.position.copy(currentPos.current);
    meshRef.current.scale.setScalar(Math.max(currentScale.current, 0.001));

    // Rotate
    meshRef.current.rotation.x += rotationSpeed.current;
    meshRef.current.rotation.z += rotationSpeed.current * 0.5;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <capsuleGeometry args={[0.15, 0.4, 8, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

// ── Main gold capsule that shows when not dispersed ──
function GoldCapsule({
  isDispersed,
}: {
  isDispersed: boolean;
}) {
  const meshRef = useRef<Mesh>(null);
  const currentScale = useRef(1);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    // Scale down when dispersed
    const targetScale = isDispersed ? 0 : 1;
    currentScale.current = MathUtils.lerp(currentScale.current, targetScale, 0.05);
    meshRef.current.scale.setScalar(Math.max(currentScale.current, 0.001));

    // Slow elegant rotation
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.3;
    meshRef.current.rotation.y = time * 0.15;
    meshRef.current.rotation.z = Math.cos(time * 0.2) * 0.1;

    // Gentle float
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <capsuleGeometry args={[0.25, 0.6, 12, 24]} />
      <meshStandardMaterial
        color="#d4a843"
        emissive="#b8860b"
        emissiveIntensity={0.6}
        roughness={0.15}
        metalness={0.9}
      />
    </mesh>
  );
}

// ── Mouse-following point light ──
function MouseLight({
  mousePos,
}: {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const lightRef = useRef<any>(null);

  useFrame(() => {
    if (!lightRef.current) return;
    lightRef.current.position.x = MathUtils.lerp(
      lightRef.current.position.x,
      mousePos.current.x * 3,
      0.05
    );
    lightRef.current.position.y = MathUtils.lerp(
      lightRef.current.position.y,
      mousePos.current.y * 3,
      0.05
    );
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 3]}
      intensity={1.5}
      color="#88ccff"
      distance={10}
    />
  );
}

// ── Floating ambient particles ──
function Particles() {
  const groupRef = useRef<Group>(null);
  const count = 60;

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
      ] as [number, number, number],
      scale: Math.random() * 0.02 + 0.005,
      speed: Math.random() * 0.2 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.children.forEach((child, i) => {
      const p = particles[i];
      child.position.y =
        p.position[1] + Math.sin(time * p.speed + p.phase) * 0.3;
      child.position.x =
        p.position[0] + Math.cos(time * p.speed * 0.5 + p.phase) * 0.1;
    });
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position} scale={p.scale}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshStandardMaterial
            color="#94a3b8"
            emissive="#64748b"
            emissiveIntensity={0.4}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

// ── Scene container ──
function Scene() {
  const [isDispersed, setIsDispersed] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  const CAPSULE_COUNT = 15;
  const orbitPositions = useMemo(
    () => generateOrbitPositions(CAPSULE_COUNT, 2),
    []
  );

  const handlePointerMove = useCallback(
    (e: any) => {
      mousePos.current.x = (e.point.x / viewport.width) * 4;
      mousePos.current.y = (e.point.y / viewport.height) * 4;
    },
    [viewport]
  );

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} color="#e2e8f0" />
      <directionalLight position={[5, 5, 5]} intensity={0.4} color="#f8fafc" />
      <pointLight position={[-3, 2, 4]} intensity={0.6} color="#c084fc" distance={12} />
      <MouseLight mousePos={mousePos} />

      {/* Invisible interaction plane */}
      <mesh
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setIsDispersed(true)}
        onPointerLeave={() => setIsDispersed(false)}
        visible={false}
      >
        <planeGeometry args={[20, 12]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Main gold capsule */}
      <GoldCapsule isDispersed={isDispersed} />

      {/* 15 generic capsules */}
      {orbitPositions.map((pos, i) => (
        <Capsule
          key={i}
          index={i}
          position={[0, 0, 0]}
          targetPosition={pos}
          isDispersed={isDispersed}
          mousePos={mousePos}
          scale={0.7}
          color="#22d3ee"
          emissive="#06b6d4"
          emissiveIntensity={0.5}
        />
      ))}

      {/* Ambient particles */}
      <Particles />
    </>
  );
}

// ── Exported component ──
export default function HeroCanvas() {
  return (
    <div className="w-full h-full absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
