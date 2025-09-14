import React from 'react';

export default function MinigamePage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[600px] rounded-lg overflow-hidden shadow-2xl">
        <iframe
          src="https://psx-theminihack.vercel.app/"
          className="w-full h-full border-0"
          title="PSX MiniHack Game"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
} 