import  {brand, type Kind} from '../content';

/** Hand-drawn product illustrations. All share a 400×440 viewBox. */
export const SHIRT_PATH = 'M130 30 L60 70 L10 150 L60 180 L90 150 L90 410 L310 410 L310 150 L340 180 L390 150 L340 70 L270 30 Q200 80 130 30 Z';

const EDGE = 'rgba(0,0,0,0.28)';

function Mark({x, y, s = 1}: {x: number; y: number; s?: number}) {
  if (brand.logo) {
    return <image href={brand.logo} x={x - 45 * s} y={y - 45 * s} width={90 * s} height={90 * s} preserveAspectRatio="xMidYMid meet" />;
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r="24" fill="none" stroke="#ff8a1f" strokeWidth="5" />
      {Array.from({length: 12}, (_, i) => (
        <line key={i} x1="0" y1="-31" x2="0" y2="-40" stroke="#ff8a1f" strokeWidth="4" strokeLinecap="round" transform={`rotate(${i * 30})`} />
      ))}
      <circle r="8" fill="#ff8a1f" />
    </g>
  );
}

export function Art({kind, color}: {kind: Kind; color: string}) {
  return (
    <svg viewBox="0 0 400 440" className="size-full" aria-hidden="true">
      {kind === 'tshirt' && (
        <>
          <path d={SHIRT_PATH} fill={color} stroke={EDGE} strokeWidth="2" strokeLinejoin="round" />
          <path d="M130 30 Q200 80 270 30" fill="none" stroke={EDGE} strokeWidth="5" />
          <Mark x={200} y={195} />
        </>
      )}
      {kind === 'hoodie' && (
        <>
          <path d="M125 80 Q200 50 275 80 L340 125 L372 275 L322 285 L306 200 L306 395 L94 395 L94 200 L78 285 L28 275 L60 125 Z" fill={color} stroke={EDGE} strokeWidth="2" strokeLinejoin="round" />
          <path d="M150 75 Q200 140 250 75 Q252 22 200 20 Q148 22 150 75 Z" fill={color} stroke={EDGE} strokeWidth="2" />
          <path d="M185 120 V170 M215 120 V170" stroke="#f6efe3" strokeWidth="4" strokeLinecap="round" />
          <rect x="145" y="300" width="110" height="60" rx="10" fill="none" stroke={EDGE} strokeWidth="2" />
          <Mark x={200} y={235} s={0.8} />
        </>
      )}
      {kind === 'mug' && (
        <>
          <path d="M262 160 h38 a42 42 0 0 1 0 100 h-38" fill="none" stroke={color} strokeWidth="20" />
          <rect x="105" y="110" width="160" height="200" rx="16" fill={color} stroke={EDGE} strokeWidth="2" />
          <ellipse cx="185" cy="112" rx="80" ry="10" fill="rgba(0,0,0,0.18)" />
          <Mark x={185} y={215} />
        </>
      )}
      {kind === 'cup' && (
        <>
          <path d="M120 100 H280 L258 360 Q200 376 142 360 Z" fill={color} stroke={EDGE} strokeWidth="2" strokeLinejoin="round" />
          <rect x="108" y="76" width="184" height="26" rx="12" fill="#f6efe3" stroke={EDGE} strokeWidth="2" />
          <path d="M215 76 L240 20" stroke="#f6efe3" strokeWidth="8" strokeLinecap="round" />
          <Mark x={200} y={225} />
        </>
      )}
      {kind === 'cap' && (
        <>
          <path d="M80 270 Q78 130 200 120 Q322 130 320 270 Z" fill={color} stroke={EDGE} strokeWidth="2" />
          <path d="M70 270 H330 Q392 276 394 302 Q300 322 70 292 Z" fill={color} stroke={EDGE} strokeWidth="2" />
          <path d="M70 270 H330 Q392 276 394 302 Q300 322 70 292 Z" fill="rgba(0,0,0,0.18)" />
          <circle cx="200" cy="120" r="9" fill={color} stroke={EDGE} strokeWidth="2" />
          <Mark x={200} y={200} s={0.8} />
        </>
      )}
    </svg>
  );
}
