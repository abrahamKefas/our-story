'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, HeartIcon, X } from 'lucide-react';
import StoryPage from './StoryPage';
import { TimeCounter } from './TimeCounter';
import { FlipWords } from './ui/flip-words';

export default function MainContent() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, 5));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  // Buat array media: video dulu, baru foto
  const mediaItems = [
    ...Array.from({ length: 2 }, (_, i) => ({
      type: 'video',
      src: `/videos/${i + 1}.mp4`,
    })),
    ...Array.from({ length: 18 }, (_, i) => ({
      type: 'image',
      src: `/photos/${i + 1}.jpg`,
    })),
  ];

  const pages = [
    // Cover Page
    <StoryPage
      key="cover"
      backgroundColor="bg-gradient-to-br from-rose-200 to-purple-200"
    >
      <div className="flex flex-col items-center justify-center h-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-44 h-44 mb-8 rounded-full overflow-hidden shadow-md"
        >
          <Image
            src="/photos/15.jpg"
            alt="Heart icon"
            priority={true}
            width={176}
            height={176}
            className="object-cover w-full h-full"
          />
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-4 relative z-10">
          Our Special Story
        </h1>
        <div className="text-2xl md:text-3xl text-purple-700 mb-8 relative z-10">
          Hey Honey, you are
          <br />
          my
          <FlipWords
            words={['sunshine', 'soulmate', 'everything', 'love', 'world']}
            className="text-nowrap"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-pink-500 text-white px-6 py-3 rounded-full text-lg shadow-btn hover:bg-pink-600 transition-colors duration-300"
          onClick={nextPage}
        >
          Open Our Story
        </motion.button>
      </div>
    </StoryPage>,

    // Our Journey Page
    <StoryPage
      key="journey"
      backgroundColor="bg-gradient-to-br from-blue-200 to-green-200"
    >
      <h2 className="text-3xl font-bold text-blue-600 mb-6 relative z-10">
        Our Journey
      </h2>
      <div className="space-y-4 flex-1 overflow-y-auto overflow-x-hidden rounded-xl custom-scrollbar">
        {[
          {
            date: '03 February, 2025',
            event: 'First Met',
            emoji: '👋',
          },
          {
            date: '11 October, 2025',
            event: 'Officially Together',
            emoji: '❤️',
          },
          { date: '??, 2025', event: 'First Movie Together', emoji: '🎬' },
          {
            date: '18 October, 2025',
            event: 'First Hug and Kiss',
            emoji: '🤗',
          },
          {
            date: '13 September, 2025',
            event: 'First Date Together',
            emoji: '💑',
          },
          //   {
          //     date: '10 August, 2022',
          //     event: 'First Fight & Patch-up',
          //     emoji: '💬',
          //   },
          {
            date: '?? December, 2025',
            event: 'First Christmas Together',
            emoji: '🎄',
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            className="flex items-center space-x-4 bg-white p-4 rounded-xl shadow-md"
          >
            <span className="text-3xl">{item.emoji}</span>
            <div className="relative z-10">
              <p className="font-medium text-gray-800">{item.event}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </StoryPage>,

    // Time Together Page
    <StoryPage
      key="time"
      backgroundColor="bg-gradient-to-br from-pink-200 to-purple-200"
    >
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 relative z-10">
          Our Time Together
        </h2>
        <div className="w-full max-w-md space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <TimeCounter
              startDate="2025-02-03"
              endDate="2025-10-11"
              label="As Friends"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <TimeCounter startDate="2025-10-11" label="As a Couple" />
          </motion.div>
        </div>
        <motion.div
          className="mt-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <HeartIcon className="w-16 h-16 text-rose-500 mx-auto" />
        </motion.div>
        <motion.p
          className="text-lg md:text-xl text-blue-600 mt-5 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Every moment with you is a treasure!
        </motion.p>
      </div>
    </StoryPage>,

    // Photo Gallery Page
    <StoryPage
      key="gallery"
      backgroundColor="bg-gradient-to-br from-blue-50 to-cyan-100"
    >
      <h2 className="text-3xl font-bold text-indigo-600 mb-6 relative z-10">
        Memorable Moments
      </h2>
      <div className="flex-1 rounded-2xl overflow-y-auto overflow-x-hidden custom-scrollbar">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 rounded-2xl">
          {mediaItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative rounded-2xl overflow-hidden shadow-md cursor-pointer aspect-square"
              onClick={() => setSelectedImage(i)}
            >
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={`Media ${i + 1}`}
                  width={330}
                  height={270}
                  className="rounded-2xl object-cover h-full w-full"
                />
              ) : (
                <video
                  src={item.src}
                  className="rounded-2xl object-cover h-full w-full"
                  controls
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </StoryPage>,

    // Letter page
    <StoryPage
      key="letter"
      backgroundColor="bg-gradient-to-br from-blue-200 to-gray-200"
    >
      <h2 className="text-3xl font-bold text-blue-600 mb-6 relative z-10">
        A Special Message
      </h2>
      <div className="bg-white rounded-xl p-6 shadow-md overflow-y-auto flex-1 custom-scrollbar">
        <div className="relative z-10">
          <div className="text-gray-700 text-lg leading-relaxed mb-4">
            <p>
              Since the very first moment we were together, life has felt more
              beautiful, warmer, and full of color. Every smile, every laugh,
              every conversation, even every challenge we faced — all of it has
              shaped our story into what it is today. There are simply no words
              that can describe how precious those moments are.
            </p>

            <p>
              I’m truly grateful to have someone like you — someone who
              understands me, who loves me sincerely, who lights up my world
              just by being there, and who accepts me exactly as I am. You were
              the first person to give me a birthday gift, yet your presence
              itself is the greatest gift of all. Through everything we’ve been
              through, you’ve always been my source of strength and happiness.
            </p>

            <p>
              As we continue writing our journey together, I want you to
              remember — you are deeply loved, truly appreciated, and endlessly
              cherished. For the countless memories yet to come, and the
              beautiful future waiting for us… You are, and will always be, my
              favorite part of every day. 💖
            </p>
          </div>
          <p className="text-right text-rose-600 font-semibold">
            Forever yours,
            <br />
            Your love❤️
          </p>
        </div>
      </div>
    </StoryPage>,

    // Final Page
    <StoryPage
      key="final"
      backgroundColor="bg-gradient-to-br from-pink-100 to-blue-200"
    >
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="text-4xl font-bold text-pink-600 mb-6 relative z-10">
          Our Story Continues...
        </h2>
        <p className="text-xl text-blue-700 mb-8 relative z-10">
          Every moment we share is another step in our unforgettable story.
        </p>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl mb-8"
        >
          ❤️
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-rose-500 text-white px-6 py-3 rounded-full text-lg shadow-btn hover:bg-rose-600 transition-colors duration-300"
          onClick={() => setCurrentPage(0)}
        >
          Start Over
        </motion.button>
      </div>
    </StoryPage>,
  ];

  return (
    <div className="relative w-full h-screen ">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl h-[78vh] bg-white rounded-3xl shadow-question-card overflow-hidden relative flex items-center justify-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="absolute"
          >
            <HeartIcon size={200} className="fill-pink-100 stroke-none" />
          </motion.div>
          <AnimatePresence mode="wait">{pages[currentPage]}</AnimatePresence>
        </div>
      </div>

      {currentPage > 0 && (
        <button
          onClick={prevPage}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/50 rounded-full shadow-md hover:bg-white transition-colors duration-300 z-40"
        >
          <ChevronLeft className="text-pink-600" />
        </button>
      )}

      {currentPage < pages.length - 1 && (
        <button
          onClick={nextPage}
          className="fixed right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/50 rounded-full shadow-md hover:bg-white transition-colors duration-300 z-40"
        >
          <ChevronRight className="text-pink-600" />
        </button>
      )}

      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="fixed left-1/2 top-4 transform -translate-x-1/2 p-3 bg-white/50 rounded-full shadow-md hover:bg-white transition-colors duration-300 z-40"
          >
            <X className="text-pink-500" />
          </button>

          <motion.div
            initial={{ scale: 0.2 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="bg-pink-50 p-4 rounded-3xl shadow-2xl max-w-fit w-full h-max overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {mediaItems[selectedImage].type === 'image' ? (
              <Image
                src={mediaItems[selectedImage].src}
                alt={`Media ${selectedImage + 1}`}
                width={400}
                height={300}
                className="rounded-2xl w-auto h-auto"
              />
            ) : (
              <video
                src={mediaItems[selectedImage].src}
                controls
                autoPlay
                className="rounded-2xl w-auto h-auto max-h-[80vh]"
              />
            )}
            <p className="mt-4 text-center text-gray-700">
              Moment {selectedImage + 1}
            </p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
