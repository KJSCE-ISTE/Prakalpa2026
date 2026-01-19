import React, { useEffect, useRef, useState } from 'react';

const GTAMinimapEmbed: React.FC = () => {
  const minimapRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);

  /* Rotate pointer with mouse (desktop) */
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!minimapRef.current) return;

      const rect = minimapRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      const dx = e.clientX - cx;
      const dy = e.clientY - cy;

      const deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
      setAngle(deg);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-[2000]">
      {/* Outer ring */}
      <div className="relative w-48 h-48 rounded-full p-[6px] bg-pink-500">
        
        {/* Inner circular minimap */}
        <div
          ref={minimapRef}
          className="relative w-full h-full rounded-full overflow-hidden bg-black"
        >
          {/* ✅ SAFE Google Maps embed (NO pb param) */}
          <iframe
            title="KJ Somaiya Minimap"
            src="https://www.google.com/maps?q=19.0604875,72.8651469&z=16&output=embed"
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* 🎨 Gradient tint */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background:
                'linear-gradient(180deg, #1a237e 0%, #ff2fd6 70%, #ffe066 100%)',
              mixBlendMode: 'multiply',
              opacity: 0.45,
            }}
          />

          {/* Dark vignette */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none z-10" />

          {/* 🎯 Player pointer (rotates with cursor) */}
          <div
            className="absolute top-1/2 left-1/2 z-20 pointer-events-none"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              transition: 'transform 0.08s linear',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 100 100">
              {/* Circle body */}
              <circle cx="50" cy="55" r="28" fill="white" />
              {/* Single direction vertex */}
              <polygon points="50,5 65,35 35,35" fill="white" />
            </svg>
          </div>

          {/* North indicator */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
            <span
              className="font-pricedown text-white text-sm"
              style={{ textShadow: '1px 1px 2px black' }}
            >
              N
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GTAMinimapEmbed;
