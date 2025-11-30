import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info, X } from "lucide-react";

export function InfoModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="bg-slate-900/95 border-slate-700 text-cyan-400 hover:bg-slate-800 hover:text-cyan-300 w-12 h-12 rounded-full shadow-lg"
        >
          <Info className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-cyan-400">
            Understanding Volumes of Revolution
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
          <section>
            <h4 className="text-white font-semibold mb-2">What is a Solid of Revolution?</h4>
            <p>
              When you take a 2D region and rotate it 360° around an axis, 
              you create a 3D solid. This is called a <span className="text-cyan-400">solid of revolution</span>.
            </p>
          </section>

          <section>
            <h4 className="text-white font-semibold mb-2">How Does Integration Help?</h4>
            <p>
              Integration allows us to "add up" infinitely many thin slices. 
              Imagine cutting the solid into infinitely thin disks or shells. 
              Each slice has a tiny volume, and integration sums them all together!
            </p>
          </section>

          <section>
            <h4 className="text-white font-semibold mb-2">Disk Method (X-Axis Rotation)</h4>
            <div className="bg-slate-800 p-3 rounded-lg">
              <p className="text-cyan-400 font-mono text-center mb-2">
                V = π ∫ₐᵇ [f(x)]² dx
              </p>
              <p className="text-xs">
                Each disk has radius f(x) and thickness dx. 
                The area of a circle is πr², so each disk's volume is π[f(x)]²dx.
              </p>
            </div>
          </section>

          <section>
            <h4 className="text-white font-semibold mb-2">Shell Method (Y-Axis Rotation)</h4>
            <div className="bg-slate-800 p-3 rounded-lg">
              <p className="text-green-400 font-mono text-center mb-2">
                V = 2π ∫ₐᵇ x·f(x) dx
              </p>
              <p className="text-xs">
                Each cylindrical shell has radius x, height f(x), and thickness dx.
                The shell's surface area is 2πx, so its volume is 2πx·f(x)·dx.
              </p>
            </div>
          </section>

          <section>
            <h4 className="text-white font-semibold mb-2">Washer Method (For Hollow Solids)</h4>
            <div className="bg-slate-800 p-3 rounded-lg">
              <p className="text-orange-400 font-mono text-center mb-2">
                V = π ∫ₐᵇ [R(x)² - r(x)²] dx
              </p>
              <p className="text-xs">
                When there's a hole in the middle (like a donut or tube), 
                we subtract the inner volume from the outer volume.
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 p-3 rounded-lg border border-cyan-500/30">
            <h4 className="text-cyan-400 font-semibold mb-1">Key Insight</h4>
            <p className="text-xs">
              The integral ∫ represents the continuous sum of all these infinitesimally 
              small volumes. This is the power of calculus - turning an impossible 
              infinite sum into a solvable equation!
            </p>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
