import { useEffect, useRef, useState } from 'react';
import { AbsoluteFill } from 'remotion';
import { useVideoConfig } from 'remotion';

interface CursorTrackingCompositionProps {
  videoUrl: string;
  effects: {
    scale: number;
    x: number;
    y: number;
  };
  currentFrame: number;
  isPlaying: boolean;
}

export const CursorTrackingComposition: React.FC<CursorTrackingCompositionProps> = ({
  videoUrl,
  effects,
  currentFrame,
  isPlaying,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { width, height } = useVideoConfig();

  useEffect(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.play().catch(console.error);
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = currentFrame / 30;
  }, [currentFrame]);

  return (
    <AbsoluteFill>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `scale(${effects.scale}) translate(${effects.x}px, ${effects.y}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
        />
      </div>
    </AbsoluteFill>
  );
}; 