import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

export default function HeroBanner({ item }) {
  const router = useRouter();

  const [layers, setLayers] = useState([
    { item: item, active: true, id: 0 },
  ]);
  const [textItem, setTextItem] = useState(item);
  const [textVisible, setTextVisible] = useState(true);
  const layerCounter = useRef(1);
  const transitionLock = useRef(false);

  useEffect(() => {
    if (!item) return;
    if (item.id === layers[layers.length - 1]?.item?.id) return;
    if (transitionLock.current) return;

    transitionLock.current = true;

    const newId = layerCounter.current++;
    const newBackdrop = item.backdrop_path
      ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
      : null;

    const doTransition = () => {
      // Step 1 — fade out text
      setTextVisible(false);

      // Step 2 — add new image layer on top (invisible)
      setLayers((prev) => [
        ...prev,
        { item, active: false, id: newId },
      ]);

      // Step 3 — fade new layer in after short delay
      setTimeout(() => {
        setLayers((prev) =>
          prev.map((l) =>
            l.id === newId ? { ...l, active: true } : l
          )
        );
      }, 50);

      // Step 4 — update text while it's invisible
      setTimeout(() => {
        setTextItem(item);
        setTextVisible(true);
      }, 300);

      // Step 5 — clean up old layers after transition
      setTimeout(() => {
        setLayers((prev) => prev.filter((l) => l.id === newId));
        transitionLock.current = false;
      }, 700);
    };

    // Preload image first, then transition
    if (newBackdrop) {
      const img = new window.Image();
      img.src = newBackdrop;
      img.onload = doTransition;
      img.onerror = doTransition;
      // Safety fallback after 2s
      const fallback = setTimeout(doTransition, 2000);
      img.onload = () => { clearTimeout(fallback); doTransition(); };
    } else {
      doTransition();
    }
  }, [item]);

  if (!textItem) return null;

  const mediaType = textItem.media_type || (textItem.title ? 'movie' : 'tv');
  const title = textItem.title || textItem.name;
  const overview = textItem.overview?.slice(0, 180) + '...';
  const rating = textItem.vote_average?.toFixed(1);
  const year = (textItem.release_date || textItem.first_air_date || '').slice(0, 4);
  const type = mediaType === 'tv' ? 'TV Show' : 'Movie';

  return (
    <div
      className="relative w-full flex items-end overflow-hidden"
      style={{ height: '85vh' }}
    >
      {/* Stacked image layers — crossfade between them */}
      {layers.map((layer) => {
        const backdrop = layer.item?.backdrop_path
          ? `https://image.tmdb.org/t/p/original${layer.item.backdrop_path}`
          : null;
        return (
          <div
            key={layer.id}
            style={{
              position: 'absolute', inset: 0,
              opacity: layer.active ? 1 : 0,
              transition: 'opacity 0.6s ease-in-out',
              zIndex: layer.id,
            }}
          >
            {backdrop && (
              <Image
                src={backdrop}
                alt={layer.item?.title || layer.item?.name || ''}
                fill
                className="object-cover object-top"
                priority
              />
            )}
          </div>
        );
      })}

      {/* Dark overlay — always on top of images */}
      <div
        className="hero-gradient absolute inset-0"
        style={{ zIndex: 100 }}
      />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '220px', zIndex: 101,
        background: 'linear-gradient(to bottom, transparent, #0d0d1a)',
      }} />

      {/* Text content */}
      <div
        className="relative px-10 pb-24 max-w-2xl"
        style={{
          zIndex: 102,
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? 'translateY(0)' : 'translateY(12px)',
          transition: 'opacity 0.35s ease-in-out, transform 0.35s ease-in-out',
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
            onClick={() => router.push(`/${mediaType}/${textItem.id}`)}
            style={{
              fontSize: '15px', padding: '12px 28px',
              display: 'flex', alignItems: 'center', gap: '8px',
            }}
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
