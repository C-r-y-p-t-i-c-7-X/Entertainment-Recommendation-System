import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function HeroBanner({ item }) {
  const router = useRouter();
  const [displayItem, setDisplayItem] = useState(item);
  const [nextItem, setNextItem] = useState(null);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    if (!item || item.id === displayItem?.id) return;

    // Step 1 — preload the new image silently in background
    if (item.backdrop_path) {
      const img = new window.Image();
      img.src = `https://image.tmdb.org/t/p/original${item.backdrop_path}`;

      // Step 2 — once image is fully loaded, THEN start the transition
      img.onload = () => {
        setFade(false); // fade out current
        setTimeout(() => {
          setDisplayItem(item); // swap to new (already cached)
          setFade(true); // fade in new instantly
        }, 200);
      };

      // Fallback — if image fails or takes too long (3s), swap anyway
      img.onerror = () => {
        setFade(false);
        setTimeout(() => {
          setDisplayItem(item);
          setFade(true);
        }, 200);
      };

      const fallback = setTimeout(() => {
        setFade(false);
        setTimeout(() => {
          setDisplayItem(item);
          setFade(true);
        }, 200);
      }, 3000);

      return () => clearTimeout(fallback);
    } else {
      // No backdrop, just swap directly
      setFade(false);
      setTimeout(() => {
        setDisplayItem(item);
        setFade(true);
      }, 200);
    }
  }, [item]);

  if (!displayItem) return null;

  const mediaType = displayItem.media_type || (displayItem.title ? 'movie' : 'tv');
  const title = displayItem.title || displayItem.name;
  const backdrop = displayItem.backdrop_path
    ? `https://image.tmdb.org/t/p/original${displayItem.backdrop_path}`
    : null;
  const overview = displayItem.overview?.slice(0, 180) + '...';
  const rating = displayItem.vote_average?.toFixed(1);
  const year = (displayItem.release_date || displayItem.first_air_date || '').slice(0, 4);
  const type = mediaType === 'tv' ? 'TV Show' : 'Movie';

  return (
    <div
      className="relative w-full flex items-end overflow-hidden"
      style={{ height: '85vh' }}
    >
      {/* Background Image with fade */}
      {backdrop && (
        <div
          style={{
            position: 'absolute', inset: 0,
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        >
          <Image
            src={backdrop}
            alt={title}
            fill
            className="object-cover object-top"
            priority
          />
        </div>
      )}

      {/* Dark overlay */}
      <div className="hero-gradient absolute inset-0" />

      {/* Bottom fade to page background */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px',
        background: 'linear-gradient(to bottom, transparent, #0d0d1a)',
      }} />

      {/* Content with fade */}
      <div
        className="relative z-10 px-10 pb-24 max-w-2xl"
        style={{
          opacity: fade ? 1 : 0,
          transform: fade ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}
          >
            {type}
          </span>
          <span className="text-yellow-400 text-sm font-semibold">⭐ {rating}</span>
          <span className="text-gray-400 text-sm">{year}</span>
        </div>

        <h1 style={{
          fontSize: '52px', fontWeight: '900', color: 'white',
          marginBottom: '16px', lineHeight: '1.1',
          textShadow: '0 2px 20px rgba(0,0,0,0.8)',
        }}>
          {title}
        </h1>

        <p style={{
          color: '#d1d5db', fontSize: '15px',
          marginBottom: '28px', lineHeight: '1.7',
          textShadow: '0 1px 8px rgba(0,0,0,0.9)',
        }}>
          {overview}
        </p>

        <div className="flex gap-4">
          <button
            className="btn-primary"
            onClick={() => router.push(`/${mediaType}/${displayItem.id}`)}
            style={{ fontSize: '15px', padding: '12px 28px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            ▶ Watch Now
          </button>
          <button
            className="btn-secondary"
            style={{ fontSize: '15px', padding: '12px 28px' }}
          >
            + Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}
