import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Brush, Palette } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const artistProfile = {
  name: 'LL',
  age: 10,
  bio: "Hi! I'm 10 years old and I've loved drawing since I was little. I enjoy using bright colors to paint fantasy worlds and cute animals. My dream is to become an illustrator when I grow up and create amazing storybooks!",
  photoUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=400&fit=crop',
  stats: {
    artworks: 42,
    awards: 5,
    themes: 12,
  },
};

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [counters, setCounters] = useState({ artworks: 0, awards: 0, themes: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-title',
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.about-content',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { clipPath: 'circle(0% at 50% 50%)' },
        {
          clipPath: 'circle(100% at 50% 50%)',
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => {
          const duration = 2000;
          const steps = 60;
          const interval = duration / steps;
          let step = 0;

          const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setCounters({
              artworks: Math.round(artistProfile.stats.artworks * easeProgress),
              awards: Math.round(artistProfile.stats.awards * easeProgress),
              themes: Math.round(artistProfile.stats.themes * easeProgress),
            });

            if (step >= steps) {
              clearInterval(timer);
            }
          }, interval);
        },
        once: true,
      });

      gsap.fromTo(
        '.stat-card',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          delay: 0.4,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) / 25;
      const y = (e.clientY - centerY) / 25;

      gsap.to(imageRef.current.querySelector('img'), {
        x,
        y,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="about-title text-4xl sm:text-5xl font-medium text-gray-900 mb-6 tracking-tight">
              ABOUT THE ARTIST
            </h2>
            <div className="w-12 h-0.5 bg-[#A8E4A0] mb-6 rounded-full" />

            <div className="about-content space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#A8E4A0] flex items-center justify-center text-gray-900 text-xl font-medium">
                  {artistProfile.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-gray-900">{artistProfile.name}</h3>
                  <p className="text-gray-500">{artistProfile.age} years old</p>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg font-light">
                {artistProfile.bio}
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="stat-card bg-white rounded-xl p-4 text-center card-shadow hover:card-shadow-hover transition-all border border-[#A8E4A0]/10">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#A8E4A0]/20 flex items-center justify-center">
                    <Palette className="w-5 h-5 text-[#8BC985]" />
                  </div>
                  <div className="text-2xl font-medium text-gray-900 counter">
                    {counters.artworks}+
                  </div>
                  <div className="text-xs text-gray-500">Artworks</div>
                </div>

                <div className="stat-card bg-white rounded-xl p-4 text-center card-shadow hover:card-shadow-hover transition-all border border-[#A8E4A0]/10">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#A8E4A0]/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#8BC985]" />
                  </div>
                  <div className="text-2xl font-medium text-gray-900 counter">
                    {counters.awards}
                  </div>
                  <div className="text-xs text-gray-500">Awards</div>
                </div>

                <div className="stat-card bg-white rounded-xl p-4 text-center card-shadow hover:card-shadow-hover transition-all border border-[#A8E4A0]/10">
                  <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#A8E4A0]/20 flex items-center justify-center">
                    <Brush className="w-5 h-5 text-[#8BC985]" />
                  </div>
                  <div className="text-2xl font-medium text-gray-900 counter">
                    {counters.themes}
                  </div>
                  <div className="text-xs text-gray-500">Themes</div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div
              ref={imageRef}
              className="relative w-72 h-72 sm:w-96 sm:h-96"
            >
              <div className="absolute inset-0 rounded-full bg-[#A8E4A0]/30 blur-2xl scale-110" />
              
              <div className="relative w-full h-full rounded-full overflow-hidden artwork-frame border-4 border-[#A8E4A0]/30">
                <img
                  src={artistProfile.photoUrl}
                  alt={artistProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -top-2 -right-2 w-12 h-12 bg-[#A8E4A0] rounded-full flex items-center justify-center text-lg shadow-sm">
                🎨
              </div>
              <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-white border-2 border-[#A8E4A0] rounded-full flex items-center justify-center text-base shadow-sm">
                ✨
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
