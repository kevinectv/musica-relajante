'use client';

import { useEffect, useRef, useState } from 'react';
import { tracks } from '@/utils/tracks';

export default function UrbanPlayer() {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(console.error);
    }
  }, [currentTrack]);

  const playNext = () => {
    const currentIndex = tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>{currentTrack.name}</h1>
      <p>{currentTrack.artist}</p>
      <img src={currentTrack.cover_url} alt="cover" width={200} />
      <audio ref={audioRef} controls onEnded={playNext}>
        <source src={currentTrack.audio_url} type="audio/mpeg" />
      </audio>
    </div>
  );
}
