import { Palette, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-8 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 fill-[#fafafa]"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" />
        </svg>
      </div>

      <div className="bg-white pt-8 pb-4 border-t border-[#A8E4A0]/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#A8E4A0] flex items-center justify-center shadow-sm">
                <Palette className="w-5 h-5 text-gray-900" />
              </div>
              <span className="text-lg font-medium tracking-tight">GALLERY LL</span>
            </div>

            <p className="text-gray-500 max-w-md mb-6 font-light">
              A personal digital gallery capturing moments of creativity and imagination
            </p>

            <div className="flex gap-8 mb-8">
              <a
                href="#gallery"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-500 hover:text-gray-900 transition-colors relative group text-sm"
              >
                GALLERY
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A8E4A0] group-hover:w-full transition-all duration-300" />
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-500 hover:text-gray-900 transition-colors relative group text-sm"
              >
                ABOUT
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A8E4A0] group-hover:w-full transition-all duration-300" />
              </a>
              <a
                href="#guestbook"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('guestbook')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-gray-500 hover:text-gray-900 transition-colors relative group text-sm"
              >
                GUESTBOOK
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A8E4A0] group-hover:w-full transition-all duration-300" />
              </a>
            </div>

            <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-[#A8E4A0]/30 to-transparent mb-6" />

            <div className="flex items-center gap-1 text-sm text-gray-400">
              <span>&copy; {currentYear} GALLERY LL</span>
              <span className="mx-2">·</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-3 h-3 text-[#A8E4A0] fill-current" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 text-2xl opacity-20">
        🖌️
      </div>
    </footer>
  );
}
