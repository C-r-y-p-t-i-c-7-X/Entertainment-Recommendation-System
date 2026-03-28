import Image from 'next/image';
import { useState } from 'react';

export default function MovieCard({ movie, onCardClick }) {
  const [hovered, setHovered] = useState(false);

  const title = movie.title || movie.name;
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  const rating = movie.vote_average?.toFixed(1);
  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);
  const type = movie.media_type === 'tv' ? 'TV Show' : 'Movie';

  if (!poster) return null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onCardClick && onCardClick(movie)}
      style={{
        position: 'relative', borderRadius: '12px',
        overflow: 'hidden', cursor: 'pointer',
        transform: hovered ? 'scale(1.06) translateY(-4px)' : 'scale(1) translateY(0)',
        boxShadow: hovered
          ? '0 16px 40px rgba(124,58,237,0.5)'
          : '0 2px 8px rgba(0,0,0,0.4)',
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
        backgroundColor: '#1a1a2e',
        flexShrink: 0, width: '160px',
      }}
    >
      <div style={{ position: 'relative', width: '160px', height: '240px' }}>
        <Image
          src={poster} alt={title} fill
          style={{ objectFit: 'cover' }}
          sizes="160px"
        />
        {/* Gradient overlay always present, stronger on hover */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(13,13,26,0.98) 0%, rgba(13,13,26,0.2) 50%, transparent 100%)',
          opacity: hovered ? 1 : 0.4,
          transition: 'opacity 0.3s ease',
        }} />
      </div>

      {/* Info overlay */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '10px 8px 10px',
        transform: hovered ? 'translateY(0)' : 'translateY(6px)',
        opacity: hovered ? 1 : 0,
        transition: 'all 0.3s ease',
      }}>
        <p style={{
          color: 'white', fontWeight: '700', fontSize: '12px',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          marginBottom: '4px',
        }}>{title}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{
            background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
            padding: '1px 7px', borderRadius: '20px', fontSize: '9px', fontWeight: '700',
          }}>{type}</span>
          <span style={{ color: '#facc15', fontSize: '10px' }}>⭐ {rating}</span>
        </div>
        <p style={{ color: '#9ca3af', fontSize: '10px', marginTop: '2px' }}>{year}</p>
      </div>
    </div>
  );
}
