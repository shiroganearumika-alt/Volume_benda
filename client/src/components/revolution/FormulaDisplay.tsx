import { useRevolution } from "@/lib/stores/useRevolution";

export function FormulaDisplay() {
  const { selectedShape, rotationAxis } = useRevolution();

  const mainFormula = rotationAxis === "x"
    ? "V = π ∫ₐᵇ [f(x)]² dx"
    : "V = 2π ∫ₐᵇ x·f(x) dx";

  const methodName = rotationAxis === "x" ? "Disk Method" : "Shell Method";
  const axisLabel = rotationAxis === "x" ? "x-axis" : "y-axis";

  const shapeFormula = rotationAxis === "x"
    ? selectedShape.xAxisFormula
    : selectedShape.yAxisFormula;

  const volumeResult = rotationAxis === "x"
    ? selectedShape.xAxisVolume
    : selectedShape.yAxisVolume;

  return (
    <div className="bg-slate-900/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-slate-700/50 w-full max-w-sm">
      <h3 className="text-white text-sm font-semibold mb-3 text-center">
        {methodName} (Rotation about {axisLabel})
      </h3>

      <div className="space-y-3">
        <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-lg p-3 border border-cyan-500/30">
          <p className="text-slate-400 text-xs mb-1">General Formula</p>
          <p className="text-cyan-400 text-lg font-mono text-center">
            {mainFormula}
          </p>
        </div>

        <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-lg p-3 border border-blue-500/30">
          <p className="text-slate-400 text-xs mb-1">
            For: {selectedShape.functionExpression}
          </p>
          <p className="text-blue-400 text-sm font-mono text-center break-all">
            {shapeFormula}
          </p>
        </div>

        <div className="bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-lg p-3 border border-green-500/30">
          <p className="text-slate-400 text-xs mb-1">Evaluated Volume</p>
          <p className="text-green-400 text-lg font-mono text-center">
            {volumeResult}
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-2">
          <p className="text-slate-500 text-xs text-center italic">
            {selectedShape.description}
          </p>
        </div>
      </div>
    </div>
  );
}
