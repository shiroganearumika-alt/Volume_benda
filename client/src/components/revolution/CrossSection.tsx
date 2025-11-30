import { useMemo } from "react";
import * as THREE from "three";
import { useRevolution } from "@/lib/stores/useRevolution";

export function CrossSection() {
  const {
    selectedShape,
    rotationAxis,
    animationProgress,
    showCrossSection,
    crossSectionPosition,
  } = useRevolution();

  const diskGeometry = useMemo(() => {
    if (!showCrossSection || animationProgress < 0.1) return null;

    const { a, b } = selectedShape.bounds;
    const range = b - a;
    const angle = animationProgress * Math.PI * 2;

    const t = crossSectionPosition;
    const { x, y } = selectedShape.samplePoints(t);

    if (selectedShape.is3DBlock && selectedShape.blockDimensions) {
      const { innerRadius, outerRadius, height } = selectedShape.blockDimensions;
      
      if (rotationAxis === "x") {
        const ringGeo = new THREE.RingGeometry(innerRadius, outerRadius, 32, 1, 0, angle);
        ringGeo.rotateY(Math.PI / 2);
        const xPos = a + crossSectionPosition * height;
        ringGeo.translate(xPos, 0, 0);
        return ringGeo;
      } else {
        const ringGeo = new THREE.RingGeometry(innerRadius, outerRadius, 32, 1, 0, angle);
        ringGeo.rotateX(-Math.PI / 2);
        const yPos = crossSectionPosition * height;
        ringGeo.translate(0, yPos, 0);
        return ringGeo;
      }
    }

    if (rotationAxis === "x") {
      const radius = Math.abs(y);
      const diskGeo = new THREE.RingGeometry(0, radius, 32, 1, 0, angle);
      diskGeo.rotateY(Math.PI / 2);
      diskGeo.translate(x, 0, 0);
      return diskGeo;
    } else {
      const radius = Math.abs(x);
      const diskGeo = new THREE.RingGeometry(0, radius, 32, 1, 0, angle);
      diskGeo.rotateX(-Math.PI / 2);
      diskGeo.translate(0, y, 0);
      return diskGeo;
    }
  }, [selectedShape, rotationAxis, animationProgress, showCrossSection, crossSectionPosition]);

  if (!diskGeometry || !showCrossSection) return null;

  return (
    <mesh geometry={diskGeometry}>
      <meshBasicMaterial
        color="#ffaa00"
        transparent
        opacity={0.6}
        side={THREE.DoubleSide}
        wireframe={false}
      />
    </mesh>
  );
}
