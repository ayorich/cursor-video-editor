import { useEffect, useRef, useState } from 'react';

interface TimelineLayerProps {
  id: string;
  startFrame: number;
  endFrame: number;
  totalFrames: number;
  fps: number;
  onUpdate: (id: string, startFrame: number, endFrame: number) => void;
  onSelect: () => void;
  isSelected: boolean;
  onDelete?: () => void;
  onUpdateValue?: (value: number, isStart: boolean) => void;
  startValue?: number;
  endValue?: number;
}

export const TimelineLayer: React.FC<TimelineLayerProps> = ({
  id,
  startFrame,
  endFrame,
  totalFrames,
  fps,
  onUpdate,
  onSelect,
  isSelected,
  onDelete,
  onUpdateValue,
  startValue,
  endValue,
}) => {
  const layerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<'start' | 'end' | 'move' | null>(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [initialStart, setInitialStart] = useState(0);
  const [initialEnd, setInitialEnd] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [resizePreview, setResizePreview] = useState<{ start: number; end: number } | null>(null);
  const [isDraggingZoom, setIsDraggingZoom] = useState(false);
  const [zoomHandleStartY, setZoomHandleStartY] = useState(0);
  const [initialZoomValue, setInitialZoomValue] = useState(0);
  const [activeHandle, setActiveHandle] = useState<'start' | 'end' | null>(null);

  // Minimum duration in seconds
  const MIN_DURATION = 0.5;
  const MIN_FRAMES = Math.ceil(MIN_DURATION * fps);
  
  // Snap threshold in frames (about 0.1 seconds)
  const SNAP_THRESHOLD = Math.ceil(0.1 * fps);

  const handleLayerMove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging('move');
    setDragStartX(e.clientX);
    setInitialStart(startFrame);
    setInitialEnd(endFrame);
    setResizePreview(null);
  };

  const handleResize = (e: React.MouseEvent, handle: 'start' | 'end') => {
    e.stopPropagation();
    setIsDragging(handle);
    setDragStartX(e.clientX);
    setInitialStart(startFrame);
    setInitialEnd(endFrame);
    setResizePreview(null);
  };

  const snapToGrid = (frame: number) => {
    // Snap points every quarter second
    const quarterSecondFrames = fps / 4;
    const snapPoints = [];
    
    // Generate snap points
    for (let i = 0; i <= totalFrames; i += quarterSecondFrames) {
      snapPoints.push(i);
    }
    
    // Find closest snap point within threshold
    const closest = snapPoints.reduce((prev, curr) => {
      return Math.abs(curr - frame) < Math.abs(prev - frame) ? curr : prev;
    });
    
    return Math.abs(closest - frame) <= SNAP_THRESHOLD ? closest : frame;
  };

  const handleZoomHandleMouseDown = (e: React.MouseEvent, handle: 'start' | 'end') => {
    e.stopPropagation();
    setIsDraggingZoom(true);
    setActiveHandle(handle);
    setZoomHandleStartY(e.clientY);
    setInitialZoomValue(handle === 'start' ? startValue as number : endValue as number);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!layerRef.current) return;
      
      const rect = layerRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const deltaX = e.clientX - dragStartX;
      const pixelsPerFrame = rect.width / totalFrames;
      const framesDelta = deltaX / pixelsPerFrame;
      
      let newStart = startFrame;
      let newEnd = endFrame;

      switch (isDragging) {
        case 'move': {
          const duration = endFrame - startFrame;
          newStart = Math.max(0, Math.min(totalFrames - duration, initialStart + framesDelta));
          newEnd = newStart + duration;
          break;
        }
        case 'start': {
          newStart = Math.max(0, Math.min(endFrame - MIN_FRAMES, initialStart + framesDelta));
          newEnd = endFrame;
          break;
        }
        case 'end': {
          newStart = startFrame;
          newEnd = Math.max(startFrame + MIN_FRAMES, Math.min(totalFrames, initialEnd + framesDelta));
          break;
        }
      }

      // Calculate snapped values but keep unsnapped for preview
      const snappedStart = snapToGrid(Math.round(newStart));
      const snappedEnd = snapToGrid(Math.round(newEnd));

      // Update preview with unsnapped values for smooth visual feedback
      setResizePreview({
        start: newStart,
        end: newEnd
      });

      // Only update with snapped values when they change
      if (snappedStart !== startFrame || snappedEnd !== endFrame) {
        onUpdate(id, snappedStart, snappedEnd);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(null);
      setResizePreview(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStartX, initialStart, initialEnd, id, onUpdate, startFrame, endFrame, totalFrames, fps]);

  useEffect(() => {
    if (!isDraggingZoom || !activeHandle) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = zoomHandleStartY - e.clientY;
      // Convert pixel movement to zoom value (1 pixel = 0.01 zoom)
      const zoomDelta = deltaY * 0.01;
      const newZoom = Math.max(0.5, Math.min(3, initialZoomValue + zoomDelta));
      onUpdateValue?.(newZoom, activeHandle === 'start');
    };

    const handleMouseUp = () => {
      setIsDraggingZoom(false);
      setActiveHandle(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingZoom, zoomHandleStartY, initialZoomValue, onUpdateValue, activeHandle]);

  // Add keyboard delete handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Delete' || e.key === 'Backspace') && isSelected) {
        // You'll need to add onDelete prop to the component and handle it in VideoEditor
        onDelete?.();
      }
    };

    if (isSelected) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isSelected, onDelete]);

  const formatDuration = (frames: number) => {
    const seconds = frames / fps;
    return seconds.toFixed(1);
  };

  return (
    <div
      ref={layerRef}
      className={`absolute h-8 ${isSelected ? 'z-10' : 'z-0'}`}
      style={{
        left: `${((resizePreview?.start ?? startFrame) / totalFrames) * 100}%`,
        width: `${((resizePreview?.end ?? endFrame) - (resizePreview?.start ?? startFrame)) / totalFrames * 100}%`,
        transition: isDragging ? 'none' : 'all 0.1s ease-out'
      }}
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative h-full rounded bg-blue-500
        ${isSelected ? 'opacity-100 ring-2 ring-white' : hovered ? 'opacity-90' : 'opacity-70'}`}
        style={{ cursor: isDragging === 'move' ? 'grabbing' : 'grab' }}
        onMouseDown={handleLayerMove}
      >
        {/* Left resize handle */}
        <div
          className={`absolute left-0 top-0 w-3 h-full bg-white/50 hover:bg-white/80 
          rounded-l group z-10
          transition-all duration-200 ${hovered || isSelected ? 'opacity-100' : 'opacity-50'}
          ${isDragging === 'start' ? 'ring-2 ring-blue-300 bg-white' : ''}`}
          onMouseDown={(e) => handleResize(e, 'start')}
          style={{ cursor: 'ew-resize' }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="w-0.5 h-3 bg-blue-500" />
          </div>
          {(hovered || isSelected || isDragging === 'start') && (
            <div className="absolute bottom-full left-0 mb-1 text-xs text-white whitespace-nowrap">
              {formatTime((resizePreview?.start ?? startFrame) / fps)}
            </div>
          )}
        </div>

        {/* Right resize handle */}
        <div
          className={`absolute right-0 top-0 w-3 h-full bg-white/50 hover:bg-white/80 
          rounded-r group z-10
          transition-all duration-200 ${hovered || isSelected ? 'opacity-100' : 'opacity-50'}
          ${isDragging === 'end' ? 'ring-2 ring-blue-300 bg-white' : ''}`}
          onMouseDown={(e) => handleResize(e, 'end')}
          style={{ cursor: 'ew-resize' }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="w-0.5 h-3 bg-blue-500" />
          </div>
          {(hovered || isSelected || isDragging === 'end') && (
            <div className="absolute bottom-full right-0 mb-1 text-xs text-white whitespace-nowrap">
              {formatTime((resizePreview?.end ?? endFrame) / fps)}
            </div>
          )}
        </div>

        {/* Label with zoom value */}
        <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium select-none">
          Zoom {(startValue as number).toFixed(1)}x → {(endValue as number).toFixed(1)}x
        </div>

        {/* Duration tooltip */}
        {(hovered || isSelected || isDragging) && (
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white 
          text-xs py-1 px-2 rounded whitespace-nowrap select-none">
            {formatDuration((resizePreview?.end ?? endFrame) - (resizePreview?.start ?? startFrame))}s
          </div>
        )}
      </div>
    </div>
  );
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 10);
  return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
}; 