import { useEffect, useRef, useState } from 'react';
import { TimelineLayer } from './TimelineLayer';
import type { EffectLayer } from './VideoEditor';

interface TimelineProps {
  currentFrame: number;
  totalFrames: number;
  fps: number;
  layers: EffectLayer[];
  onFrameChange: (frame: number) => void;
  onLayerUpdate: (id: string, startFrame: number, endFrame: number) => void;
  onLayerSelect: (id: string) => void;
  onLayerDelete: (id: string) => void;
  onLayerValueUpdate: (id: string, value: number, isStart: boolean) => void;
  selectedLayerId: string | null;
  isPlaying: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({
  currentFrame,
  totalFrames,
  fps,
  layers,
  onFrameChange,
  onLayerUpdate,
  onLayerSelect,
  onLayerDelete,
  onLayerValueUpdate,
  selectedLayerId,
  isPlaying,
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredTime, setHoveredTime] = useState<number | null>(null);

  const formatTime = (frame: number) => {
    const seconds = Math.floor(frame / fps);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleTimelineInteraction = (e: React.MouseEvent | MouseEvent) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const frame = Math.round(percentage * totalFrames);
    onFrameChange(frame);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!timelineRef.current) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const frame = Math.round(percentage * totalFrames);
    setHoveredTime(frame);

    if (isDragging) {
      handleTimelineInteraction(e);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!timelineRef.current) return;
      
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, x / rect.width));
      const frame = Math.round(percentage * totalFrames);
      onFrameChange(frame);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Group related layers together
  const groupedLayers = layers.reduce((groups, layer) => {
    const baseId = layer.id.split('-')[2]; // Get the index part of the ID
    if (!groups[baseId]) {
      groups[baseId] = [];
    }
    groups[baseId].push(layer);
    return groups;
  }, {} as Record<string, EffectLayer[]>);

  return (
    <div className="bg-gray-800 p-4 rounded-lg select-none">
      <div className="mb-2 flex justify-between text-gray-400 text-sm">
        <span>{formatTime(currentFrame)}</span>
        {hoveredTime !== null && (
          <span className="text-blue-400">{formatTime(hoveredTime)}</span>
        )}
        <span>{formatTime(totalFrames)}</span>
      </div>

      <div
        ref={timelineRef}
        className="relative h-32 bg-gray-700 rounded cursor-pointer group"
        onClick={handleTimelineInteraction}
        onMouseDown={() => setIsDragging(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredTime(null)}
      >
        {/* Time markers */}
        <div className="absolute top-0 left-0 w-full h-full">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 h-full w-px bg-gray-600"
              style={{ left: `${(i + 1) * 10}%` }}
            />
          ))}
        </div>

        {/* Layers */}
        <div className="relative flex-1">
          {Object.values(groupedLayers).map((group) => {
            // Use the zoom layer as the representative for the group
            const mainLayer = group.find(l => l.type === 'zoom') || group[0];
            return (
              <TimelineLayer
                key={mainLayer.id}
                id={mainLayer.id}
                startFrame={mainLayer.startFrame}
                endFrame={mainLayer.endFrame}
                totalFrames={totalFrames}
                fps={fps}
                onUpdate={(id, start, end) => {
                  // Update all layers in the group
                  group.forEach(layer => {
                    onLayerUpdate(layer.id, start, end);
                  });
                }}
                onSelect={() => onLayerSelect(mainLayer.id)}
                onDelete={() => {
                  // Delete all layers in the group
                  group.forEach(layer => {
                    onLayerDelete(layer.id);
                  });
                }}
                onUpdateValue={(value, isStart) => onLayerValueUpdate(mainLayer.id, value, isStart)}
                isSelected={mainLayer.id === selectedLayerId}
                startValue={mainLayer.type === 'zoom' ? mainLayer.startValue : undefined}
                endValue={mainLayer.type === 'zoom' ? mainLayer.endValue : undefined}
              />
            );
          })}
        </div>

        {/* Hover indicator */}
        {hoveredTime !== null && !isDragging && (
          <div
            className="absolute top-0 h-full w-px bg-blue-400 opacity-50"
            style={{
              left: `${(hoveredTime / totalFrames) * 100}%`,
              transform: 'translateX(-50%)',
            }}
          />
        )}

        {/* Playhead */}
        <div
          className={`absolute top-0 w-0.5 h-full bg-red-500 transition-transform ${
            !isDragging && isPlaying ? 'duration-100' : 'duration-0'
          }`}
          style={{
            left: `${(currentFrame / totalFrames) * 100}%`,
            transform: 'translateX(-50%)',
          }}
        >
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full" />
        </div>
      </div>
    </div>
  );
}; 