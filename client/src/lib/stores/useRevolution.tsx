import { create } from "zustand";

export type RotationAxis = "x" | "y";

export interface ShapeDefinition {
  id: string;
  name: string;
  description: string;
  functionExpression: string;
  bounds: { a: number; b: number };
  samplePoints: (t: number) => { x: number; y: number };
  xAxisFormula: string;
  yAxisFormula: string;
  xAxisVolume: string;
  yAxisVolume: string;
  is3DBlock?: boolean;
  blockDimensions?: { innerRadius: number; outerRadius: number; height: number };
}

export const SHAPES: ShapeDefinition[] = [
  {
    id: "semicircle",
    name: "Semicircle → Sphere",
    description: "A semicircle rotating around the x-axis creates a perfect sphere",
    functionExpression: "f(x) = √(r² - x²)",
    bounds: { a: -2, b: 2 },
    samplePoints: (t: number) => {
      const x = -2 + t * 4;
      const y = Math.sqrt(Math.max(0, 4 - x * x));
      return { x, y };
    },
    xAxisFormula: "V = π∫₋ᵣʳ (√(r² - x²))² dx",
    yAxisFormula: "V = 2π∫₀ʳ x·√(r² - x²) dx",
    xAxisVolume: "V = (4/3)πr³",
    yAxisVolume: "V = (2/3)πr³",
  },
  {
    id: "parabola",
    name: "Parabola → Paraboloid",
    description: "A parabola rotating creates a bowl-shaped paraboloid",
    functionExpression: "f(x) = x²",
    bounds: { a: 0, b: 2 },
    samplePoints: (t: number) => {
      const x = t * 2;
      const y = x * x;
      return { x, y };
    },
    xAxisFormula: "V = π∫₀ᵇ (x²)² dx",
    yAxisFormula: "V = 2π∫₀ᵇ x·x² dx",
    xAxisVolume: "V = (π/5)b⁵",
    yAxisVolume: "V = (π/2)b⁴",
  },
  {
    id: "linear",
    name: "Linear → Cone",
    description: "A linear function rotating creates a cone shape",
    functionExpression: "f(x) = x",
    bounds: { a: 0, b: 2 },
    samplePoints: (t: number) => {
      const x = t * 2;
      const y = x;
      return { x, y };
    },
    xAxisFormula: "V = π∫₀ᵇ x² dx",
    yAxisFormula: "V = 2π∫₀ᵇ x·x dx",
    xAxisVolume: "V = (π/3)b³",
    yAxisVolume: "V = (2π/3)b³",
  },
  {
    id: "sine",
    name: "Sine Wave → Undulating Solid",
    description: "A sine curve creates a wave-like solid with varying radius",
    functionExpression: "f(x) = sin(x) + 1.5",
    bounds: { a: 0, b: Math.PI * 2 },
    samplePoints: (t: number) => {
      const x = t * Math.PI * 2;
      const y = Math.sin(x) + 1.5;
      return { x, y };
    },
    xAxisFormula: "V = π∫₀²π (sin(x) + 1.5)² dx",
    yAxisFormula: "V = 2π∫₀²π x·(sin(x) + 1.5) dx",
    xAxisVolume: "V = π(2.25·2π + 0.5)",
    yAxisVolume: "V ≈ 29.6π²",
  },
  {
    id: "exponential",
    name: "Exponential → Horn",
    description: "An exponential curve creates a horn or trumpet shape",
    functionExpression: "f(x) = eˣ/2",
    bounds: { a: 0, b: 1.5 },
    samplePoints: (t: number) => {
      const x = t * 1.5;
      const y = Math.exp(x) / 2;
      return { x, y };
    },
    xAxisFormula: "V = π∫₀ᵇ (eˣ/2)² dx",
    yAxisFormula: "V = 2π∫₀ᵇ x·(eˣ/2) dx",
    xAxisVolume: "V = (π/8)(e²ᵇ - 1)",
    yAxisVolume: "V = π(b·eᵇ - eᵇ + 1)",
  },
  {
    id: "sqrt",
    name: "Square Root → Curved Bowl",
    description: "A square root function creates a curved bowl shape",
    functionExpression: "f(x) = √x",
    bounds: { a: 0, b: 4 },
    samplePoints: (t: number) => {
      const x = t * 4;
      const y = Math.sqrt(x);
      return { x, y };
    },
    xAxisFormula: "V = π∫₀ᵇ (√x)² dx",
    yAxisFormula: "V = 2π∫₀ᵇ x·√x dx",
    xAxisVolume: "V = (π/2)b²",
    yAxisVolume: "V = (4π/5)b^(5/2)",
  },
  {
    id: "cubic",
    name: "Cubic → S-Curved Solid",
    description: "A cubic function creates an S-shaped solid profile",
    functionExpression: "f(x) = 0.5x³ + 0.5",
    bounds: { a: 0, b: 1.5 },
    samplePoints: (t: number) => {
      const x = t * 1.5;
      const y = 0.5 * x * x * x + 0.5;
      return { x, y };
    },
    xAxisFormula: "V = π∫₀ᵇ (0.5x³ + 0.5)² dx",
    yAxisFormula: "V = 2π∫₀ᵇ x·(0.5x³ + 0.5) dx",
    xAxisVolume: "V = π(b⁷/28 + b⁴/4 + b/4)",
    yAxisVolume: "V = π(b⁵/5 + b²/2)",
  },
  {
    id: "rectangle",
    name: "Rectangle → Cylinder",
    description: "A rectangle rotating creates a perfect cylinder",
    functionExpression: "f(x) = 1.5 (constant)",
    bounds: { a: 0, b: 3 },
    samplePoints: (t: number) => {
      const x = t * 3;
      const y = 1.5;
      return { x, y };
    },
    xAxisFormula: "V = π∫₀ᵇ r² dx",
    yAxisFormula: "V = 2π∫₀ᵇ x·r dx",
    xAxisVolume: "V = πr²h",
    yAxisVolume: "V = πrb²",
  },
  {
    id: "block3d",
    name: "3D Block → Disc Tube",
    description: "A rectangular block rotating creates a disc with a hole (washer/tube)",
    functionExpression: "Region between r₁ and r₂",
    bounds: { a: 0.5, b: 2 },
    samplePoints: (t: number) => {
      const x = 0.5 + t * 1.5;
      const y = 1.5;
      return { x, y };
    },
    xAxisFormula: "V = π∫₀ʰ (R² - r²) dx",
    yAxisFormula: "V = 2π∫ᵣᴿ x·h dx",
    xAxisVolume: "V = πh(R² - r²)",
    yAxisVolume: "V = πh(R² - r²)",
    is3DBlock: true,
    blockDimensions: { innerRadius: 0.5, outerRadius: 2, height: 1.5 },
  },
];

