import {useEffect, useState, type FormEvent} from 'react';
import {brand, order, products} from '../content';
import {useReveals} from '../hooks/useReveals';

type Status = 'idle' | 'invalid' | 'sent';

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!target) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [target]);
  const s = Math.floor(Math.max(0, new Date(target).getTime() - now) / 1000);
  return {d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60};
}

/** Order form → opens WhatsApp with the request pre-written. No backend. */
export function Order() {
  const ref = useReveals<HTMLElement>();
  const t = useCountdown(order.deadline);
  const [status, setStatus] = useState<Status>('idle');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setStatus('invalid');
      form.reportValidity();
      return;
    }
    const d = new FormData(form);
    const text = `Hi ${brand.name}, I'd like to order.\nName: ${d.get('name')}\nPhone: ${d.get('phone')}\nProduct: ${d.get('product')}\nQuantity: ${d.get('quantity')}\nDetails: ${d.get('notes') || '-'}`;
    window.open(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setStatus('sent');
  };

  const field = 'w-full rounded-[8px] bg-bark/[0.05] px-4 py-3.5 text-body text-bark ring-1 ring-bark/15 outline-none placeholder:text-muted/60 focus:ring-saffron user-invalid:ring-red-400/70';
  const units: [string, number][] = [['Days', t.d], ['Hrs', t.h], ['Min', t.m], ['Sec', t.s]];

  return (
    <section ref={ref} id="order" aria-labelledby="order-title" className="relative overflow-hidden bg-paper px-4 pb-28 sm:px-6 md:px-[6vw] md:pb-40">
      <div className="relative grid gap-12 border-t border-bark/10 pt-20 md:grid-cols-2 md:gap-16 md:pt-28">
        <div data-reveal>
          <p className="font-mono text-label text-saffron-deep uppercase">{order.eyebrow}</p>
          <h2 id="order-title" className="mt-4 font-display text-display text-bark">{order.heading}</h2>
          <p className="mt-5 max-w-[28rem] text-body text-muted">{order.body}</p>

          {order.deadline && (
            <div className="mt-10">
              <p className="font-mono text-label text-muted uppercase">{order.deadlineLabel}</p>
              <div className="mt-3 flex gap-2 md:gap-3" role="timer" aria-label={`${t.d} days, ${t.h} hours, ${t.m} minutes until the next bulk-order cut-off`}>
                {units.map(([label, v]) => (
                  <div key={label} className="min-w-[4.25rem] rounded-[8px] bg-paper-2 px-3 py-3 text-center ring-1 ring-bark/10 md:min-w-[5.5rem]">
                    <span className="block font-display text-[1.5rem] text-bark tabular-nums md:text-[2.25rem]">{String(v).padStart(2, '0')}</span>
                    <span className="mt-1 block font-mono text-[0.625rem] tracking-[0.14em] text-muted uppercase">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <form noValidate onSubmit={onSubmit} aria-describedby="order-status" className="space-y-3" data-reveal>
          <label className="block">
            <span className="mb-1.5 block font-mono text-label text-muted uppercase">Name</span>
            <input name="name" required autoComplete="name" placeholder="Your name" className={field} onInput={() => setStatus('idle')} />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-label text-muted uppercase">Phone</span>
            <input name="phone" type="tel" required autoComplete="tel" placeholder="+91 …" className={field} onInput={() => setStatus('idle')} />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block font-mono text-label text-muted uppercase">Product</span>
              <select name="product" defaultValue={products[0].title} className={`${field} appearance-none`}>
                {products.map((p) => (
                  <option key={p.title} value={p.title} className="bg-paper">{p.title}</option>
                ))}
                <option value="Something else" className="bg-paper">Something else</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block font-mono text-label text-muted uppercase">Quantity</span>
              <input name="quantity" required defaultValue="1" placeholder="e.g. 25" className={field} onInput={() => setStatus('idle')} />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block font-mono text-label text-muted uppercase">Details (optional)</span>
            <textarea name="notes" rows={3} placeholder="Sizes, colours, deadline, design notes…" className={field} />
          </label>
          <button type="submit" className="mt-2 w-full rounded-full bg-saffron px-5 py-4 font-mono text-label text-bark uppercase transition-colors hover:bg-bark hover:text-paper">
            Send on WhatsApp
          </button>
          <p id="order-status" role="status" className="min-h-[1.25rem] text-[0.8125rem] text-muted">
            {status === 'invalid' && 'Please add your name, phone and quantity.'}
            {status === 'sent' && `WhatsApp should be open with your request. If not, email ${brand.email}.`}
          </p>
        </form>
      </div>
    </section>
  );
}
