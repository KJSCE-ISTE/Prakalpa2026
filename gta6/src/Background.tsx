import React from 'react';
import New_bg from './assets/New_bg.jpeg';

function Background() {
  return (
    <>
      <div
        className="
          fixed
          inset-0
          bg-cover
          bg-center
          -z-10
        "
        style={{ backgroundImage: `url(${New_bg})` }}
      />
    </>
  );
}

export default Background;
