import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import start from './assets/prizes.png';

const PRIZE_DATA = {
  WORKING_MODEL: {
    id: 'Working-Model',
    title: 'WORKING MODEL',
    prizes: [
      { rank: '1st', amount: 'Rs.10,000/-' },
      { rank: '2nd', amount: 'Rs.5,000/-' }
    ],
    bgImage: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a1930?auto=format&fit=crop&q=80',
    desc: "The premier category for hardware enthusiasts. Showcase physical prototypes that solve real-world engineering challenges through mechanics and electronics."
  },
  SOFTWARE: {
    id: 'Software-Competition',
    title: 'SOFTWARE COMPETITION',
    prizes: [
      { rank: '1st', amount: 'Rs.8,000/-' },
      { rank: '2nd', amount: 'Rs.4,000/-' }
    ],
    bgImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
    desc: "A battle of algorithms and architecture. This category focuses on clean code, UI/UX, and the deployment of scalable digital solutions."
  },
  PAPER: {
    id: 'Paper-Presentation',
    title: 'PAPER PRESENTATION',
    prizes: [
      { rank: '1st', amount: 'Rs.7,000/-' },
      { rank: '2nd', amount: 'Rs.3,500/-' }
    ],
    bgImage: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80',
    desc: "The intellectual core of the event. Present your research findings, theoretical breakthroughs, and academic papers to a panel of experts."
  },
};

const wipeVariants: Variants = {
  initial: { x: '100%', skewX: '-20deg' },
  animate: {
    x: '-150%',
    skewX: '-20deg',
    transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] }
  },
  exit: { x: '-150%', skewX: '-20deg' }
};

const Prizes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof typeof PRIZE_DATA | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNavigation = (key: keyof typeof PRIZE_DATA | null) => {
    if (key === activeTab || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => { setActiveTab(key); }, 350);
    setTimeout(() => { setIsAnimating(false); }, 800);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0a] text-white uppercase font-black tracking-tighter select-none">

      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab || 'landing'}
            initial={{ scale: 1.1, filter: 'grayscale(0%) opacity(0)' }}
            animate={{ scale: 1, filter: 'grayscale(0%) opacity(1)' }}
            exit={{ scale: 1.2, filter: 'opacity(0)' }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.85) 100%), url(${start})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>
      </div>

      {/* TRANSITION OVERLAY */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            key="screen-wipe"
            variants={wipeVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 z-[100] bg-white w-[200vw] h-[100vh] pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* UI LAYER */}
      <div className="relative z-50 grid grid-cols-12 h-full">
        {/* Left Panel - Dynamic Scaling Container */}
        <div className="col-span-3 flex flex-col justify-center pl-12 font-pricedown">
          <motion.div
            animate={{
              scale: activeTab ? 1 : 1.5,
              x: activeTab ? 0 : 100, // Moves it slightly more to the center when activeTab is null
              transformOrigin: "left center"
            }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            className="space-y-4"
          >
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="mb-10">
              <p className="text-purple-600 text-xxxs tracking-[0.2em] font-bold">PRAKALPA'26</p>
              <h1 className="text-6xl leading-[0.85] mt-1 italic transform -skew-x-6">PROJECT CATEGORY<br />PRIZES</h1>
            </motion.div>

            <nav className="flex flex-col space-y-3">
              {(Object.keys(PRIZE_DATA) as Array<keyof typeof PRIZE_DATA>).map((key) => (
                <button
                  key={key}
                  onClick={() => handleNavigation(key)}
                  className={`text-left text-3xl italic transition-all duration-300 transform hover:translate-x-3 ${activeTab === key ? 'text-white' : 'text-zinc-600 hover:text-zinc-300'}`}
                >
                  {PRIZE_DATA[key].id.replace('-', ' ')}
                </button>
              ))}
            </nav>
          </motion.div>
        </div>

        {/* Center Panel */}
        <div className="col-span-6 flex flex-col justify-center items-center font-pricedown">
          <AnimatePresence mode="wait">
            {activeTab && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <h2 className="text-[7rem] italic leading-[0.75] mb-12 -skew-x-12 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  {PRIZE_DATA[activeTab].title}
                </h2>

                <div className="space-y-6">
                  {PRIZE_DATA[activeTab].prizes.map((p, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + (idx * 0.1) }}
                      className="flex items-center space-x-5 group"
                    >
                      <div className="bg-amber-400 text-black px-10 py-2 text-5xl -skew-x-12 font-black italic group-hover:bg-white transition-colors">
                        {p.rank}
                      </div>
                      <div className="text-7xl font-black tracking-closest group-hover:text-amber-400 transition-colors">
                        {p.amount}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <button
                  onClick={() => handleNavigation(null)}
                  className="mt-20 group flex items-center gap-3 text-zinc-500 hover:text-white transition-all transform hover:-translate-x-1"
                >
                  <span className="text-4xl font-black italic tracking-tighter">BACK</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel */}
        <div className="col-span-3 flex flex-col justify-center pr-12">
          <AnimatePresence mode="wait">
            {activeTab && (
              <motion.div
                key={`desc-${activeTab}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{
                  duration: 0.5,
                  delay: 0.2,
                  ease: "easeOut"
                }}
                className="bg-black/60 backdrop-blur-md p-8 border-l-[6px] border-purple-400 transform -skew-x-2 shadow-2xl"
              >
                <p className="text-purple-400 text-xs mb-3 tracking-[0.2em] font-bold">MISSION BRIEF</p>
                <p className="text-base font-medium tracking-normal normal-case leading-relaxed text-zinc-100 italic">
                  "{PRIZE_DATA[activeTab].desc}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Prizes;