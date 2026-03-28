import Image from 'next/image';
import { useRouter } from 'next/router';

export default function HeroBanner({ item }) {
  const router = useRouter();
  if (!item) return null;

  const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
  const title = item.title || item.name;
  const backdrop = item.backdrop_path
    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
    : null;
  const overview = item.overview?.slice(0, 180) + '...';
  const rating = item.vote_average?.toFixed(1);
  const year = (item.release_date || item.first_air_date || '').slice(0, 4);
  const type = mediaType === 'tv' ? 'TV Show' : 'Movie';

  return (
    <div className="relative w-full flex items-end overflow-hidden"
      style={{ height: '85vh', transition: 'all 0.4s ease' }}>
      {backdrop && (
        <Image
          src={backdrop}
          alt={title}
          fill
          className="object-cover object-top"
          priority
          style={{ transition: 'opacity 0.4s ease' }}
        />
      )}
      <div className="hero-gradient absolute inset-0" />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px',
        background: 'linear-gradient(to bottom, transparent, #0d0d1a)',
      }} />

      <div className="relative z-10 px-10 pb-24 max-w-2xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
            {type}
          </span>
          <span className="text-yellow-400 text-sm font-semibold">⭐ {rating}</span>
          <span className="text-gray-400 text-sm">{year}</span>
        </div>
        <h1 style={{
          fontSize: '52px', fontWeight: '900', color: 'white',
          marginBottom: '16px', lineHeight: '1.1',
          textShadow: '0 2px 20px rgba(0,0,0,0.8)',
          transition: 'all 0.3s ease',
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
            onClick={() => router.push(`/${mediaType}/${item.id}`)}
            style={{ fontSize: '15px', padding: '12px 28px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            ▶ Watch Now
          </button>
          <button className="btn-secondary"
            style={{ fontSize: '15px', padding: '12px 28px' }}>
            + Watchlist
          </button>
        </div>
      </div>
    </div>
  );
}
