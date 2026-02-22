import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sampleArtworks = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=400&fit=crop',
    alt: 'Rainbow Landscape',
    rotation: -6,
    top: '12%',
    left: '6%',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop',
    alt: 'Fantasy Creature',
    rotation: 4,
    top: '18%',
    right: '10%',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=400&fit=crop',
    alt: 'Abstract Art',
    rotation: -2,
    bottom: '22%',
    left: '8%',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&h=400&fit=crop',
    alt: 'Family Portrait',
    rotation: 5,
    bottom: '18%',
    right: '6%',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&h=400&fit=crop',
    alt: 'Flowers',
    rotation: -4,
    top: '52%',
    left: '4%',
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const chars = titleRef.current?.querySelectorAll('.char');
      if (chars) {
        gsap.fromTo(
          chars,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.04,
            ease: 'power2.out',
          }
        );
      }

      imagesRef.current.forEach((img, index) => {
        if (img) {
          gsap.fromTo(
            img,
            {
              scale: 0.8,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              delay: 0.3 + index * 0.1,
              ease: 'power2.out',
            }
          );
        }
      });

      // 只保留視差滾動效果
      imagesRef.current.forEach((img) => {
        if (img) {
          gsap.to(img, {
            y: gsap.utils.random(-60, 60),
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }
      });

      gsap.to(titleRef.current, {
        opacity: 0,
        scale: 0.95,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '50% top',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;

      imagesRef.current.forEach((img, index) => {
        if (img) {
          const speed = 0.012 + index * 0.004;
          const x = (clientX - centerX) * speed;
          const y = (clientY - centerY) * speed;
          gsap.to(img, {
            x,
            y,
            duration: 0.5,
            ease: 'power2.out',
          });
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const titleText = 'GALLERY LL';

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#A8E4A0] rounded-full mix-blend-multiply filter blur-3xl opacity-15" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gray-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>

      {sampleArtworks.map((artwork, index) => (
        <div
          key={artwork.id}
          ref={(el) => { imagesRef.current[index] = el; }}
          className="absolute hidden lg:block artwork-frame cursor-pointer transition-all duration-300 hover:scale-105 hover:z-50"
          style={{
            top: artwork.top,
            left: artwork.left,
            right: artwork.right,
            bottom: artwork.bottom,
            transform: `rotate(${artwork.rotation}deg)`,
            width: '140px',
          }}
        >
          <img
            src={artwork.src}
            alt={artwork.alt}
            className="w-full h-auto rounded-lg"
            loading="lazy"
          />
        </div>
      ))}

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium mb-6 overflow-hidden tracking-tight"
        >
          {titleText.split('').map((char, index) => (
            <span
              key={index}
              className="char inline-block text-gray-900"
              style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h1>

        <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed font-light">
          A personal digital gallery showcasing original artwork and creative expressions
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-[#A8E4A0] text-gray-900 font-medium rounded-full shadow-sm hover:bg-[#8BC985] transform hover:scale-105 transition-all ripple"
          >
            VIEW GALLERY
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-white text-gray-700 font-medium rounded-full shadow-sm hover:shadow-md transform hover:scale-105 transition-all border-2 border-[#A8E4A0]/30 hover:border-[#A8E4A0]"
          >
            ABOUT THE ARTIST
          </button>
        </div>

        <div className="lg:hidden mt-12 grid grid-cols-3 gap-3 max-w-sm mx-auto">
          {sampleArtworks.slice(0, 3).map((artwork) => (
            <div
              key={artwork.id}
              className="artwork-frame"
            >
              <img
                src={artwork.src}
                alt={artwork.alt}
                className="w-full h-24 object-cover rounded-lg"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="w-6 h-10 rounded-full border-2 border-[#A8E4A0] flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-[#A8E4A0] rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
