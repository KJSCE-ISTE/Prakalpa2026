import React, { useEffect } from 'react';

/**
 * Title component for displaying the main title (Prakalpa) and background (XXVI).
 * Handles only the text/visuals, not background images or layout.
 */
const Title: React.FC = () => {
  useEffect(() => {
    console.log('Title mounted');
  }, []);

  return (
    <div
      id="title-portal"
      className="
        absolute
        left-1/2
        top-[32%]
        -translate-x-1/2
        -translate-y-1/2
        z-[1000]
        pointer-events-none
      "
    >
      {/* XXVI background text */}
      <div
        id="xxvi-bg"
        className="
          absolute
          -top-10             /* 👈 XXVI moved up */
          left-1/2
          -translate-x-1/2
          text-[28rem]
          font-pricedown
          uppercase
          tracking-wide
          whitespace-nowrap
          select-none
          leading-none
          font-extrabold
          pointer-events-none
          z-[1000]
        "
      >
        <span className="xxvi-hoverable pointer-events-auto">
          26
        </span>
      </div>

      {/* Prakalpa foreground title */}
      <h1
        className="
          absolute
          top-0
          left-1/2
          -translate-x-1/2
          m-0
          text-9xl
          font-pricedown
          uppercase
          z-[1001]
          drop-shadow-[0_4px_0_black]
          whitespace-nowrap
          pointer-events-auto
        "
      >
        <span className="prakalpa-hover">
          Prakalpa
        </span>
      </h1>

      {/* Subheading */}
      <h2
        className="
          text-2xl
          font-pricedown
          -mt-2
          absolute
          right-0
          transform
          translate-x-[200%]
          translate-y-[120px]
        "
      >
        National 
        <br/>Level <br/>
        Competition
      </h2>

      {/* ISTE KJSCE presents */}
      <h2 className="text-center text-2xl font-pricedown -mt-2">
        ISTE KJSCE presents
      </h2>
    </div>
  );
};

export default Title;
