import { Volume2, VolumeX } from 'lucide-react';
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const BackgroundMusic = React.forwardRef(function BackgroundMusic(
  { isMusicPlaying, setIsMusicPlaying, isUnlocked },
  ref
) {
  const audioRef = useRef(null);

  // expose imperative playMusic so parent can start playback on first tap
  React.useImperativeHandle(ref, () => ({
    playMusic: () => {
      if (!audioRef.current) return;
      // ensure unmuted and play in the same user gesture
      audioRef.current.muted = false;
      audioRef.current.volume = 0.45; // reasonable default
      audioRef.current
        .play()
        .then(() => setIsMusicPlaying?.(true))
        .catch(() => {});
    },
  }));

  useEffect(() => {
    // keep your existing autoplay-preload logic but safe to keep audio muted until user gesture
    if (audioRef.current) {
      audioRef.current.muted = true;
      audioRef.current.volume = 0;
      audioRef.current.play().catch(() => {});
    }
    const handleFirstClick = () => {
      // fallback if parent didn't call playMusic
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.volume = 0.45;
        audioRef.current.play().catch(() => {});
        setIsMusicPlaying?.(true);
        window.removeEventListener('click', handleFirstClick);
      }
    };
    window.addEventListener('click', handleFirstClick, { once: true });
    return () => window.removeEventListener('click', handleFirstClick);
  }, [setIsMusicPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = isUnlocked
      ? '/audio/mainSong.mp3'
      : '/audio/intro.mp3';
    audioRef.current.currentTime = 0;
    if (isMusicPlaying) audioRef.current.play().catch(() => {});
    else audioRef.current.pause();
  }, [isUnlocked, isMusicPlaying]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying?.(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsMusicPlaying?.(true);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-4 right-4 z-50"
    >
      <audio ref={audioRef} loop preload="auto">
        <source src="/audio/intro.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <button
        onClick={toggleMusic}
        className="bg-pink-400 text-white p-3 rounded-full shadow-lg focus:outline-none hover:bg-pink-500 transition-all"
      >
        {isMusicPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </motion.div>
  );
});

BackgroundMusic.displayName = 'BackgroundMusic';
export default BackgroundMusic;
