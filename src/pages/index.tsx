import { useState, useRef } from 'react';
import Head from 'next/head';
import { VideoEditor } from '../components/VideoEditor';

export default function Home() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
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
              <p className="mt-4 text-gray-600">
                Upload a video to start adding zoom and pan effects
              </p>
            </div>
          ) : (
            <VideoEditor videoUrl={videoUrl} />
          )}
        </div>
      </main>
    </>
  );
}
