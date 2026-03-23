"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, TorusKnot, ContactShadows } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const RotatingShapes = () => {
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.2;
      torusRef.current.rotation.y += delta * 0.3;
    }
    if (sphereRef.current) {
      sphereRef.current.rotation.x -= delta * 0.1;
      sphereRef.current.rotation.y -= delta * 0.2;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <TorusKnot ref={torusRef} args={[1, 0.3, 128, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#00ffff" metalness={0.9} roughness={0.1} />
        </TorusKnot>
      </Float>

      <Float speed={3} rotationIntensity={0.3} floatIntensity={0.8}>
        <Sphere ref={sphereRef} args={[0.8, 64, 64]} position={[2.5, 1, -1]}>
          <meshStandardMaterial color="#ff00ff" wireframe emissive="#ff00ff" emissiveIntensity={0.8} />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={0.7} floatIntensity={0.3}>
        <Sphere args={[0.3, 32, 32]} position={[-2, -1, 0.5]}>
          <meshStandardMaterial color="#ffff00" emissive="#ffff00" emissiveIntensity={0.3} />
        </Sphere>
      </Float>
    </group>
  );
};

export default function Scene() {
  return (
    <div className="w-full h-screen fixed top-0 left-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={["#020205"]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#00ffff" />
        <pointLight position={[-5, -5, -5]} intensity={2} color="#ff00ff" />
        <pointLight position={[0, 5, -5]} intensity={1} color="#ffff00" />

        <RotatingShapes />
        <ContactShadows position={[0, -2.5, 0]} opacity={0.5} scale={10} blur={2} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Canvas>
    </div>
  );
}