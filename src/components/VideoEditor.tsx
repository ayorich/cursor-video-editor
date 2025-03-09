import { useState, useRef, useEffect } from 'react';
import { Player } from '@remotion/player';
import { CursorTrackingComposition } from './CursorTrackingComposition';
import { Timeline } from './Timeline';
import { TimelineLayer } from './TimelineLayer';

export interface EffectLayer {
  id: string;
  type: 'zoom';
  startFrame: number;
  endFrame: number;
  startValue: number;
  endValue: number;
}

export const VideoEditor: React.FC<{ videoUrl: string }> = ({ videoUrl }) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [layers, setLayers] = useState<EffectLayer[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const playerRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const fps = 30;
  const totalFrames = Math.max(1, Math.floor(videoDuration * fps));

  useEffect(() => {
    setIsLoading(true);
    const video = document.createElement('video');
    video.src = videoUrl;
    video.onloadedmetadata = () => {
      setVideoDuration(video.duration);
      setIsLoading(false);
    };
  }, [videoUrl]);

  useEffect(() => {
    if (!isPlaying) return;

    let lastTime = performance.now();
    const frameInterval = 1000 / fps;
    let frame = currentFrame;

    const animate = (now: number) => {
      const deltaTime = now - lastTime;
      
      if (deltaTime >= frameInterval) {
        // Calculate how many frames to advance
        const framesToAdvance = Math.floor(deltaTime / frameInterval);
        frame = frame + framesToAdvance;
        
        // Handle looping
        if (frame >= totalFrames) {
          if (isLooping) {
            frame = 0;
          } else {
            setIsPlaying(false);
            frame = totalFrames - 1;
          }
        }
        
        setCurrentFrame(frame);
        lastTime = now - (deltaTime % frameInterval);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    const animationRef = { current: requestAnimationFrame(animate) };
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, fps, totalFrames, isLooping]);

  const handlePlayPause = () => {
    if (currentFrame >= totalFrames - 1) {
      setCurrentFrame(0);
    }
    setIsPlaying(!isPlaying);
  };

  const addLayer = () => {
    // Check for overlapping layers
    const hasOverlap = layers.some(layer => 
      (currentFrame >= layer.startFrame && currentFrame <= layer.endFrame) ||
      (currentFrame + fps * 2 >= layer.startFrame && currentFrame + fps * 2 <= layer.endFrame)
    );

    if (hasOverlap) {
      alert('Cannot add overlapping zoom effects at the same time range');
      return;
    }

    const newLayer: EffectLayer = {
      id: Date.now().toString(),
      type: 'zoom',
      startFrame: currentFrame,
      endFrame: Math.min(totalFrames - 1, currentFrame + fps * 2),
      startValue: 1,
      endValue: 1.5,
    };
    setLayers(prev => [...prev, newLayer]);
    setSelectedLayer(newLayer.id);
  };

  const updateLayer = (id: string, startFrame: number, endFrame: number) => {
    setLayers(prev => prev.map(layer => 
      layer.id === id ? { 
        ...layer, 
        startFrame: Math.max(0, startFrame),
        endFrame: Math.min(totalFrames - 1, endFrame)
      } : layer
    ));
  };

  const updateLayerValue = (id: string, value: number, isStart: boolean) => {
    setLayers(prev => prev.map(layer => {
      if (layer.id !== id) return layer;
      
      const currentStart = layer.startValue;
      const currentEnd = layer.endValue;
      
      if (isStart && value > currentEnd) {
        return { ...layer, startValue: currentEnd };
      }
      if (!isStart && value < currentStart) {
        return { ...layer, endValue: currentStart };
      }
      
      return { ...layer, [isStart ? 'startValue' : 'endValue']: value };
    }));
  };

  const getEffectsAtFrame = (frame: number) => {
    return layers.reduce((effects, layer) => {
      if (frame >= layer.startFrame && frame <= layer.endFrame) {
        const progress = (frame - layer.startFrame) / (layer.endFrame - layer.startFrame);
        const startZoom = layer.startValue;
        const endZoom = layer.endValue;
        effects.scale *= startZoom + (endZoom - startZoom) * progress;
      }
      return effects;
    }, { scale: 1, x: 0, y: 0 });
  };

  const deleteLayer = (id: string) => {
    setLayers(prev => prev.filter(layer => layer.id !== id));
    if (selectedLayer === id) {
      setSelectedLayer(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center aspect-video w-full bg-gray-100 rounded-lg">
        <div className="text-gray-500">Loading video...</div>
      </div>
    );
  }

  const selectedLayerData = selectedLayer ? layers.find(l => l.id === selectedLayer) : null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <button
          onClick={handlePlayPause}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <button
          onClick={() => setIsLooping(!isLooping)}
          className={`p-2 rounded-full ${
            isLooping ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
          } hover:opacity-80`}
          title={isLooping ? 'Disable loop' : 'Enable loop'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
        <button
          onClick={addLayer}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Zoom
        </button>
      </div>

      <div className="aspect-video w-full bg-gray-100 rounded-lg overflow-hidden">
        <Player
          ref={playerRef}
          component={CursorTrackingComposition}
          inputProps={{
            videoUrl,
            effects: getEffectsAtFrame(currentFrame),
            currentFrame,
            isPlaying
          }}
          durationInFrames={totalFrames}
          fps={fps}
          compositionWidth={1920}
          compositionHeight={1080}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </div>

      <Timeline
        currentFrame={currentFrame}
        totalFrames={totalFrames}
        fps={fps}
        layers={layers}
        onFrameChange={setCurrentFrame}
        onLayerUpdate={updateLayer}
        onLayerSelect={setSelectedLayer}
        onLayerDelete={deleteLayer}
        selectedLayerId={selectedLayer}
        isPlaying={isPlaying}
        onLayerValueUpdate={updateLayerValue}
      />

      {selectedLayerData && (
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Edit Zoom Effect</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="start-zoom" className="block text-sm font-medium mb-1">Start Zoom</label>
              <input
                id="start-zoom"
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={selectedLayerData.startValue}
                onChange={(e) => updateLayerValue(selectedLayerData.id, Number(e.target.value), true)}
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="end-zoom" className="block text-sm font-medium mb-1">End Zoom</label>
              <input
                id="end-zoom"
                type="range"
                min="0.5"
                max="3"
                step="0.1"
                value={selectedLayerData.endValue}
                onChange={(e) => updateLayerValue(selectedLayerData.id, Number(e.target.value), false)}
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 