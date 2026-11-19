import type {MouseEvent} from 'react';
import {pricing} from '../content';
import {useReveals} from '../hooks/useReveals';
import {scrollToHash} from '../lib/scroll';

const toOrder = (e: MouseEvent<HTMLAnchorElement>, qty: string) => {
  e.preventDefault();
  const input = document.querySelector<HTMLInputElement>('#order input[name="quantity"]');
  if (input) input.value = qty;
  scrollToHash('#order');
};

export function Pricing() {
  const ref = useReveals<HTMLElement>();
  return (
    <section ref={ref} id="pricing" aria-labelledby="pricing-title" className="relative bg-paper px-4 py-28 sm:px-6 md:px-[6vw] md:py-40">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between" data-reveal>
        <div>
          <p className="font-mono text-label text-saffron-deep uppercase">{pricing.eyebrow}</p>
          <h2 id="pricing-title" className="mt-4 font-display text-display text-bark">{pricing.heading}</h2>
        </div>
        <p className="font-mono text-label text-muted uppercase">{pricing.note}</p>
      </div>

      <ol className="mt-14 grid gap-4 md:mt-20 md:grid-cols-3 md:gap-5">
        {pricing.tiers.map((t, i) => (
          <li
            key={t.name}
            data-reveal
            style={{transitionDelay: `${i * 110}ms`}}
            className={`relative flex flex-col overflow-hidden rounded-[12px] p-6 ring-1 md:p-8 ${t.featured ? 'bg-paper-2 ring-saffron/70' : 'bg-paper-2/60 ring-bark/10'}`}
          >
            {t.featured && <span className="self-start rounded-[3px] bg-highlight px-2 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-bark uppercase">Best value</span>}
            <h3 className={`font-display text-[1.25rem] tracking-[0.06em] text-bark uppercase ${t.featured ? 'mt-5' : ''}`}>{t.name}</h3>
            <p className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-[2.75rem] leading-none text-bark">{t.from}</span>
              <span className="font-mono text-label text-muted uppercase">{t.unit}</span>
            </p>
            <ul className="mt-8 space-y-2.5 border-t border-bark/10 pt-6">
              {t.lines.map((l) => (
                <li key={l} className="flex gap-3 text-[0.9375rem] text-bark/85">
                  <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-saffron" />
                  {l}
                </li>
              ))}
            </ul>
            <a
              href="#order"
              onClick={(e) => toOrder(e, t.qty)}
              className={`mt-10 rounded-full px-5 py-3.5 text-center font-mono text-label uppercase transition-colors ${t.featured ? 'bg-saffron text-bark hover:bg-bark hover:text-paper' : 'text-bark ring-1 ring-bark/25 hover:bg-bark hover:text-paper'}`}
            >
              {t.cta}
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
