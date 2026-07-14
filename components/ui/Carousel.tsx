'use client';

import Image from 'next/image';

interface CarouselItem {
  name: string;
  link: string;
  image: { url: string };
}

interface CarouselProps {
  items: CarouselItem[];
  title: string;
}

export default function PartnerCarousel({ items, title }: CarouselProps) {
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) return imagePath;
    const baseUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL?.replace('/graphql', '') || 'http://localhost:8000';
    const cleanPath = imagePath.replace(/^\/+/, '');
    const fullPath = cleanPath.startsWith('upload/') ? cleanPath : `upload/${cleanPath}`;
    return `${baseUrl}/${fullPath}`;
  };

  const isLowCount = items.length <= 4;
  const displayItems = isLowCount ? items : [...items, ...items];

  if (!items || items.length === 0) return null;

  return (
    <section className="w-full py-12 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
        <h2 className="text-responsive-2xl font-bold text-gray-900 mb-6">
          {title}
        </h2>
        <div className="h-1 w-12 bg-yellow-600 mx-auto rounded-full" />
      </div>

      <div className="relative flex items-center justify-center overflow-hidden group">
        <div className={`
          flex items-center justify-center gap-8 md:gap-16 px-4
          ${isLowCount ? 'flex-wrap' : 'animate-marquee whitespace-nowrap'}
        `}>
          {displayItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative shrink-0 transition-all duration-300 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 hover:scale-110"
            >
              <div className="relative w-24 h-12 md:w-40 md:h-20">
                <Image
                  src={getImageUrl(item.image.url)}
                  alt={item.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </a>
          ))}
        </div>

        {!isLowCount && (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-40 bg-linear-to-r from-white to-transparent z-10"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-40 bg-linear-to-l from-white to-transparent z-10"></div>
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}