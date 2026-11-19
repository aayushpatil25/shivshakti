import {useState, type MouseEvent} from 'react';
import {brand, nav} from '../content';
import {scrollToHash} from '../lib/scroll';

function go(e: MouseEvent<HTMLAnchorElement>, then?: () => void) {
  const hash = e.currentTarget.getAttribute('href');
  if (!hash?.startsWith('#')) return;
  e.preventDefault();
  then?.();
  scrollToHash(hash);
}

/** The mark: a sun. Replaced by `brand.logo` when set. */
function Mark({className = ''}: {className?: string}) {
  if (brand.logo) return <img src={brand.logo} alt="" className={`${className} object-contain`} />;
  return (
    <svg viewBox="-50 -50 100 100" aria-hidden="true" className={className}>
      <circle r="22" fill="none" stroke="currentColor" strokeWidth="9" />
      {Array.from({length: 12}, (_, i) => (
        <line key={i} x1="0" y1="-32" x2="0" y2="-46" stroke="currentColor" strokeWidth="7" strokeLinecap="round" transform={`rotate(${i * 30})`} />
      ))}
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 text-bark">
      <div className="flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-5 md:px-[3vw]">
        <a href="#top" onClick={(e) => go(e)} className="flex items-center gap-2.5" aria-label={`${brand.name} — back to top`}>
          <Mark className="size-7 text-saffron-deep" />
          <span className="font-display text-[1rem] tracking-[0.14em]">{brand.wordmark}</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={(e) => go(e)} className="font-mono text-label text-bark/75 uppercase transition-colors hover:text-bark">
              {item.label}
            </a>
          ))}
          <a href="#order" onClick={(e) => go(e)} className="rounded-full bg-saffron px-5 py-2.5 font-mono text-label text-bark uppercase transition-colors hover:bg-bark hover:text-paper">
            Get a quote
          </a>
        </nav>
        <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="menu" className="font-mono text-label uppercase md:hidden">
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      <div id="menu" inert={!open} className={`fixed inset-0 -z-10 flex flex-col justify-center gap-6 bg-paper/95 px-6 backdrop-blur-xl transition-opacity md:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        {nav.map((item, i) => (
          <a key={item.href} href={item.href} onClick={(e) => go(e, () => setOpen(false))} className="flex items-baseline gap-4 font-display text-[1.75rem] tracking-[0.06em] uppercase">
            <span className="font-mono text-label text-saffron-deep">0{i + 1}</span>
            {item.label}
          </a>
        ))}
      </div>
    </header>
  );
}

export function WhatsAppFab() {
  return (
    <a
      href={`https://wa.me/${brand.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-3 font-mono text-label text-bark uppercase shadow-lg transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Z" /></svg>
      WhatsApp
    </a>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-bark/10 bg-paper px-4 py-10 pb-24 sm:px-6 md:px-[6vw]">
      <div className="grid gap-8 font-mono text-label text-muted uppercase md:grid-cols-3">
        <div>
          <span className="flex items-center gap-2.5 text-bark">
            <Mark className="size-5 text-saffron-deep" />
            {brand.wordmark} · {brand.tagline}
          </span>
          <p className="mt-4 max-w-[22rem] leading-relaxed normal-case">{brand.address}</p>
        </div>
        <div className="space-y-2">
          <a className="block hover:text-bark" href={`tel:+${brand.whatsapp}`}>{brand.phoneDisplay}</a>
          <a className="block hover:text-bark normal-case" href={`mailto:${brand.email}`}>{brand.email}</a>
          {brand.instagram && (
            <a className="block hover:text-bark" href={brand.instagram} target="_blank" rel="noreferrer">Instagram</a>
          )}
        </div>
        <div className="md:text-right">
          <p>© {new Date().getFullYear()} {brand.name}</p>
          <a href="#top" onClick={(e) => go(e)} className="mt-2 inline-block hover:text-bark">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
