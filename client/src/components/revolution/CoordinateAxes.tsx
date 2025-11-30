import { useMemo } from "react";
import * as THREE from "three";
import { Text, Line } from "@react-three/drei";

export function CoordinateAxes() {
  const axisLength = 5;

  const xAxisPoints = useMemo(() => [
    new THREE.Vector3(-axisLength, 0, 0),
    new THREE.Vector3(axisLength, 0, 0),
  ], []);

  const yAxisPoints = useMemo(() => [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, axisLength, 0),
  ], []);

  const zAxisPoints = useMemo(() => [
    new THREE.Vector3(0, 0, -axisLength),
    new THREE.Vector3(0, 0, axisLength),
  ], []);

  const arrowSize = 0.15;

  return (
    <group>
      <Line points={xAxisPoints} color="#ff4444" lineWidth={2} />
      <mesh position={[axisLength, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[arrowSize, arrowSize * 2, 8]} />
        <meshStandardMaterial color="#ff4444" />
      </mesh>
      <Text
        position={[axisLength + 0.4, 0, 0]}
        fontSize={0.3}
        color="#ff4444"
        anchorX="center"
        anchorY="middle"
      >
        X
      </Text>

      <Line points={yAxisPoints} color="#44ff44" lineWidth={2} />
      <mesh position={[0, axisLength, 0]}>
        <coneGeometry args={[arrowSize, arrowSize * 2, 8]} />
        <meshStandardMaterial color="#44ff44" />
      </mesh>
      <Text
        position={[0, axisLength + 0.4, 0]}
        fontSize={0.3}
        color="#44ff44"
        anchorX="center"
        anchorY="middle"
      >
        Y
      </Text>

      <Line points={zAxisPoints} color="#4444ff" lineWidth={2} />
      <mesh position={[0, 0, axisLength]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[arrowSize, arrowSize * 2, 8]} />
        <meshStandardMaterial color="#4444ff" />
      </mesh>
      <Text
        position={[0, 0, axisLength + 0.4]}
        fontSize={0.3}
        color="#4444ff"
        anchorX="center"
        anchorY="middle"
      >
        Z
      </Text>

      {[-4, -3, -2, -1, 1, 2, 3, 4].map((val) => (
        <group key={`x-tick-${val}`}>
          <mesh position={[val, 0, 0]}>
            <boxGeometry args={[0.02, 0.1, 0.02]} />
            <meshStandardMaterial color="#ff4444" />
          </mesh>
          <Text
            position={[val, -0.25, 0]}
            fontSize={0.15}
            color="#888888"
            anchorX="center"
            anchorY="top"
          >
            {val}
          </Text>
        </group>
      ))}

      {[1, 2, 3, 4].map((val) => (
        <group key={`y-tick-${val}`}>
          <mesh position={[0, val, 0]}>
            <boxGeometry args={[0.1, 0.02, 0.02]} />
            <meshStandardMaterial color="#44ff44" />
          </mesh>
          <Text
            position={[-0.25, val, 0]}
            fontSize={0.15}
            color="#888888"
            anchorX="right"
            anchorY="middle"
          >
            {val}
          </Text>
        </group>
      ))}
    </group>
  );
}
