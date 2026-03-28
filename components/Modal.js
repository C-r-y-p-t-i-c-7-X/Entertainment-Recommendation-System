import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Modal({ item, onClose }) {
  const [details, setDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [providers, setProviders] = useState([]);
  const router = useRouter();

  const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
  const title = item.title || item.name;

  useEffect(() => {
    if (!item) return;

    const fetchData = async () => {
      const [detailRes, videosRes, creditsRes, providersRes] = await Promise.all([
        fetch(`/api/details?id=${item.id}&type=${mediaType}`),
        fetch(`/api/videos?id=${item.id}&type=${mediaType}`),
        fetch(`/api/credits?id=${item.id}&type=${mediaType}`),
        fetch(`/api/providers?id=${item.id}&type=${mediaType}`),
      ]);

      const [detailData, videosData, creditsData, providersData] = await Promise.all([
        detailRes.json(),
        videosRes.json(),
        creditsRes.json(),
        providersRes.json(),
      ]);

      setDetails(detailData);

      const ytTrailer = videosData.results?.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      );
      setTrailer(ytTrailer || null);
      setCast(creditsData.cast?.slice(0, 8) || []);

      const indiaProviders =
        providersData.results?.IN?.flatrate ||
        providersData.results?.US?.flatrate ||
        [];
      setProviders(indiaProviders);
    };

    fetchData();
  }, [item, mediaType]);

  // Close on backdrop click
  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        backgroundColor: 'rgba(0,0,0,0.85)',
        backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '16px',
      }}
    >
      <div style={{
        backgroundColor: '#12122a',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '820px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        border: '1px solid rgba(124,58,237,0.3)',
        boxShadow: '0 0 60px rgba(124,58,237,0.2)',
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '12px', right: '12px',
            zIndex: 10, background: 'rgba(0,0,0,0.6)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white', borderRadius: '50%',
            width: '36px', height: '36px',
            fontSize: '18px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >✕</button>

        {/* Trailer or Backdrop */}
        <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#0a0a1a', borderRadius: '16px 16px 0 0', overflow: 'hidden' }}>
          {trailer ? (
            <iframe
              width="100%" height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
              title="Trailer"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              style={{ display: 'block' }}
            />
          ) : item.backdrop_path ? (
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <Image
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt={title} fill
                className="object-cover"
              />
            </div>
          ) : null}
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Title & Meta */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '26px', fontWeight: '800', color: 'white', marginBottom: '8px' }}>{title}</h2>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', padding: '2px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                  {mediaType === 'tv' ? 'TV Show' : 'Movie'}
                </span>
                <span style={{ color: '#facc15', fontSize: '13px' }}>⭐ {item.vote_average?.toFixed(1)}</span>
                <span style={{ color: '#9ca3af', fontSize: '13px' }}>
                  {(item.release_date || item.first_air_date || '').slice(0, 4)}
                </span>
                {details?.runtime && (
                  <span style={{ color: '#9ca3af', fontSize: '13px' }}>{details.runtime} min</span>
                )}
              </div>
            </div>

            {/* Watchlist Button */}
            <button className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
              + Add to Watchlist
            </button>
          </div>

          {/* Genres */}
          {details?.genres && (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px' }}>
              {details.genres.map((g) => (
                <span key={g.id} style={{
                  border: '1px solid rgba(168,85,247,0.4)',
                  color: '#c084fc', padding: '2px 12px',
                  borderRadius: '20px', fontSize: '12px',
                }}>
                  {g.name}
                </span>
              ))}
            </div>
          )}

          {/* Synopsis */}
          <div style={{ marginTop: '20px' }}>
            <h3 style={{ color: '#a855f7', fontWeight: '700', marginBottom: '8px' }}>Synopsis</h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.7', fontSize: '14px' }}>{item.overview}</p>
          </div>

          {/* Cast */}
          {cast.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ color: '#a855f7', fontWeight: '700', marginBottom: '12px' }}>Cast</h3>
              <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                {cast.map((actor) => (
                  <div key={actor.id} style={{ flex: '0 0 auto', textAlign: 'center', width: '72px' }}>
                    <div style={{ width: '72px', height: '72px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(124,58,237,0.5)', marginBottom: '6px', position: 'relative', backgroundColor: '#1a1a2e' }}>
                      {actor.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name} fill
                          className="object-cover"
                        />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '24px' }}>👤</div>
                      )}
                    </div>
                    <p style={{ color: '#e5e7eb', fontSize: '11px', fontWeight: '600' }}>{actor.name}</p>
                    <p style={{ color: '#9ca3af', fontSize: '10px' }}>{actor.character}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Streaming Providers */}
          {providers.length > 0 && (
            <div style={{ marginTop: '24px' }}>
              <h3 style={{ color: '#a855f7', fontWeight: '700', marginBottom: '12px' }}>Available On</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {providers.map((p) => (
                  <div key={p.provider_id} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#1a1a2e', padding: '8px 14px', borderRadius: '10px', border: '1px solid rgba(124,58,237,0.2)' }}>
                    {p.logo_path && (
                      <Image
                        src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                        alt={p.provider_name}
                        width={24} height={24}
                        style={{ borderRadius: '6px' }}
                      />
                    )}
                    <span style={{ color: '#e5e7eb', fontSize: '13px', fontWeight: '600' }}>{p.provider_name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* More Details Button */}
          <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              className="btn-secondary"
              onClick={() => { onClose(); router.push(`/${mediaType}/${item.id}`); }}
            >
              More Details →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
