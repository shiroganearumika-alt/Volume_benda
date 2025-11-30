import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid, Environment } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import { CoordinateAxes } from "./CoordinateAxes";
import { RevolutionSolid } from "./RevolutionSolid";
import { Curve2D } from "./Curve2D";
import { CrossSection } from "./CrossSection";

export function Scene3D() {
  return (
    <Canvas
      camera={{
        position: [6, 4, 6],
        fov: 50,
        near: 0.1,
        far: 1000,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
    >
      <color attach="background" args={["#0a0a1a"]} />
      
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <pointLight position={[0, 5, 0]} intensity={0.3} />

      <Suspense fallback={null}>
        <Grid
          position={[0, -0.01, 0]}
          args={[20, 20]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#1a1a3a"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#2a2a5a"
          fadeDistance={30}
          fadeStrength={1}
          followCamera={false}
        />
        
        <CoordinateAxes />
        <Curve2D />
        <RevolutionSolid />
        <CrossSection />
      </Suspense>

      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={20}
        autoRotate={false}
        target={[0, 1, 0]}
      />

      <fog attach="fog" args={["#0a0a1a", 15, 30]} />
    </Canvas>
  );
}
