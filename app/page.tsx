'use client';

import React, { useState } from 'react';
import Intro from '../components/scenes/Intro';
import ForestScroll from '../components/scenes/ForestScroll';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const [setup, setSetup] = useState<{
    started: boolean;
    type: 'red' | 'yellow' | 'blue';
    accessory: 'leaf' | 'bud' | 'flower';
  }>({
    started: false,
    type: 'red',
    accessory: 'leaf',
  });

  const handleStart = (config: {
    type: 'red' | 'yellow' | 'blue';
    accessory: 'leaf' | 'bud' | 'flower';
    soundOn: boolean;
  }) => {
    setSetup({
      started: true,
      type: config.type,
      accessory: config.accessory,
    });
  };

  return (
    <main className="w-full min-h-screen bg-[#111827] text-stone-100 flex flex-col font-sans overflow-x-hidden">
      <AnimatePresence mode="wait">
        {!setup.started ? (
          <motion.div
            key="intro-screen"
            className="w-full min-h-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Intro onStart={handleStart} />
          </motion.div>
        ) : (
          <motion.div
            key="scroll-screen"
            className="w-full min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <ForestScroll
              userType={setup.type}
              userAccessory={setup.accessory}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
