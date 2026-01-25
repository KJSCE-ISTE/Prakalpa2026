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
        top-[34   %] sm:top-[36%]
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
          -top-6 sm:-top-10
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
          m-0
          text-4xl sm:text-7xl md:text-8xl lg:text-9xl
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
          translate-x-[120%] sm:translate-x-[180%] md:translate-x-[200%]
          translate-y-[70px] sm:translate-y-[100px] md:translate-y-[120px]
          whitespace-nowrap
        "
      >
        National
        <br />Level
        <br />Competition
      </h2>

      {/* ISTE KJSCE presents */}
      <h2
        className="
          text-center
          text-base sm:text-xl md:text-2xl
          font-pricedown
          -mt-1 sm:-mt-2
        "
      >
        ISTE KJSCE presents
      </h2>
    </div>
  );
};

export default Title;
