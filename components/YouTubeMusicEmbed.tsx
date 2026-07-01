'use client';

import React, { useState } from 'react';

interface YouTubeMusicEmbedProps {
  initialVideoId?: string;
}

function extractYouTubeVideoId(input: string): string | null {
  // Handle full URLs
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
    /^[a-zA-Z0-9_-]{11}$/, // Already a video ID
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) return match[1] || match[0];
  }
  return null;
}

export default function YouTubeMusicEmbed({ initialVideoId }: YouTubeMusicEmbedProps) {
  const [input, setInput] = useState('');
  const [videoId, setVideoId] = useState(initialVideoId || '');
  const [error, setError] = useState('');

  const handleLoad = () => {
    if (!input.trim()) return;
    const id = extractYouTubeVideoId(input.trim());
    if (id) {
      setVideoId(id);
      setError('');
    } else {
      setError('Invalid YouTube URL or video ID');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLoad();
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Search / URL Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste YouTube or YouTube Music link..."
          className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
        />
        <button
          onClick={handleLoad}
          className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition-colors"
        >
          Play
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Embed Player */}
      {videoId ? (
        <div className="w-full aspect-video rounded-xl overflow-hidden border border-zinc-700">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube Music"
          />
        </div>
      ) : (
        <div className="w-full aspect-video rounded-xl bg-zinc-800 border border-zinc-700 flex flex-col items-center justify-center text-zinc-500">
          <svg className="w-16 h-16 mb-3 text-zinc-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
          </svg>
          <p>Paste a YouTube Music link above to start playing</p>
        </div>
      )}

      {/* Quick Links */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Charts', url: 'https://www.youtube.com/watch?v=3EMWQEJbrsI' },
          { label: 'New Music', url: 'https://www.youtube.com/watch?v=Qw4wBesZ0eM' },
          { label: 'Chill Mix', url: 'https://www.youtube.com/watch?v=4xDzrJKXOOY' },
        ].map((link) => {
          const id = extractYouTubeVideoId(link.url);
          return (
            <button
              key={link.label}
              onClick={() => {
                if (id) setVideoId(id);
              }}
              className="px-3 py-1.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm border border-zinc-700 transition-colors"
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
