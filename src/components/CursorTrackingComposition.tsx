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
  const { fps } = useVideoConfig();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const lastFrameRef = useRef(currentFrame);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoReady(true);
      video.currentTime = currentFrame / fps;
    };

    video.addEventListener('canplay', handleCanPlay);
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentFrame, fps]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVideoReady) return;

    if (isPlaying) {
      video.play().catch(() => {
        // Ignore play() errors
      });
    } else {
      video.pause();
      // Only update time if frame has changed
      if (lastFrameRef.current !== currentFrame) {
        video.currentTime = currentFrame / fps;
        lastFrameRef.current = currentFrame;
      }
    }
  }, [isPlaying, currentFrame, fps, isVideoReady]);

  return (
    <AbsoluteFill>
      <div
        style={{
          width: '100%',
          height: '100%',
          transform: `scale(${effects.scale}) translate(${-effects.x}px, ${-effects.y}px)`,
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
          playsInline
          muted
          onTimeUpdate={(e) => {
            const video = e.currentTarget;
            const currentVideoFrame = Math.round(video.currentTime * fps);
            if (currentVideoFrame !== currentFrame && !isPlaying) {
              video.currentTime = currentFrame / fps;
            }
          }}
        />
      </div>
    </AbsoluteFill>
  );
}; 