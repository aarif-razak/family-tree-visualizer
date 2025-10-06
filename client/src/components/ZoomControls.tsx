import { Minus, Plus, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function ZoomControls({ zoom, onZoomIn, onZoomOut, onReset }: ZoomControlsProps) {
  return (
    <div className="fixed bottom-6 left-6 flex items-center gap-2 bg-card border border-card-border rounded-lg p-2 shadow-lg">
      <Button
        size="icon"
        variant="ghost"
        onClick={onZoomOut}
        data-testid="button-zoom-out"
      >
        <Minus className="h-4 w-4" />
      </Button>
      <div className="px-2 text-sm font-mono min-w-16 text-center" data-testid="text-zoom-level">
        {Math.round(zoom * 100)}%
      </div>
      <Button
        size="icon"
        variant="ghost"
        onClick={onZoomIn}
        data-testid="button-zoom-in"
      >
        <Plus className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        size="icon"
        variant="ghost"
        onClick={onReset}
        data-testid="button-reset-view"
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
