import { useMemo, useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRevolution } from "@/lib/stores/useRevolution";

export function RevolutionSolid() {
  const {
    selectedShape,
    rotationAxis,
    animationProgress,
    isPlaying,
    setAnimationProgress,
  } = useRevolution();
  
  const progressRef = useRef(animationProgress);
  const playingRef = useRef(isPlaying);

  useEffect(() => {
    progressRef.current = animationProgress;
  }, [animationProgress]);

  useEffect(() => {
    playingRef.current = isPlaying;
  }, [isPlaying]);

  useFrame((_, delta) => {
    if (playingRef.current && progressRef.current < 1) {
      const newProgress = Math.min(1, progressRef.current + delta * 0.3);
      progressRef.current = newProgress;
      setAnimationProgress(newProgress);
    }
  });

  const geometry = useMemo(() => {
    if (animationProgress === 0) return null;

    const segments = 64;
    const radialSegments = Math.max(3, Math.floor(segments * animationProgress));
    const thetaLength = animationProgress * Math.PI * 2;
    const numPoints = 50;

    if (selectedShape.is3DBlock && selectedShape.blockDimensions) {
      const { innerRadius, outerRadius, height } = selectedShape.blockDimensions;
      const { a } = selectedShape.bounds;
      
      const profile: THREE.Vector2[] = [
        new THREE.Vector2(outerRadius, 0),
        new THREE.Vector2(outerRadius, height),
        new THREE.Vector2(innerRadius, height),
        new THREE.Vector2(innerRadius, 0),
      ];
      
      const latheGeo = new THREE.LatheGeometry(profile, radialSegments, 0, thetaLength);
      
      if (rotationAxis === "x") {
        latheGeo.rotateZ(Math.PI / 2);
        latheGeo.translate(a, 0, 0);
      }
      
      return latheGeo;
    }

    const { a, b } = selectedShape.bounds;
    const startPoint = selectedShape.samplePoints(0);
    const endPoint = selectedShape.samplePoints(1);

    if (rotationAxis === "x") {
      const points: THREE.Vector2[] = [];
      
      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const { x, y } = selectedShape.samplePoints(t);
        points.push(new THREE.Vector2(Math.abs(y), x));
      }
      
      points.push(new THREE.Vector2(0, b));
      points.push(new THREE.Vector2(0, a));
      
      const latheGeo = new THREE.LatheGeometry(points, radialSegments, 0, thetaLength);
      latheGeo.rotateX(Math.PI / 2);
      
      return latheGeo;
    } else {
      const sampledPoints: { x: number; y: number }[] = [];
      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        sampledPoints.push(selectedShape.samplePoints(t));
      }
      
      const minAbsX = Math.min(...sampledPoints.map(p => Math.abs(p.x)));
      const hasHole = minAbsX > 1e-3;
      const innerRadius = hasHole ? minAbsX : 0;
      
      const profile: THREE.Vector2[] = sampledPoints.map(p => 
        new THREE.Vector2(Math.abs(p.x), p.y)
      );
      
      profile.push(new THREE.Vector2(Math.abs(endPoint.x), 0));
      
      if (hasHole) {
        profile.push(new THREE.Vector2(innerRadius, 0));
        
        for (let i = numPoints; i >= 0; i--) {
          profile.push(new THREE.Vector2(innerRadius, sampledPoints[i].y));
        }
      } else {
        profile.push(new THREE.Vector2(0, 0));
        profile.push(new THREE.Vector2(0, startPoint.y));
      }
      
      const latheGeo = new THREE.LatheGeometry(profile, radialSegments, 0, thetaLength);
      
      return latheGeo;
    }
  }, [selectedShape, rotationAxis, animationProgress]);

  if (!geometry || animationProgress === 0) return null;

  return (
    <mesh geometry={geometry}>
      <meshPhongMaterial
        color="#4488ff"
        emissive="#112244"
        specular="#ffffff"
        shininess={100}
        transparent
        opacity={0.85}
        side={THREE.DoubleSide}
        flatShading={false}
      />
    </mesh>
  );
}
