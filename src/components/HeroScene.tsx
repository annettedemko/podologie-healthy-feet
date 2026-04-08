import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Water plane with concentric ripples ── */
function Water() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(14, 14, 128, 128);
    g.rotateX(-Math.PI / 2);
    return g;
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position;
    const t = clock.getElapsedTime() * 0.5;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const dist = Math.sqrt(x * x + z * z);
      const wave1 = Math.sin(dist * 2.0 - t * 2) * 0.04;
      const wave2 = Math.sin(dist * 1.2 + t * 1.0) * 0.025;
      const fade = Math.max(0, 1 - dist / 7);
      pos.setY(i, (wave1 + wave2) * fade);
    }
    pos.needsUpdate = true;
    meshRef.current.geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geo} position={[0, -0.65, 0]}>
      <meshPhysicalMaterial
        color="#c7ddf5"
        roughness={0.02}
        metalness={0.0}
        transmission={0.15}
        thickness={0.3}
        envMapIntensity={0.8}
        clearcoat={1}
        clearcoatRoughness={0.02}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

/* ── Main glass sphere ── */
function GlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.06;
    meshRef.current.rotation.y = t * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.55, 64, 64]} />
      <MeshTransmissionMaterial
        backside
        samples={8}
        thickness={0.4}
        chromaticAberration={0.06}
        anisotropy={0.1}
        distortion={0.1}
        distortionScale={0.2}
        temporalDistortion={0.05}
        iridescence={0.3}
        iridescenceIOR={1.3}
        color="#dbeafe"
        roughness={0.0}
        envMapIntensity={1.5}
        transmission={1}
      />
    </mesh>
  );
}

/* ── Small floating droplets ── */
function Droplet({
  position,
  size,
  speed,
}: {
  position: [number, number, number];
  size: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(t * speed) * 0.08;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.3}
        chromaticAberration={0.04}
        color="#dbeafe"
        roughness={0}
        envMapIntensity={1.5}
        transmission={1}
      />
    </mesh>
  );
}

/* ── Scene ── */
function Scene() {
  return (
    <>
      {/* Soft ambient + directional from above-front */}
      <ambientLight intensity={0.8} color="#f0f6ff" />
      <directionalLight position={[3, 6, 4]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-2, 3, -1]} intensity={0.5} color="#bfdbfe" />
      <pointLight position={[0, 2, 2]} intensity={0.4} color="#93c5fd" />

      <GlassSphere />
      <Water />

      <Droplet position={[-0.9, 0.15, -0.4]} size={0.1} speed={1.1} />
      <Droplet position={[1.0, 0.25, 0.2]} size={0.08} speed={0.85} />
      <Droplet position={[0.4, 0.35, -0.9]} size={0.065} speed={1.4} />

      <Environment preset="studio" environmentIntensity={0.6} />
      <fog attach="fog" args={["#eef4ff", 3, 10]} />
    </>
  );
}

/* ── Exported component — positioned right half only ── */
export default function HeroScene() {
  return (
    <div
      className="absolute top-0 right-0 bottom-0 w-[55%] overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0.8, 3.0], fov: 35 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
      {/* Bottom gradient blend */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#eef4ff] to-transparent" />
      {/* Left gradient blend into text area */}
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#eef4ff] to-transparent" />
    </div>
  );
}
