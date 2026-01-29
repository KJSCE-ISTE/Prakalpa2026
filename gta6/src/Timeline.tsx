import React, { useState, useEffect, useRef } from 'react';
import NewT from './assets/gallery_images/NewT.png';

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  description: string;
}

const Timeline: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const items: TimelineItem[] = [
    {
      id: 1,
      title: 'HEIST PLANNING',
      date: 'WEEK 1',
      description: 'Assembled the crew and scoped out the target. Intel gathered on security systems and escape routes.',
    },
    {
      id: 2,
      title: 'CREW ASSEMBLY',
      date: 'WEEK 2',
      description: 'Recruited specialists: demolitions expert, hacker, and getaway driver. Equipment procurement in progress.',
    },
    {
      id: 3,
      title: 'RECONNAISSANCE',
      date: 'WEEK 3',
      description: 'Detailed surveillance complete. Security patterns documented. Blueprints acquired from inside source.',
    },
    {
      id: 4,
      title: 'THE SETUP',
      date: 'WEEK 4',
      description: 'Vehicles prepared. Weapons cache secured. Final walkthrough completed. All systems go.',
    },
    {
      id: 5,
      title: 'EXECUTION',
      date: 'WEEK 5',
      description: 'Mission accomplished. Target secured. Clean getaway achieved. Payout distributed to crew.',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = parseInt(entry.target.getAttribute('data-id') || '0');
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(id));
          } else {
            setVisibleItems((prev) => {
              const newSet = new Set(prev);
              newSet.delete(id);
              return newSet;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-50px',
      }
    );

    Object.values(itemRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@400;700&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
          

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-8px);
            }
          }

          @keyframes ripple {
            0% {
              transform: scale(1);
              opacity: 0.3;
            }
            100% {
              transform: scale(2.5);
              opacity: 0;
            }
          }

          .gta-title {
            font-family: 'Inter', sans-serif;
            letter-spacing: 3px;
          }

          .gta-text {
            font-family: 'Inter', sans-serif;
          }

          .scanline {
            position: relative;
            overflow: hidden;
          }

          .scanline::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(255, 0, 255, 0.5), transparent);
            animation: scan 3s linear infinite;
          }

          @keyframes scan {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(500px);
            }
          }
        `}
      </style>
      <div
  className="min-h-screen py-16 px-4 relative overflow-hidden"
  style={{
    backgroundImage: `url(${NewT})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
  }}
>
        {/* Vice City Grid Background */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'linear-gradient(rgba(255, 0, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 0, 255, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>

        <div className="max-w-5xl mx-auto relative z-10">
  <div className="flex justify-center mb-2">
    <img 
      src="https://fontmeme.com/permalink/260119/3eab940d.png" 
      alt="MISSION TIMELINE" 
      className="h-20 object-contain"
    />
  </div>
  <p className="text-center text-yellow-400/100 mb-16 text-lg gta-text tracking-widest">★ HEIST OPERATION LOG ★</p>
          <div className="relative scanline">
            {/* Neon Center Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full" style={{
              background: 'linear-gradient(to bottom, #ff2fff, #00ffff, #ff1493)',
boxShadow: `
  0 0 10px #ff00ff,
  0 0 25px #ff00ff,
  0 0 45px rgba(255, 0, 255, 0.9)
`
            }}></div>

            {items.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => (itemRefs.current[item.id] = el)}
                data-id={item.id}
                className={`relative flex items-center mb-20 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                <div className="w-1/2 flex justify-center">
                  <div
                    className={`w-11/12 ${index % 2 === 0 ? 'pr-12' : 'pl-12'} transition-all duration-700 ${
                      visibleItems.has(item.id)
                        ? 'opacity-100 translate-x-0 rotate-0'
                        : index % 2 === 0
                        ? 'opacity-0 -translate-x-20 -rotate-12'
                        : 'opacity-0 translate-x-20 rotate-12'
                    }`}
                  >
                    <div className="bg-black/80 backdrop-blur-sm rounded-lg shadow-2xl p-6 border-2 border-purple-500 hover:shadow-purple-500/50 hover:border-cyan-400 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden">
                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
                      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
                      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
                      
                      <div className="text-xs font-bold text-cyan-400 mb-2 gta-text tracking-widest bg-purple-900/50 px-3 py-1 inline-block rounded">
                        {item.date}
                      </div>
                      <h3 className="text-2xl font-bold text-pink-500 mb-3 gta-title tracking-wider">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed gta-text">{item.description}</p>
                      
                      {/* Wanted stars indicator */}
                      <div className="flex gap-1 mt-3">
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className={`w-3 h-3 ${i < item.id ? 'bg-yellow-400' : 'bg-gray-700'}`} style={{
                            clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)'
                          }}></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
                  <div
                    className={`w-6 h-6 bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 rounded-full border-4 border-black shadow-lg transition-all duration-500 ${
                      visibleItems.has(item.id) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                    }`}
                    style={{
                      animation: visibleItems.has(item.id) ? `float 3s ease-in-out ${index * 0.5}s infinite` : 'none',
                      boxShadow: '0 0 15px #ff00ff, 0 0 30px #ff00ff'
                    }}
                  ></div>
                  <div
                    className={`absolute w-12 h-12 bg-purple-500 rounded-full transition-opacity duration-500 ${
                      visibleItems.has(item.id) ? 'opacity-30' : 'opacity-0'
                    }`}
                    style={{
                      animation: visibleItems.has(item.id) ? `ripple 2s ease-out ${index * 0.3}s infinite` : 'none',
                    }}
                  ></div>
                </div>

                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-purple-900/50 to-transparent pointer-events-none"></div>
      </div>
    </>
  );
};

export default Timeline;