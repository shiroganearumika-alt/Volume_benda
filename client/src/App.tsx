import { Suspense } from "react";
import "@fontsource/inter";
import { Scene3D, ControlPanel, FormulaDisplay, InfoModal } from "./components/revolution";
import { useIsMobile } from "./hooks/use-is-mobile";

function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-950">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-white text-lg">Loading 3D Scene...</p>
      </div>
    </div>
  );
}

function App() {
  const isMobile = useIsMobile();

  return (
    <div className="w-screen h-screen bg-slate-950 overflow-hidden relative">
      <Suspense fallback={<LoadingScreen />}>
        <div className="absolute inset-0">
          <Scene3D />
        </div>
      </Suspense>

      {isMobile ? (
        <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
          <FormulaDisplay />
          <ControlPanel />
          <div className="fixed top-3 right-3">
            <InfoModal />
          </div>
        </div>
      ) : (
        <>
          <div className="absolute top-4 left-4 flex flex-col gap-4">
            <ControlPanel />
          </div>

          <div className="absolute top-4 right-4 flex flex-col gap-4">
            <FormulaDisplay />
            <InfoModal />
          </div>
        </>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-500 text-xs text-center pointer-events-none">
        <p>Drag to rotate view | Scroll to zoom | Pinch on mobile</p>
      </div>
    </div>
  );
}

export default App;
