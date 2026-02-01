import React, { useEffect } from 'react';

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
        top-[24.5%] sm:top-[26.5%]
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
          -top-4 sm:-top-8
          left-1/2
          -translate-x-1/2
          text-[9rem] sm:text-[16rem] md:text-[20rem] lg:text-[28rem]
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
          translate-y-[64px] sm:translate-y-[78px] md:translate-y-[92px] lg:translate-y-[108px]
          m-0
          text-4xl sm:text-7xl md:text-[8.5rem] lg:text-[10rem]
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
          absolute
          text-base sm:text-xl md:text-2xl
          font-pricedown
          right-0
          + translate-x-[130%] sm:translate-x-[190%] md:translate-x-[210%]
          translate-y-[140px] sm:translate-y-[185px] md:translate-y-[220px]
          whitespace-nowrap
          z-[1002]
        "
      >
        National
        <br />
        Level
        <br />
        Competition
      </h2>

      {/* ISTE KJSCE presents */}
      <h2
        className="
          text-center
        + text-lg sm:text-2xl md:text-3xl
          font-pricedown
      + mt-4 sm:mt-6
        "
      >
        ISTE KJSSE presents
      </h2>
    </div>
  );
};

export default Title;
