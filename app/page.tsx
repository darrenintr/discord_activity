'use client';

import { useState } from 'react';
import YouTubeMusicEmbed from '@/components/YouTubeMusicEmbed';
import AppleMusicEmbed from '@/components/AppleMusicEmbed';

type Tab = 'youtube' | 'apple';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('youtube');

  return (
    <div className="flex flex-col min-h-screen bg-[#313338]">
      {/* Header */}
      <header className="flex items-center justify-between px-5 py-3 bg-[#232428] border-b border-[#1e1f22]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white">Music Activity</h1>
            <p className="text-xs text-[#b5bac1]">Your ad-free music player</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#b5bac1] bg-[#2b2d31] px-2 py-1 rounded border border-[#3f4147]">
            Premium Active
          </span>
        </div>
      </header>

      {/* Tab Bar */}
      <div className="flex border-b border-[#1e1f22] bg-[#2b2d31]">
        <button
          onClick={() => setActiveTab('youtube')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors relative ${
            activeTab === 'youtube'
              ? 'text-white'
              : 'text-[#b5bac1] hover:text-white hover:bg-[#35373c]'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {/* YouTube Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            YouTube Music
          </div>
          {activeTab === 'youtube' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-500" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('apple')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors relative ${
            activeTab === 'apple'
              ? 'text-white'
              : 'text-[#b5bac1] hover:text-white hover:bg-[#35373c]'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {/* Apple Music Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81.84-.553 1.472-1.287 1.88-2.208.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393z"/>
            </svg>
            Apple Music
          </div>
          {activeTab === 'apple' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500" />
          )}
        </button>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {activeTab === 'youtube' ? (
            <YouTubeMusicEmbed />
          ) : (
            <AppleMusicEmbed />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-5 py-3 bg-[#232428] border-t border-[#1e1f22] text-center">
        <p className="text-xs text-[#6d6f78]">
          Music plays through your own subscription — no ads, no interruptions.
        </p>
      </footer>
    </div>
  );
}