interface RevolutionState {
  selectedShape: ShapeDefinition;
  rotationAxis: RotationAxis;
  animationProgress: number;
  isPlaying: boolean;
  showCrossSection: boolean;
  crossSectionPosition: number;

  setSelectedShape: (shapeId: string) => void;
  setRotationAxis: (axis: RotationAxis) => void;
  setAnimationProgress: (progress: number) => void;
  setIsPlaying: (playing: boolean) => void;
  togglePlay: () => void;
  setShowCrossSection: (show: boolean) => void;
  setCrossSectionPosition: (position: number) => void;
  reset: () => void;
}

export const useRevolution = create<RevolutionState>((set, get) => ({
  selectedShape: SHAPES[0],
  rotationAxis: "x",
  animationProgress: 0,
  isPlaying: false,
  showCrossSection: true,
  crossSectionPosition: 0.5,

  setSelectedShape: (shapeId: string) => {
    const shape = SHAPES.find((s) => s.id === shapeId);
    if (shape) {
      set({ selectedShape: shape, animationProgress: 0, isPlaying: false });
    }
  },

  setRotationAxis: (axis: RotationAxis) => {
    set({ rotationAxis: axis, animationProgress: 0, isPlaying: false });
  },

  setAnimationProgress: (progress: number) => {
    set({ animationProgress: Math.min(1, Math.max(0, progress)) });
  },

  setIsPlaying: (playing: boolean) => {
    set({ isPlaying: playing });
  },

  togglePlay: () => {
    const { isPlaying, animationProgress } = get();
    if (animationProgress >= 1) {
      set({ animationProgress: 0, isPlaying: true });
    } else {
      set({ isPlaying: !isPlaying });
    }
  },

  setShowCrossSection: (show: boolean) => {
    set({ showCrossSection: show });
  },

  setCrossSectionPosition: (position: number) => {
    set({ crossSectionPosition: Math.min(1, Math.max(0, position)) });
  },

  reset: () => {
    set({ animationProgress: 0, isPlaying: false });
  },
}));
