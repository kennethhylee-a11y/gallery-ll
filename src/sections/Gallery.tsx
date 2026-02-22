import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Heart, Share2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sampleArtworks = [
  {
    id: '1',
    title: 'Rainbow Landscape',
    description: 'A dreamy world with colorful clouds and glowing flowers',
    imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=600&fit=crop',
    createdAt: new Date('2024-01-15'),
    category: 'Landscape',
  },
  {
    id: '2',
    title: 'Fantasy Creature',
    description: 'A flying unicorn with rainbow-colored wings',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=800&fit=crop',
    createdAt: new Date('2024-02-01'),
    category: 'Fantasy',
  },
  {
    id: '3',
    title: 'Abstract Art',
    description: 'Created with my favorite colors, representing happiness',
    imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=600&h=500&fit=crop',
    createdAt: new Date('2024-02-10'),
    category: 'Abstract',
  },
  {
    id: '4',
    title: 'Family Portrait',
    description: 'Our family having a picnic in the park',
    imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=700&fit=crop',
    createdAt: new Date('2024-02-20'),
    category: 'Portrait',
  },
  {
    id: '5',
    title: 'Underwater World',
    description: 'Beautiful fish and glowing jellyfish in the deep sea',
    imageUrl: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=600&fit=crop',
    createdAt: new Date('2024-03-01'),
    category: 'Nature',
  },
  {
    id: '6',
    title: 'Starry Night',
    description: 'The stars twinkling in the night sky',
    imageUrl: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=800&fit=crop',
    createdAt: new Date('2024-03-10'),
    category: 'Landscape',
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<typeof sampleArtworks[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedArtworks, setLikedArtworks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-title',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              y: 60,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              delay: index * 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
              },
            }
          );
        }
      });

      const evenCards = cardsRef.current.filter((_, i) => i % 2 === 0);
      const oddCards = cardsRef.current.filter((_, i) => i % 2 === 1);

      evenCards.forEach((card) => {
        if (card) {
          gsap.to(card, {
            y: -80,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }
      });

      oddCards.forEach((card) => {
        if (card) {
          gsap.to(card, {
            y: -30,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const openLightbox = (artwork: typeof sampleArtworks[0], index: number) => {
    setSelectedArtwork(artwork);
    setCurrentIndex(index);
  };

  const navigateArtwork = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev'
      ? (currentIndex - 1 + sampleArtworks.length) % sampleArtworks.length
      : (currentIndex + 1) % sampleArtworks.length;
    setCurrentIndex(newIndex);
    setSelectedArtwork(sampleArtworks[newIndex]);
  };

  const toggleLike = (id: string) => {
    setLikedArtworks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleShare = async (artwork: typeof sampleArtworks[0]) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: artwork.title,
          text: artwork.description,
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
    <section
      id="gallery"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="gallery-title text-4xl sm:text-5xl md:text-6xl font-medium text-gray-900 mb-4 tracking-tight">
            FEATURED WORKS
          </h2>
          <div className="w-16 h-0.5 bg-[#A8E4A0] mx-auto mb-4 rounded-full" />
          <p className="text-gray-500 text-lg max-w-xl mx-auto font-light">
            Each piece tells a story — welcome to my imagination
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {sampleArtworks.map((artwork, index) => (
            <div
              key={artwork.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => openLightbox(artwork, index)}
            >
              <div className="relative bg-white rounded-xl overflow-hidden card-shadow transition-all duration-500 hover:card-shadow-hover group-hover:scale-[1.02]">
                <div className="relative overflow-hidden">
                  <img
                    src={artwork.imageUrl}
                    alt={artwork.title}
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <span className="absolute top-3 left-3 px-3 py-1 bg-[#A8E4A0] text-gray-900 rounded-full text-xs font-medium">
                    {artwork.category}
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-medium text-lg mb-1">{artwork.title}</h3>
                    <p className="text-sm text-white/80 line-clamp-2">{artwork.description}</p>
                  </div>
                </div>

                <div className="p-3 flex items-center justify-between bg-white border-t border-[#A8E4A0]/10">
                  <span className="text-xs text-gray-400">
                    {artwork.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(artwork.id);
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        likedArtworks.has(artwork.id)
                          ? 'bg-[#A8E4A0]/20 text-[#8BC985]'
                          : 'hover:bg-gray-100 text-gray-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedArtworks.has(artwork.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(artwork);
                      }}
                      className="p-2 rounded-full hover:bg-[#A8E4A0]/10 text-gray-400 hover:text-[#8BC985] transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedArtwork} onOpenChange={() => setSelectedArtwork(null)}>
        <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] p-0 overflow-hidden bg-white rounded-xl border-2 border-[#A8E4A0]/20">
          {selectedArtwork && (
            <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
              <div className="relative flex-1 bg-gray-100 flex items-center justify-center min-h-[300px] lg:min-h-[500px]">
                <img
                  src={selectedArtwork.imageUrl}
                  alt={selectedArtwork.title}
                  className="max-w-full max-h-full object-contain"
                />
                
                <button
                  onClick={() => navigateArtwork('prev')}
                  className="absolute left-4 p-3 rounded-full bg-white/90 hover:bg-[#A8E4A0] shadow-sm transition-all hover:scale-105"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigateArtwork('next')}
                  className="absolute right-4 p-3 rounded-full bg-white/90 hover:bg-[#A8E4A0] shadow-sm transition-all hover:scale-105"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="w-full lg:w-80 p-6 flex flex-col">
                <DialogHeader>
                  <DialogTitle className="text-xl font-medium mb-2 text-gray-900">
                    {selectedArtwork.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-auto">
                  <span className="inline-block px-3 py-1 bg-[#A8E4A0] text-gray-900 rounded-full text-sm font-medium mb-4">
                    {selectedArtwork.category}
                  </span>
                  
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {selectedArtwork.description}
                  </p>

                  <p className="text-sm text-gray-400">
                    Created on {selectedArtwork.createdAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>

                <div className="flex gap-3 mt-6 pt-4 border-t border-[#A8E4A0]/20">
                  <Button
                    onClick={() => toggleLike(selectedArtwork.id)}
                    variant="outline"
                    className={`flex-1 border-[#A8E4A0]/30 hover:bg-[#A8E4A0]/10 hover:border-[#A8E4A0] ${
                      likedArtworks.has(selectedArtwork.id)
                        ? 'bg-[#A8E4A0]/20 border-[#A8E4A0] text-[#8BC985]'
                        : ''
                    }`}
                  >
                    <Heart className={`w-4 h-4 mr-2 ${likedArtworks.has(selectedArtwork.id) ? 'fill-current' : ''}`} />
                    Like
                  </Button>
                  <Button
                    onClick={() => handleShare(selectedArtwork)}
                    variant="outline"
                    className="flex-1 border-[#A8E4A0]/30 hover:bg-[#A8E4A0]/10 hover:border-[#A8E4A0]"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
