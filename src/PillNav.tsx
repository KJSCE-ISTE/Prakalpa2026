import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import somaiyaLogo from "./assets/Logo_somaiya.png";

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logo: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  baseColor = '#fff',
  pillColor = '#060010',
  hoveredPillTextColor = '#060010',
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | HTMLElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    window.addEventListener('resize', layout);
    return () => window.removeEventListener('resize', layout);
  }, [items, ease, initialLoadAnimation]);

  const handleLogoEnter = () => {
    if (!logoImgRef.current) return;
    logoTweenRef.current?.kill();
    logoTweenRef.current = gsap.to(logoImgRef.current, {
      rotate: "+=360",
      duration: 0.3,
      ease,
      overwrite: "auto",
      transformOrigin: "center center", // Ensure spin happens around the center
      clearProps: "transform" // Reset transform properties after animation
    });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(v => !v);
    onMobileMenuClick?.();
  };

  const isExternalLink = (href: string) =>
    href.startsWith('http') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = (href?: string) => href && !isExternalLink(href);

  const handleAnchorClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const anchor = e.currentTarget as HTMLAnchorElement;
    const href = anchor.getAttribute('href') || '';
    if (!href.startsWith('#')) return;
    e.preventDefault();
    e.stopPropagation();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      // Compute absolute Y position and nudge slightly lower to avoid leftover gap
      const NAV_OFFSET = 24; // height of fixed nav
      const EXTRA_NUDGE = 35; // scroll a bit further down
      const y = el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET + EXTRA_NUDGE;
      try {
        window.scrollTo({ top: y, behavior: 'smooth' });
      } catch {
        // Fallback
        window.scrollTo(0, y);
      }

      // Update hash without losing current base path
      const path = window.location.pathname.replace(/#.*$/, '');
      window.history.replaceState(null, '', `${path}#${id}`);
    }
  };

  return (
    <div className="absolute top-[1em] z-[1000] w-full left-0 md:w-auto md:left-auto">
      <nav
        className={`w-full md:w-max flex items-center justify-between md:justify-start box-border px-4 md:px-0 ${className}`}
        aria-label="Primary"
        style={{ background: 'transparent' }}
      >
        <Link
          to={items[0].href}
          onMouseEnter={handleLogoEnter}
          ref={logoRef as any}
          className="rounded-full p-2 inline-flex items-center justify-center overflow-hidden"
          style={{ width: '72px', height: '72px' }}
        >
          <img src={logo} alt={logoAlt} ref={logoImgRef} className="w-full h-full object-cover" />
        </Link>

        <div ref={navItemsRef} className="hidden md:flex ml-2">
          <ul className="flex items-center gap-4 m-0 p-0 h-full list-none">
            {items.map((item, i) => {
              const isActive = activeHref === item.href;
              const cls = `nav-link px-4 py-2 text-xl font-semibold uppercase tracking-wide hover:text-pink-500 transition-colors duration-200 font-pricedown ${isActive && i !== 0 ? 'text-pink-500' : 'text-black'
                }`;

              return (
                <li key={item.href} className="flex h-full">
                  {isRouterLink(item.href) ? (
                    <Link to={item.href} className={cls}>
                      {item.label}
                    </Link>
                  ) : (
                    <a href={item.href} className={cls} onClick={handleAnchorClick}>
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hidden md:block ml-auto">
          <img
            src={somaiyaLogo}
            alt="Somaiya Logo"
            className="h-12 w-auto object-contain"
          />
        </div>

        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          className="md:hidden"
        >
          ☰
        </button>
      </nav>
    </div>
  );
};

export default PillNav;

/* Hover parallelogram */
const style = document.createElement('style');
style.innerHTML = `
.nav-link {
  position: relative;
  z-index: 1;
}
.nav-link::before {
  content: '';
  position: absolute;
  left: -5%;
  top: 50%;
  transform: translateY(-50%) skew(20deg) scaleX(0.85);
  width: 120%;
  height: 85%;
  background: #02753E;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.2s;
  border-radius: 0.6em;
}
.nav-link:hover::before {
  opacity: 1;
}
`;
if (typeof window !== 'undefined' && !document.getElementById('nav-link-parallelogram-style')) {
  style.id = 'nav-link-parallelogram-style';
  document.head.appendChild(style);
}
