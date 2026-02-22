import { useState, useEffect } from 'react';
import { Share2, Palette, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.nav-container',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    gsap.fromTo(
      '.nav-logo',
      { rotation: -180, scale: 0 },
      { rotation: 0, scale: 1, duration: 0.6, delay: 0.2, ease: 'power2.out' }
    );

    gsap.fromTo(
      '.nav-link',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.3, ease: 'power2.out' }
    );
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'GALLERY LL',
          text: 'Check out my artwork!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-2 px-4'
          : 'py-4 px-6'
      }`}
    >
      <div
        className={`nav-container mx-auto transition-all duration-500 ${
          isScrolled
            ? 'max-w-2xl glass-nav rounded-full px-6 py-2 shadow-sm'
            : 'max-w-6xl'
        }`}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => scrollToSection('hero')}
            className="nav-logo flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-[#A8E4A0] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
              <Palette className="w-5 h-5 text-gray-900" />
            </div>
            <span className={`font-semibold text-lg tracking-tight transition-all ${isScrolled ? 'hidden md:block' : ''}`}>
              GALLERY LL
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {[
              { label: 'GALLERY', id: 'gallery' },
              { label: 'ABOUT', id: 'about' },
              { label: 'GUESTBOOK', id: 'guestbook' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="nav-link relative px-4 py-2 rounded-full font-medium text-sm hover:bg-[#A8E4A0]/10 transition-colors group"
              >
                {item.label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#A8E4A0] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={handleShare}
              className="nav-link ripple rounded-full bg-[#A8E4A0] text-gray-900 hover:bg-[#8BC985] shadow-sm font-medium"
              size="sm"
            >
              <Share2 className="w-4 h-4 mr-1" />
              <span className="hidden sm:inline">SHARE</span>
            </Button>

            <button
              className="md:hidden p-2 rounded-full hover:bg-[#A8E4A0]/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[#A8E4A0]/20 pt-4">
            <div className="flex flex-col gap-2">
              {[
                { label: 'GALLERY', id: 'gallery' },
                { label: 'ABOUT', id: 'about' },
                { label: 'GUESTBOOK', id: 'guestbook' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-3 rounded-xl text-left font-medium hover:bg-[#A8E4A0]/10 transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
