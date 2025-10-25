'use client';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroScreen from '@/components/IntroScreen';
import Loader from '@/components/Loader';
import BackgroundMusic from '@/components/BackgroundMusic';
import MainContent from '@/components/MainContent';
import Cards from '@/components/Cards';
import FallingHearts from '@/components/FallingHearts';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const musicRef = useRef(null);

  const handleStart = () => {
    setStarted(true);
    setLoading(true);
    setIsMusicPlaying(true);
    musicRef.current?.playMusic();
  };

  const handleShowMainContent = () => {
    setShowOverlay(true);

    // Longer, smoother transition
    setTimeout(() => {
      setShowMainContent(true);
      // Fade out overlay more slowly
      setTimeout(() => {
        setShowOverlay(false);
      }, 1200);
    }, 100);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundMusic
        ref={musicRef}
        isMusicPlaying={isMusicPlaying}
        setIsMusicPlaying={setIsMusicPlaying}
        isUnlocked={isUnlocked}
      />

      <AnimatePresence mode="wait">
        {!started ? (
          <motion.div
            key="intro"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
          >
            <IntroScreen onStart={handleStart} />
          </motion.div>
        ) : loading ? (
          <motion.div
            key="loader"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
          >
            <Loader onFinish={() => setLoading(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="content"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.8 }}
          >
            <FallingHearts />
            <AnimatePresence mode="wait">
              {!showMainContent ? (
                <motion.div
                  key="cards"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                >
                  <Cards
                    setMusicPlaying={setIsMusicPlaying}
                    handleShowMainContent={handleShowMainContent}
                    setUnlocked={setIsUnlocked}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="main"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <MainContent />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {showOverlay && (
          <motion.div
            key="overlay"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="fixed inset-0 bg-black z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
