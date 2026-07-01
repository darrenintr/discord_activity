'use client';

import React, { useState } from 'react';

interface AppleMusicEmbedProps {
  initialAlbumId?: string;
}

function extractAppleMusicId(input: string): string | null {
  // Apple Music URL patterns
  const patterns = [
    /music\.apple\.com\/([a-z]{2})\/([a-z0-9-]+)\/([a-z0-9]+)(?:\?i=([0-9]+))?/i,
    /apple\.music\.com\/([a-z]{2})\/([a-z0-9-]+)\/([a-z0-9]+)(?:\?i=([0-9]+))?/i,
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) {
      // Return format: lang/musicType/musicId or lang/musicType/musicId?i=trackId
      return `${match[1]}/${match[2]}/${match[3]}`;
    }
  }
  return null;
}

export default function AppleMusicEmbed({ initialAlbumId }: AppleMusicEmbedProps) {
  const [input, setInput] = useState('');
  const [musicId, setMusicId] = useState(initialAlbumId || '');
  const [error, setError] = useState('');

  const handleLoad = () => {
    if (!input.trim()) return;
    const id = extractAppleMusicId(input.trim());
    if (id) {
      setMusicId(id);
      setError('');
    } else {
      setError('Invalid Apple Music URL');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLoad();
  };

  // Embed URL format: https://embed.music.apple.com/{lang}/{type}/{id}
  const embedUrl = musicId
    ? `https://embed.music.apple.com/${musicId}`
    : null;

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Search / URL Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Paste Apple Music link..."
          className="flex-1 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 transition-colors"
        />
        <button
          onClick={handleLoad}
          className="px-5 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-medium transition-colors"
        >
          Play
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {/* Embed Player */}
      {embedUrl ? (
        <iframe
          className="w-full rounded-xl border border-zinc-700"
          height={450}
          src={embedUrl}
          allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
          sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
          title="Apple Music"
        />
      ) : (
        <div className="w-full h-[450px] rounded-xl bg-zinc-800 border border-zinc-700 flex flex-col items-center justify-center text-zinc-500">
          <svg className="w-16 h-16 mb-3 text-zinc-600" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81.84-.553 1.472-1.287 1.88-2.208.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.785-.568-2.057-1.508-.155-.537-.16-1.1-.167-1.655-.02-1.445-.01-2.89-.01-4.335 0-.54.004-1.082.014-1.624.01-.27-.008-.535-.057-.8-.076-.416-.374-.708-.79-.77-.207-.03-.416-.015-.617.05-.31.1-.505.38-.5.72v5.71z"/>
          </svg>
          <p>Paste an Apple Music link above to start playing</p>
        </div>
      )}

      {/* Quick Links */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Top 100', url: 'https://music.apple.com/us/playlist/top-100/s.4SUWK1oEHUbFhm9' },
          { label: 'New Music', url: 'https://music.apple.com/us/album/hot/1767855640' },
          { label: 'Chill', url: 'https://music.apple.com/us/playlist/chill-playlist/pl.8d15a5c0e8e54e8b9e9e9e9e9e9e9e9e' },
        ].map((link) => {
          const id = extractAppleMusicId(link.url);
          return (
            <button
              key={link.label}
              onClick={() => {
                if (id) setMusicId(id);
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
