'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function IntroScreen({ onStart }) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const handle = () => {
      if (!started) {
        setStarted(true);
        onStart?.();
      }
    };
    window.addEventListener('click', handle, { once: true });
    window.addEventListener('touchstart', handle, { once: true });
    return () => {
      window.removeEventListener('click', handle);
      window.removeEventListener('touchstart', handle);
    };
  }, [started, onStart]);

  return (
    <div
      className="w-full h-screen flex items-center justify-center relative bg-gradient-to-b from-pink-50 via-pink-100 to-white"
      role="button"
      tabIndex={0}
      onClick={() => {
        if (!started) {
          setStarted(true);
          onStart?.();
        }
      }}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !started) {
          setStarted(true);
          onStart?.();
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center px-6"
      >
        <motion.div
          initial={{ y: -10, scale: 0.9 }}
          animate={{ y: [-10, 0, -8], scale: [0.95, 1, 0.98] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className="text-6xl"
        >
          💞
        </motion.div>

        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-pink-700 drop-shadow-sm">
          A little story for you, Cindy
        </h1>

        <p className="mt-3 text-sm md:text-base text-pink-600 max-w-xl mx-auto">
          A journey of memories and surprises — tap anywhere to open our story
          together.
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!started) {
              setStarted(true);
              onStart?.();
            }
          }}
          className="mt-8 inline-flex items-center gap-3 bg-white bg-opacity-80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-pink-200 hover:scale-105 transition-transform focus:outline-none"
        >
          <span className="text-pink-600 font-semibold">Tap to Begin</span>
          <span className="text-xl">✨</span>
        </button>

        <div className="mt-5 text-xs text-pink-400">
          or tap anywhere on the screen
        </div>
      </motion.div>

      {/* floating hearts decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-6 top-20 text-2xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        >
          💗
        </motion.div>
        <motion.div
          className="absolute right-10 top-32 text-3xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        >
          💓
        </motion.div>
        <motion.div
          className="absolute left-1/2 bottom-24 text-2xl -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
        >
          💕
        </motion.div>
      </div>
    </div>
  );
}
