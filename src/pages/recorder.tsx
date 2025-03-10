import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import type { EffectLayer } from '../components/VideoEditor';

interface MouseEvent {
  timestamp: number;
  x: number;
  y: number;
}

interface RecordingState {
  isRecording: boolean;
  startTime: number | null;
  mouseEvents: MouseEvent[];
  recordedVideoUrl: string | null;
  duration: number;
}

export default function ScreenRecorder() {
  const router = useRouter();
  const [state, setState] = useState<RecordingState>({
    isRecording: false,
    startTime: null,
    mouseEvents: [],
    recordedVideoUrl: null,
    duration: 0
  });
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const recordingStartTimeRef = useRef<number | null>(null);
  const mouseEventsRef = useRef<MouseEvent[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (state.isRecording && state.startTime) {
      intervalId = setInterval(() => {
        const elapsed = (Date.now() - state.startTime!) / 1000;
        setElapsedTime(Math.max(0, elapsed));
      }, 100);
    } else {
      setElapsedTime(0);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [state.isRecording, state.startTime]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { 
          displaySurface: 'monitor'
        },
        audio: false
      });

      const mediaRecorder = new MediaRecorder(stream);
      chunksRef.current = [];
      const startTime = Date.now();
      recordingStartTimeRef.current = startTime;

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const endTime = Date.now();
        const duration = (endTime - (recordingStartTimeRef.current || endTime)) / 1000;
        
        console.log('Recording stopped:', {
          totalClicks: mouseEventsRef.current.length,
        });
        
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        
        const fps = 30;
        const zoomDuration = 60; // 2 seconds at 30fps
        
        // Sort mouse events by timestamp to handle overlaps
        const sortedEvents = [...mouseEventsRef.current].sort((a, b) => a.timestamp - b.timestamp);
        
        console.log('Processing click events:', {
          sortedEvents,
        });

        const layers: EffectLayer[] = [];
        let lastEndFrame = -1;

        // Create non-overlapping layers
        sortedEvents.forEach((event, index) => {
          const eventTime = (event.timestamp - (recordingStartTimeRef.current || 0)) / 1000;
          const startFrame = Math.floor(eventTime * fps);
          
        
          // Ensure no overlap with previous layer
          if (startFrame <= lastEndFrame) {
            console.log('Skipping overlapping click event');
            return; // Skip this event if it would overlap
          }
          
          const endFrame = Math.min(Math.floor(duration * fps), startFrame + zoomDuration);
          
          // Create a single smooth zoom layer
          const layer: EffectLayer = {
            id: `zoom-${startFrame}-${index}`,
            type: 'zoom' as const,
            startFrame,
            endFrame,
            startValue: 1,
            endValue: 1.5
          };
          
          layers.push(layer);
          lastEndFrame = endFrame;
        });

        // Store data in localStorage
        try {
          
          localStorage.setItem('recordedVideoUrl', url);
          localStorage.setItem('recordedLayers', JSON.stringify(layers));
          localStorage.setItem('recordedDuration', duration.toString());
          
          // Navigate to editor
          router.push('/');
        } catch (err) {
          console.error('Error storing recording data:', err);
        }
      };

      mediaRecorderRef.current = mediaRecorder;
      mouseEventsRef.current = [];
      setState(prev => ({
        ...prev,
        isRecording: true,
        startTime: startTime,
        mouseEvents: []
      }));
      mediaRecorder.start();

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      const tracks = mediaRecorderRef.current.stream.getTracks();
      tracks.forEach(track => track.stop());
      setState(prev => ({ ...prev, isRecording: false }));
    }
  };

  const handleClick = (e: globalThis.MouseEvent) => {
    if (!state.isRecording || !state.startTime) return;

    // Ignore clicks on buttons
    const target = e.target as HTMLElement;
    if (target.closest('button')) return;

    const newEvent: MouseEvent = {
      timestamp: Date.now(),
      x: e.clientX,
      y: e.clientY
    };

    console.log('Click detected:', {
      event: newEvent,
      recordingStartTime: recordingStartTimeRef.current,
      elapsedTime: (Date.now() - (recordingStartTimeRef.current || Date.now())) / 1000,
      currentMouseEvents: mouseEventsRef.current.length
    });

    // Update both state and ref with new event
    mouseEventsRef.current = [...mouseEventsRef.current, newEvent];
    setState(prev => {
      const updatedEvents = [...prev.mouseEvents, newEvent];
      console.log('State updated with new click:', {
        previousEventsCount: prev.mouseEvents.length,
        newEventsCount: updatedEvents.length,
        allEvents: updatedEvents,
        refEvents: mouseEventsRef.current
      });
      return {
        ...prev,
        mouseEvents: updatedEvents
      };
    });

    // Visual feedback
    const feedback = document.createElement('div');
    feedback.style.position = 'absolute';
    feedback.style.left = `${e.clientX}px`;
    feedback.style.top = `${e.clientY}px`;
    feedback.style.width = '60px';
    feedback.style.height = '60px';
    feedback.style.border = '3px solid #3b82f6';
    feedback.style.borderRadius = '50%';
    feedback.style.transform = 'translate(-50%, -50%)';
    feedback.style.pointerEvents = 'none';
    feedback.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    feedback.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
    feedback.style.zIndex = '9999';
    document.body.appendChild(feedback);

    // Add inner circle for zoom effect
    const innerFeedback = document.createElement('div');
    innerFeedback.style.position = 'absolute';
    innerFeedback.style.left = '50%';
    innerFeedback.style.top = '50%';
    innerFeedback.style.width = '30px';
    innerFeedback.style.height = '30px';
    innerFeedback.style.border = '2px solid #3b82f6';
    innerFeedback.style.borderRadius = '50%';
    innerFeedback.style.transform = 'translate(-50%, -50%)';
    innerFeedback.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    innerFeedback.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
    feedback.appendChild(innerFeedback);

    // Animate the feedback
    setTimeout(() => {
      feedback.style.transform = 'translate(-50%, -50%) scale(1.75)';
      feedback.style.opacity = '0';
      innerFeedback.style.transform = 'translate(-50%, -50%) scale(0.5)';
      innerFeedback.style.opacity = '0';
      setTimeout(() => feedback.remove(), 800);
    }, 0);
  };

  useEffect(() => {
    if (!state.isRecording) return;

    window.addEventListener('mousedown', handleClick);
    return () => {
      window.removeEventListener('mousedown', handleClick);
    };
  }, [state.isRecording]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Screen Recorder</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4 relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-contain"
            />
            {state.isRecording && (
              <>
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  Recording... {formatTime(elapsedTime)} ({state.mouseEvents.length} clicks)
                </div>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
                  Click anywhere to add zoom effect
                </div>
              </>
            )}
          </div>

          <div className="flex justify-center gap-4 relative z-[10000]">
            {!state.isRecording ? (
              <button
                onClick={startRecording}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                Start Recording
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
              >
                Stop Recording ({formatTime(elapsedTime)})
              </button>
            )}
          </div>
        </div>

        {state.isRecording && (
          <div 
            className="fixed inset-0"
            style={{ pointerEvents: 'all', zIndex: 9998 }}
          />
        )}
      </div>
    </div>
  );
} 