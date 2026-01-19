import React, { useState, useEffect } from 'react';

/**
 * GTA-style stats component that appears on the right side
 */
const GTAStats: React.FC = () => {
  const [countdown, setCountdown] = useState(3600); // 1 hour countdown in seconds
  const [starCount, setStarCount] = useState(1);
  const [money, setMoney] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const newStarCount = Math.min(5, Math.floor(window.scrollY / 100) + 1); // Increase stars as we scroll
      setStarCount(newStarCount);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let counter = 0;
    const interval = setInterval(() => {
      if (counter < 100000) { // Replace 1000 with the desired amount
        counter += 1000; // Increment money by 100
        setMoney(counter);
      } else {
        clearInterval(interval);
      }
    }, 10); // Adjust speed of counter

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="fixed top-8 right-8 z-[2000] flex flex-col gap-2">
      {/* Time Display */}
      <div className="flex items-center gap-3 mb-2">
        {/* Icon placeholder - you can replace with actual icon */}
        <div className="w-32 h-32 border-8 border-black rounded-lg flex items-center justify-center overflow-hidden">
          {/* Replace this with <img src={yourIcon} alt="icon" className="w-full h-full object-cover" /> */}
          <div 
            className="text-3xl text-center"
            style={{
              fontFamily: 'pricedown',
              color: '#fff',
              textShadow: '3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000'
            }}
          >
            10 days to go
          </div>
        </div>
        
        {/* Time */}
        <div 
          className="text-4xl tracking-wider"
          style={{
            fontFamily: 'pricedown',
            color: '#fff',
            textShadow: '3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000'
          }}
        >
          {formatTime(countdown)}
        </div>
      </div>

      {/* Wanted Level Stars */}
      <div className="flex justify-center items-center gap-1 mb-2 ml-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="relative"
            style={{
              width: '24px',
              height: '24px',
            }}
          >
            {/* Star shape using CSS */}
            <div
              className={`absolute inset-0 ${i < starCount ? 'opacity-100' : 'opacity-30'}`}
              style={{
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                backgroundColor: i < starCount ? '#fbbf24' : '#666',
                border: '2px solid #000',
              }}
            />
          </div>
        ))}
      </div>

      {/* Health Bar */}
      <div className="flex items-center gap-2 mb-1">
        <div className="w-48 h-5 bg-black border-2 border-black relative overflow-hidden">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: '75%',
              background: 'linear-gradient(180deg, #ff6b6b 0%, #cc0000 100%)',
            }}
          />
        </div>
      </div>

      {/* Money Display */}
      <div 
        className="text-4xl tracking-wider mt-1"
        style={{
          fontFamily: 'pricedown',
          color: '#4ade80',
          textShadow: '3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000'
        }}
      >
        ₹{money.toLocaleString('en-IN')}
      </div>
    </div>
  );
};

export default GTAStats;