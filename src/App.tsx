import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Gallery from './sections/Gallery';
import About from './sections/About';
import Guestbook from './sections/Guestbook';
import Footer from './sections/Footer';
import AdminPanel from './components/AdminPanel';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    
    if (!isTouchDevice) {
      ScrollTrigger.defaults({
        markers: false,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <main>
        <Hero />
        <Gallery />
        <About />
        <Guestbook />
      </main>

      <Footer />
      <AdminPanel />
    </div>
  );
}

export default App;
