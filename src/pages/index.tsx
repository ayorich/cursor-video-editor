import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { VideoEditor } from '../components/VideoEditor';
import type { EffectLayer } from '../components/VideoEditor';

export default function Home() {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [initialLayers, setInitialLayers] = useState<any[]>([]);
  const [initialDuration, setInitialDuration] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check for recorded video data in localStorage
    const recordedVideoUrl = localStorage.getItem('recordedVideoUrl');
    const recordedLayers = localStorage.getItem('recordedLayers');
    const recordedDuration = localStorage.getItem('recordedDuration');

    if (recordedVideoUrl && recordedLayers && recordedDuration) {
      try {
        const parsedLayers = JSON.parse(recordedLayers);
        setVideoUrl(recordedVideoUrl);
        console.log('parsedLayers', parsedLayers);
        setInitialLayers(parsedLayers);
        setInitialDuration(parseFloat(recordedDuration));

        return ()=>{
        // Clear localStorage after reading
        localStorage.removeItem('recordedVideoUrl');
        localStorage.removeItem('recordedLayers');
        localStorage.removeItem('recordedDuration');

        }
      } catch (err) {
        console.error('Error parsing recorded data:', err);
      }
    }
  }, []); // Run once on mount

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setInitialLayers([]); // Reset layers for uploaded video
      setInitialDuration(null); // Reset duration for uploaded video
    }
  };

  return (
    <>
      <Head>
        <title>Video Editor - Zoom & Pan</title>
        <meta name="description" content="Add zoom and pan effects to your videos" />
      </Head>
      <main className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Video Editor</h1>
          
          {!videoUrl ? (
            <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-100 rounded-lg">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                ref={fileInputRef}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg"
              >
                Upload Video
              </button>
              <button
                onClick={() => router.push('/recorder')}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg mt-4"
              >
                Screen Record
              </button>
              <p className="mt-4 text-gray-600">
                Upload a video to start adding zoom and pan effects
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <VideoEditor 
                key={videoUrl}
                videoUrl={videoUrl} 
                initialLayers={initialLayers}
                initialDuration={initialDuration}
              />
              {initialLayers.length > 0 && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-600">
                    Loaded {initialLayers.length} zoom effects from your recording
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
