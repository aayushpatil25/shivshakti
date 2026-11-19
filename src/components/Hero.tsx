import {useEffect, useRef} from 'react';
import {brand, hero} from '../content';
import {easeInOut, lerp, pinProgress, range} from '../lib/math';
import {onFrame, scrollToHash} from '../lib/scroll';
import {SHIRT_PATH} from './Art';

/**
 * Scroll-to-print. A blank shirt is pinned on stage; scrolling prints the
 * design onto it top to bottom, then the shirt changes colour.
 *
 *   0.00 – 0.10  the "scroll to start" veil lifts
 *   0.10 – 0.65  print head sweeps down, revealing the design
 *   0.65 – 1.00  shirt cycles White → Midnight → Violet (ink adapts)
 */

const STAGE_VH = 420;
const AREA = {x: 90, y: 70, w: 220, h: 215};
const SHIRTS = [
  {name: 'White', fill: '#FFFFFF', ink: '#21113F', at: 0},
  {name: 'Midnight', fill: '#17120f', ink: '#FAF8FF', at: 0.72},
  {name: 'Violet', fill: '#7545D6', ink: '#FAF8FF', at: 0.86},
];

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const clipRef = useRef<SVGRectElement>(null);
  const scanRef = useRef<SVGRectElement>(null);
  const shirtRef = useRef<SVGPathElement>(null);
  const designRef = useRef<SVGGElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<HTMLSpanElement>(null);
  const colorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let lastP = -1;
    let lastShirt = -1;
    return onFrame(() => {
      const root = rootRef.current;
      if (!root) return;
      const {p, rect} = pinProgress(root);
      if (rect.bottom < 0) return;
      if (Math.abs(p - lastP) < 0.00005) return;
      lastP = p;

      veilRef.current!.style.opacity = String(1 - range(p, 0, 0.1));
      const print = easeInOut(range(p, 0.1, 0.65));
      clipRef.current!.setAttribute('height', String(print * AREA.h));
      const scan = scanRef.current!;
      scan.setAttribute('y', String(AREA.y + print * AREA.h - 1.5));
      scan.style.opacity = print > 0.001 && print < 0.999 ? '1' : '0';

      let idx = 0;
      SHIRTS.forEach((s, i) => {
        if (p >= s.at) idx = i;
      });
      if (idx !== lastShirt) {
        lastShirt = idx;
        shirtRef.current!.style.fill = SHIRTS[idx].fill;
        designRef.current!.style.setProperty('--ink', SHIRTS[idx].ink);
        colorRef.current!.textContent = SHIRTS[idx].name;
      }

      stageRef.current!.style.transform = `scale(${lerp(0.9, 1.04, p)}) rotate(${lerp(-3, 2, p)}deg)`;
      inkRef.current!.textContent = `${String(Math.round(print * 100)).padStart(2, '0')}%`;
    });
  }, []);

  return (
    <section id="top" ref={rootRef} aria-label="Hero" className="relative" style={{height: `${STAGE_VH}svh`}}>
      <div
        className="sticky top-0 h-screen-s overflow-hidden"
        style={{background: 'radial-gradient(60% 60% at 70% 50%, #ECE3FF 0%, #FAF8FF 70%)'}}
      >
        <div className="mx-auto flex h-full max-w-[90rem] flex-col items-center justify-center gap-4 px-4 pt-16 sm:px-6 md:flex-row md:gap-8 md:px-[6vw] md:pt-0">
          <div className="order-2 w-full text-center md:order-1 md:w-1/2 md:text-left">
            <p className="font-mono text-label text-saffron-deep uppercase">{hero.eyebrow}</p>
            <h1 className="mt-3 font-hero text-hero font-bold tracking-[-0.02em] text-bark italic">{hero.title}</h1>
            <p className="mx-auto mt-4 max-w-[30rem] text-body text-muted max-md:hidden md:mx-0">{hero.body}</p>
            <div className="mt-6 flex justify-center gap-3 max-md:hidden md:justify-start">
              <a
                href="#order"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash('#order');
                }}
                className="rounded-full bg-saffron px-6 py-3.5 font-mono text-label text-bark uppercase transition-colors hover:bg-bark hover:text-paper"
              >
                Start an order
              </a>
              <a
                href="#products"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToHash('#products');
                }}
                className="rounded-full px-6 py-3.5 font-mono text-label uppercase ring-1 ring-bark/30 transition-colors hover:bg-bark hover:text-paper"
              >
                See products
              </a>
            </div>
          </div>

          <div className="order-1 flex min-h-0 w-full flex-1 items-center justify-center md:order-2 md:w-1/2">
            <div ref={stageRef} className="h-full max-h-[62svh] w-full max-w-[34rem] will-change-transform md:max-h-[78svh]">
              <svg viewBox="0 0 400 440" className="size-full drop-shadow-[0_18px_24px_rgba(33,17,63,0.22)]" role="img" aria-label="A T-shirt being printed with the Shivshakti design as you scroll.">
                <defs>
                  <clipPath id="reveal">
                    <rect ref={clipRef} x={AREA.x} y={AREA.y} width={AREA.w} height="0" />
                  </clipPath>
                </defs>
                <path ref={shirtRef} d={SHIRT_PATH} style={{fill: SHIRTS[0].fill, transition: 'fill 0.5s'}} stroke="rgba(0,0,0,0.3)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M130 30 Q200 80 270 30" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="5" />
                <g ref={designRef} clipPath="url(#reveal)" style={{['--ink' as string]: SHIRTS[0].ink}}>
                  {brand.logo ? (
                    <image href={brand.logo} x="120" y="105" width="160" height="140" preserveAspectRatio="xMidYMid meet" />
                  ) : (
                    <>
                      <circle cx="200" cy="175" r="74" fill="none" stroke="#FF6B61" strokeWidth="6" />
                      {Array.from({length: 20}, (_, i) => (
                        <line key={i} x1="200" y1="79" x2="200" y2={i % 2 ? 90 : 84} stroke="#FF6B61" strokeWidth="4" strokeLinecap="round" transform={`rotate(${i * 18} 200 175)`} />
                      ))}
                      <g style={{fill: 'var(--ink)', transition: 'fill 0.5s'}} fontFamily="Archivo Black, Arial Black, sans-serif" textAnchor="middle">
                        <text x="200" y="168" fontSize="26">SHIV</text>
                        <text x="200" y="198" fontSize="26">SHAKTI</text>
                        <text x="200" y="222" fontSize="8" letterSpacing="4" fontFamily="DM Mono, monospace">PRINT STUDIO</text>
                      </g>
                    </>
                  )}
                </g>
                <rect ref={scanRef} x="78" y={AREA.y} width="244" height="3" rx="1.5" fill="#FF6B61" style={{opacity: 0, filter: 'drop-shadow(0 0 6px #FF6B61)'}} />
              </svg>
            </div>
          </div>
        </div>

        {/* Live readout */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-4 bottom-4 flex justify-between font-mono text-[0.625rem] tracking-[0.14em] text-muted uppercase sm:inset-x-6 md:inset-x-[3vw] md:bottom-6 md:text-label">
          <span>Ink <span ref={inkRef} className="text-saffron-deep">00%</span></span>
          <span>Shirt <span ref={colorRef} className="text-bark">White</span></span>
        </div>

        {/* Veil */}
        <div ref={veilRef} aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center bg-paper text-center">
          <div>
            <p className="font-mono text-label text-muted uppercase">{brand.name} · {brand.tagline}</p>
            <p className="mt-3 font-display text-[0.9rem] tracking-[0.3em] text-bark uppercase">{hero.veil}</p>
            <span className="mt-6 inline-block animate-bounce text-saffron-deep motion-reduce:animate-none">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
