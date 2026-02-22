import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sampleMessages = [
  {
    id: '1',
    name: 'Sarah',
    message: 'I love your artwork! The colors are so beautiful. I want to draw like you!',
    createdAt: new Date('2024-03-01'),
    color: 'bg-[#A8E4A0]/10',
    rotation: -1,
  },
  {
    id: '2',
    name: 'Aunt Mary',
    message: 'LL, your drawings are getting better and better! Keep up the great work!',
    createdAt: new Date('2024-03-05'),
    color: 'bg-[#C5F0BF]/20',
    rotation: 1,
  },
  {
    id: '3',
    name: 'Teacher Chen',
    message: 'So happy to see your progress! Keep your passion for art!',
    createdAt: new Date('2024-03-08'),
    color: 'bg-[#A8E4A0]/15',
    rotation: -1,
  },
  {
    id: '4',
    name: 'Emma',
    message: 'The rainbow landscape is so beautiful! Can you teach me how to draw it?',
    createdAt: new Date('2024-03-10'),
    color: 'bg-[#C5F0BF]/15',
    rotation: 1,
  },
  {
    id: '5',
    name: 'Uncle Tom',
    message: 'Such talent at a young age. You will become a great artist!',
    createdAt: new Date('2024-03-12'),
    color: 'bg-[#A8E4A0]/10',
    rotation: -1,
  },
];

const noteColors = [
  'bg-[#A8E4A0]/10',
  'bg-[#C5F0BF]/20',
  'bg-[#A8E4A0]/15',
  'bg-[#C5F0BF]/15',
  'bg-[#A8E4A0]/8',
  'bg-[#C5F0BF]/10',
];

export default function Guestbook() {
  const sectionRef = useRef<HTMLElement>(null);
  const notesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.guestbook-title',
        { y: 30, opacity: 0 },
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

      notesRef.current.forEach((note, index) => {
        if (note) {
          gsap.fromTo(
            note,
            {
              scale: 0.9,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              delay: index * 0.08,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: note,
                start: 'top 90%',
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.name.trim() || !newMessage.message.trim()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const message = {
      id: Date.now().toString(),
      name: newMessage.name,
      message: newMessage.message,
      createdAt: new Date(),
      color: noteColors[Math.floor(Math.random() * noteColors.length)],
      rotation: Math.random() * 2 - 1,
    };

    setMessages((prev) => [message, ...prev]);
    setNewMessage({ name: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <section
      id="guestbook"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="guestbook-title text-4xl sm:text-5xl md:text-6xl font-medium text-gray-900 mb-4 tracking-tight">
            GUESTBOOK
          </h2>
          <div className="w-12 h-0.5 bg-[#A8E4A0] mx-auto mb-4 rounded-full" />
          <p className="text-gray-500 text-lg">
            Leave a message and let me know what you think
          </p>
        </div>

        <div className="max-w-lg mx-auto mb-12">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl p-6 card-shadow border border-[#A8E4A0]/10"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8E4A0]" />
                  <Input
                    value={newMessage.name}
                    onChange={(e) => setNewMessage({ ...newMessage, name: e.target.value })}
                    placeholder="Enter your name"
                    className="pl-10 rounded-lg border-[#A8E4A0]/20 focus:border-[#A8E4A0] focus:ring-[#A8E4A0]/20"
                    maxLength={20}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  value={newMessage.message}
                  onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                  placeholder="Write your message..."
                  className="rounded-lg min-h-[100px] resize-none border-[#A8E4A0]/20 focus:border-[#A8E4A0] focus:ring-[#A8E4A0]/20"
                  maxLength={200}
                />
                <p className="text-xs text-gray-400 text-right mt-1">
                  {newMessage.message.length}/200
                </p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || !newMessage.name.trim() || !newMessage.message.trim()}
                className="w-full bg-[#A8E4A0] text-gray-900 font-medium rounded-lg py-3 ripple hover:bg-[#8BC985]"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Posting...' : 'Post Message'}
              </Button>
            </div>
          </form>
        </div>

        <div className="cork-board rounded-2xl p-6 sm:p-8 border border-[#A8E4A0]/10">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                ref={(el) => { notesRef.current[index] = el; }}
                className={`${msg.color} rounded-lg p-4 sticky-note break-inside-avoid cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:rotate-0 hover:shadow-lg hover:z-10 border border-[#A8E4A0]/10`}
                style={{
                  transform: `rotate(${msg.rotation}deg)`,
                }}
              >
                <div className="flex justify-center mb-3">
                  <div className="w-3 h-3 rounded-full bg-[#A8E4A0] shadow-sm" />
                </div>

                <p className="text-gray-700 text-sm leading-relaxed mb-3 whitespace-pre-wrap">
                  {msg.message}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[#A8E4A0]/10">
                  <span className="font-medium text-sm text-gray-800">{msg.name}</span>
                  <span className="text-xs text-gray-400">
                    {msg.createdAt.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
