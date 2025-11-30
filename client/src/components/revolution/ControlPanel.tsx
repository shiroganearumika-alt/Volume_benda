import { useRevolution, SHAPES, RotationAxis } from "@/lib/stores/useRevolution";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw } from "lucide-react";

export function ControlPanel() {
  const {
    selectedShape,
    rotationAxis,
    animationProgress,
    isPlaying,
    showCrossSection,
    crossSectionPosition,
    setSelectedShape,
    setRotationAxis,
    togglePlay,
    reset,
    setShowCrossSection,
    setCrossSectionPosition,
  } = useRevolution();

  return (
    <div className="bg-slate-900/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-slate-700/50 w-full max-w-sm">
      <h2 className="text-white text-lg font-semibold mb-4 text-center">
        Volume of Revolution
      </h2>

      <div className="space-y-4">
        <div>
          <label className="text-slate-300 text-sm font-medium mb-2 block">
            Select Shape
          </label>
          <Select value={selectedShape.id} onValueChange={setSelectedShape}>
            <SelectTrigger className="w-full bg-slate-800 border-slate-600 text-white">
              <SelectValue placeholder="Choose a shape" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {SHAPES.map((shape) => (
                <SelectItem
                  key={shape.id}
                  value={shape.id}
                  className="text-white hover:bg-slate-700 focus:bg-slate-700"
                >
                  {shape.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-slate-300 text-sm font-medium mb-2 block">
            Rotation Axis
          </label>
          <div className="flex gap-2">
            <Button
              variant={rotationAxis === "x" ? "default" : "outline"}
              onClick={() => setRotationAxis("x")}
              className={`flex-1 ${
                rotationAxis === "x"
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "border-slate-600 text-slate-300 hover:bg-slate-700"
              }`}
            >
              X-Axis
            </Button>
            <Button
              variant={rotationAxis === "y" ? "default" : "outline"}
              onClick={() => setRotationAxis("y")}
              className={`flex-1 ${
                rotationAxis === "y"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "border-slate-600 text-slate-300 hover:bg-slate-700"
              }`}
            >
              Y-Axis
            </Button>
          </div>
        </div>

        <div>
          <label className="text-slate-300 text-sm font-medium mb-2 block">
            Animation Progress: {Math.round(animationProgress * 100)}%
          </label>
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-100"
              style={{ width: `${animationProgress * 100}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={togglePlay}
            className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {animationProgress > 0 && animationProgress < 1 ? "Resume" : "Play"}
              </>
            )}
          </Button>
          <Button
            onClick={reset}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        <div className="pt-2 border-t border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <label className="text-slate-300 text-sm font-medium">
              Show Cross-Section
            </label>
            <Switch
              checked={showCrossSection}
              onCheckedChange={setShowCrossSection}
            />
          </div>
          
          {showCrossSection && (
            <div>
              <label className="text-slate-400 text-xs mb-1 block">
                Cross-Section Position
              </label>
              <Slider
                value={[crossSectionPosition * 100]}
                onValueChange={(val) => setCrossSectionPosition(val[0] / 100)}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
