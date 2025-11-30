import { useMemo } from "react";
import * as THREE from "three";
import { Line } from "@react-three/drei";
import { useRevolution } from "@/lib/stores/useRevolution";

export function Curve2D() {
  const { selectedShape, animationProgress } = useRevolution();

  const curvePoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const numPoints = 100;
    const { a, b } = selectedShape.bounds;

    if (selectedShape.is3DBlock && selectedShape.blockDimensions) {
      const { innerRadius, outerRadius, height } = selectedShape.blockDimensions;
      points.push(new THREE.Vector3(innerRadius, 0, 0));
      points.push(new THREE.Vector3(outerRadius, 0, 0));
      points.push(new THREE.Vector3(outerRadius, height, 0));
      points.push(new THREE.Vector3(innerRadius, height, 0));
      points.push(new THREE.Vector3(innerRadius, 0, 0));
    } else {
      for (let i = 0; i <= numPoints; i++) {
        const t = i / numPoints;
        const { x, y } = selectedShape.samplePoints(t);
        points.push(new THREE.Vector3(x, y, 0));
      }
      
      points.push(new THREE.Vector3(b, 0, 0));
      points.push(new THREE.Vector3(a, 0, 0));
      points.push(points[0].clone());
    }

    return points;
  }, [selectedShape]);

  const filledRegionGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const numPoints = 100;
    const { a, b } = selectedShape.bounds;

    if (selectedShape.is3DBlock && selectedShape.blockDimensions) {
      const { innerRadius, outerRadius, height } = selectedShape.blockDimensions;
      shape.moveTo(innerRadius, 0);
      shape.lineTo(outerRadius, 0);
      shape.lineTo(outerRadius, height);
      shape.lineTo(innerRadius, height);
      shape.lineTo(innerRadius, 0);
    } else {
      const firstPoint = selectedShape.samplePoints(0);
      shape.moveTo(firstPoint.x, firstPoint.y);

      for (let i = 1; i <= numPoints; i++) {
        const t = i / numPoints;
        const { x, y } = selectedShape.samplePoints(t);
        shape.lineTo(x, y);
      }

      shape.lineTo(b, 0);
      shape.lineTo(a, 0);
      shape.closePath();
    }

    return new THREE.ShapeGeometry(shape);
  }, [selectedShape]);

  const opacity = Math.max(0.1, 1 - animationProgress * 0.9);

  return (
    <group>
      <Line
        points={curvePoints}
        color="#00ffff"
        lineWidth={3}
        transparent
        opacity={opacity}
      />

      <mesh geometry={filledRegionGeometry} rotation={[0, 0, 0]}>
        <meshBasicMaterial
          color="#00aaff"
          transparent
          opacity={opacity * 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
