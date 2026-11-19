import {useEffect} from 'react';
import {Footer, Header, WhatsAppFab} from './components/Chrome';
import {Hero} from './components/Hero';
import {Order} from './components/Order';
import {Pricing} from './components/Pricing';
import {Process} from './components/Process';
import {Products} from './components/Products';
import {useReducedMotion} from './hooks/useReducedMotion';
import {startScroll} from './lib/scroll';

export default function App() {
  const reduced = useReducedMotion();
  useEffect(() => startScroll(reduced), [reduced]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <Process />
        <Pricing />
        <Order />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
