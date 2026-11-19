import {useEffect, useRef, useState} from 'react';
import {process} from '../content';
import {clamp, easeOutCubic, pinProgress, range} from '../lib/math';
import {onFrame} from '../lib/scroll';

/**
 * The order journey, drawn as you scroll. The path inks itself through five
 * stations; a dot rides the line and the delivered-orders counter ticks up.
 */
const SECTION_VH = 380;
const WINDOW = [0.06, 0.92] as const;

const PTS: [number, number][] = [[90, 420], [330, 180], [600, 400], [870, 170], [1110, 380]];
const PATH = 'M90 420 C 200 420, 220 180, 330 180 S 500 400, 600 400 S 760 170, 870 170 S 1010 380, 1110 380';

export function Process() {
  const rootRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const [step, setStep] = useState(0);

  useEffect(() => {
    let lastP = -1;
    let current = 0;
    return onFrame(() => {
      const root = rootRef.current;
      const path = pathRef.current;
      if (!root || !path) return;
      const {p, rect, vh} = pinProgress(root);
      if (rect.bottom < 0 || rect.top > vh) return;
      if (Math.abs(p - lastP) < 0.00005) return;
      lastP = p;

      const k = easeOutCubic(range(p, ...WINDOW));
      path.style.strokeDashoffset = String(1 - k);
      const pt = path.getPointAtLength(path.getTotalLength() * k);
      dotRef.current!.setAttribute('transform', `translate(${pt.x} ${pt.y})`);

      const s = clamp(Math.floor(range(p, ...WINDOW) * (PTS.length - 1) + 0.02), 0, PTS.length - 1);
      if (s !== current) {
        current = s;
        setStep(s);
      }
      countRef.current!.textContent = Math.round(k * process.delivered).toLocaleString('en-IN');
    });
  }, []);

  const cur = process.steps[step];

  return (
    <section ref={rootRef} id="process" aria-labelledby="process-title" className="relative bg-paper" style={{height: `${SECTION_VH}svh`}}>
      <div className="sticky top-0 flex h-screen-s flex-col overflow-hidden px-4 pt-20 pb-8 sm:px-6 md:px-[6vw] md:pt-24">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-label text-saffron-deep uppercase">{process.eyebrow}</p>
            <h2 id="process-title" className="mt-3 max-w-[20ch] font-display text-display text-bark">{process.heading}</h2>
          </div>
          <p className="font-mono text-label text-muted uppercase" aria-live="off">
            {process.counterLabel} <span ref={countRef} className="text-bark tabular-nums">0</span>
          </p>
        </div>

        <div className="relative flex min-h-0 flex-1 items-center">
          <svg viewBox="0 0 1200 560" className="h-auto max-h-full w-full" role="img" aria-label="The order journey in five steps, from sharing your design to delivery.">
            <path d={PATH} fill="none" stroke="#21113F" strokeOpacity="0.18" strokeWidth="2" strokeDasharray="3 7" />
            <path ref={pathRef} d={PATH} pathLength={1} fill="none" stroke="#FF6B61" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 1" strokeDashoffset="1" />
            {PTS.map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="20" fill="#FAF8FF" stroke={i <= step ? '#FF6B61' : '#21113F'} strokeOpacity={i <= step ? 1 : 0.3} strokeWidth="2" style={{transition: 'stroke 0.4s'}} />
                <text x={x} y={y + 5} textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="15" fill={i <= step ? '#7545D6' : '#6B5F85'}>
                  {i + 1}
                </text>
                <text x={x} y={y + (i % 2 === 0 ? 52 : -34)} textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="13" letterSpacing="1.5" fill={i <= step ? '#21113F' : '#6B5F85'}>
                  {process.steps[i].title.toUpperCase()}
                </text>
              </g>
            ))}
            <g ref={dotRef} transform="translate(90 420)">
              <circle r="13" fill="#FF6B61" opacity="0.25" />
              <circle r="5" fill="#21113F" />
            </g>
          </svg>
        </div>

        <div className="grid gap-4 border-t border-bark/10 pt-5 md:grid-cols-[auto_1fr_auto] md:items-end md:gap-10">
          <p className="font-mono text-label text-saffron-deep uppercase">Step {step + 1}/{process.steps.length}</p>
          <div key={step} className="animate-[step-in_0.6s_cubic-bezier(0.2,0.7,0.1,1)]" aria-live="polite">
            <h3 className="font-display text-[1.125rem] tracking-[0.06em] text-bark uppercase md:text-[1.375rem]">{cur.title}</h3>
            <p className="mt-1.5 max-w-[40rem] text-body text-muted">{cur.body}</p>
          </div>
          <div className="flex gap-1.5" aria-hidden="true">
            {process.steps.map((_, i) => (
              <span key={i} className={`h-1 w-8 rounded-full transition-colors duration-500 ${i <= step ? 'bg-saffron' : 'bg-bark/15'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
