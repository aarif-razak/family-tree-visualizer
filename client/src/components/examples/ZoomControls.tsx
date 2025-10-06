import { ZoomControls } from '../ZoomControls';
import { useState } from 'react';

export default function ZoomControlsExample() {
  const [zoom, setZoom] = useState(1);

  return (
    <div className="relative w-full h-96 bg-background">
      <ZoomControls
        zoom={zoom}
        onZoomIn={() => setZoom(Math.min(zoom + 0.1, 2))}
        onZoomOut={() => setZoom(Math.max(zoom - 0.1, 0.5))}
        onReset={() => setZoom(1)}
      />
    </div>
  );
}
