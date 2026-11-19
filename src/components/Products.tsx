import {useEffect, useRef} from 'react';
import {intro, products} from '../content';
import {clamp, pinProgress, range} from '../lib/math';
import {onFrame} from '../lib/scroll';
import {Art} from './Art';

/**
 * Product reel. The section pins and the reel slides sideways with the
 * scroll; the card nearest the focus line is bright, the rest dim back.
 */
const SECTION_VH = 360;

export function Products() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const cardRefs = useRef<HTMLLIElement[]>([]);
  const artRefs = useRef<HTMLDivElement[]>([]);
  const barRef = useRef<HTMLSpanElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let lastP = -1;
    return onFrame(() => {
      const root = rootRef.current;
      const track = trackRef.current;
      if (!root || !track) return;
      const {p, rect, vh} = pinProgress(root);
      if (rect.bottom < 0 || rect.top > vh) return;
      if (Math.abs(p - lastP) < 0.00005) return;
      lastP = p;

      const vw = window.innerWidth;
      const k = range(p, 0.04, 0.96);
      const travel = Math.max(0, track.offsetLeft + track.scrollWidth - vw * 0.94);
      track.style.transform = `translate3d(${-k * travel}px, 0, 0)`;

      let nearest = 0;
      let best = Infinity;
      cardRefs.current.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const off = (r.left + r.width / 2 - vw * 0.62) / vw;
        const a = clamp(Math.abs(off) * 1.6);
        card.style.opacity = String(1 - a * 0.55);
        card.style.transform = `scale(${1 - a * 0.07})`;
        artRefs.current[i].style.transform = `translate3d(${off * -40}px, 0, 0) scale(1.06)`;
        if (Math.abs(off) < best) {
          best = Math.abs(off);
          nearest = i;
        }
      });
      barRef.current!.style.transform = `scaleX(${k})`;
      countRef.current!.textContent = `0${nearest + 1}`;
    });
  }, []);

  return (
    <section ref={rootRef} id="products" aria-labelledby="products-title" className="relative bg-paper" style={{height: `${SECTION_VH}svh`}}>
      <div className="sticky top-0 flex h-screen-s flex-col justify-center overflow-hidden pt-16 md:flex-row md:items-center md:pt-0">
        <div className="relative z-10 shrink-0 px-4 sm:px-6 md:w-[32vw] md:pl-[6vw] md:pr-10">
          <p className="font-mono text-label text-saffron-deep uppercase">{intro.eyebrow}</p>
          <h2 id="products-title" className="mt-4 font-display text-display text-bark">{intro.heading}</h2>
          <p className="mt-5 max-w-[26rem] text-body text-muted max-md:hidden">{intro.body}</p>
          <div className="mt-8 flex items-center gap-4 font-mono text-label text-muted uppercase max-md:hidden" aria-hidden="true">
            <span>
              <span ref={countRef} className="text-bark">01</span> / 0{products.length}
            </span>
            <span className="relative h-px w-32 bg-bark/15">
              <span ref={barRef} className="absolute inset-0 origin-left bg-saffron" style={{transform: 'scaleX(0)'}} />
            </span>
          </div>
        </div>

        <ol ref={trackRef} className="mt-8 flex gap-5 pl-4 will-change-transform sm:pl-6 md:mt-0 md:gap-7 md:pl-0">
          {products.map((p, i) => (
            <li
              key={p.title}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="w-[70vw] shrink-0 origin-bottom sm:w-[44vw] md:w-[clamp(16rem,24vw,23rem)]"
            >
              <figure>
                <div className="relative aspect-[3/4] overflow-hidden rounded-[10px] bg-paper-2 ring-1 ring-bark/10">
                  <div
                    ref={(el) => {
                      if (el) artRefs.current[i] = el;
                    }}
                    className="size-full p-6 will-change-transform"
                  >
                    {p.image ? <img src={p.image} alt={`${p.title}: ${p.body}`} loading="lazy" decoding="async" className="size-full object-cover" /> : <Art kind={p.kind} color={p.color} />}
                  </div>
                  <span className="absolute top-3 left-3 rounded-[3px] bg-highlight px-2 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-bark uppercase">{p.tag}</span>
                </div>
                <figcaption className="mt-4 flex gap-4">
                  <span className="font-mono text-label text-saffron-deep">0{i + 1}</span>
                  <span>
                    <span className="block font-display text-[0.9375rem] tracking-[0.06em] text-bark uppercase">{p.title}</span>
                    <span className="mt-1.5 block text-[0.875rem] leading-relaxed text-muted">{p.body}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
