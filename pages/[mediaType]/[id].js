import Image from 'next/image';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import MediaRow from '../../components/MediaRow';
import { useState } from 'react';
import Modal from '../../components/Modal';

export default function DetailPage({ details, trailer, cast, providers, similar }) {
  const router = useRouter();
  const [selectedItem, setSelectedItem] = useState(null);

  if (!details) return (
    <div style={{ backgroundColor: '#0d0d1a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'white' }}>Loading...</p>
    </div>
  );

  const title = details.title || details.name;
  const year = (details.release_date || details.first_air_date || '').slice(0, 4);
  const mediaType = details.title ? 'movie' : 'tv';

  return (
    <main style={{ backgroundColor: '#0d0d1a', minHeight: '100vh' }}>
      <Navbar />


      {/* Trailer Section */}
      <div style={{ width: '100%', aspectRatio: '16/9', maxHeight: '75vh', backgroundColor: '#000', position: 'relative', marginTop: '64px' }}>
        {trailer ? (
          <iframe
            width="100%" height="100%"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=0`}
            title="Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ display: 'block', width: '100%', height: '100%', minHeight: '300px' }}
          />
        ) : details.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
            alt={title} fill className="object-cover"
          />
        ) : null}
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Title & Meta */}
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {details.poster_path && (
            <div style={{ flex: '0 0 auto', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(124,58,237,0.4)', position: 'relative', width: '200px', height: '300px' }}>
              <Image
                src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                alt={title} fill className="object-cover"
              />
            </div>
          )}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <span style={{ background: 'linear-gradient(135deg,#7c3aed,#a855f7)', padding: '3px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' }}>
                {mediaType === 'tv' ? 'TV Show' : 'Movie'}
              </span>
              <span style={{ color: '#facc15', fontSize: '14px' }}>⭐ {details.vote_average?.toFixed(1)}</span>
              <span style={{ color: '#9ca3af', fontSize: '14px' }}>{year}</span>
              {details.runtime && <span style={{ color: '#9ca3af', fontSize: '14px' }}>{details.runtime} min</span>}
              {details.number_of_seasons && (
                <span style={{ color: '#9ca3af', fontSize: '14px' }}>{details.number_of_seasons} Seasons</span>
              )}
            </div>
            <h1 style={{ fontSize: '42px', fontWeight: '900', color: 'white', marginBottom: '16px', lineHeight: '1.1' }}>
              {title}
            </h1>
            {details.genres && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                {details.genres.map((g) => (
                  <span key={g.id} style={{ border: '1px solid rgba(168,85,247,0.4)', color: '#c084fc', padding: '3px 14px', borderRadius: '20px', fontSize: '12px' }}>
                    {g.name}
                  </span>
                ))}
              </div>
            )}
            <p style={{ color: '#d1d5db', lineHeight: '1.8', fontSize: '15px', marginBottom: '28px' }}>
              {details.overview}
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button className="btn-primary"
                style={{ fontSize: '15px', padding: '12px 28px' }}>
                + Add to Watchlist
              </button>
              <button className="btn-secondary"
                onClick={() => router.back()}
                style={{ fontSize: '15px', padding: '12px 28px' }}>
                ← Go Back
              </button>
            </div>
          </div>
        </div>

        {/* Streaming Providers */}
        {providers.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#a855f7', fontWeight: '700', fontSize: '20px', marginBottom: '16px' }}>
              🎯 Available On
            </h2>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {providers.map((p) => (
                <div key={p.provider_id} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#1a1a2e', padding: '10px 18px', borderRadius: '12px', border: '1px solid rgba(124,58,237,0.25)' }}>
                  {p.logo_path && (
                    <Image src={`https://image.tmdb.org/t/p/w45${p.logo_path}`}
                      alt={p.provider_name} width={28} height={28}
                      style={{ borderRadius: '6px' }} />
                  )}
                  <span style={{ color: '#e5e7eb', fontSize: '14px', fontWeight: '600' }}>{p.provider_name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ color: '#a855f7', fontWeight: '700', fontSize: '20px', marginBottom: '16px' }}>
              🎭 Cast
            </h2>
            <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px' }}>
              {cast.map((actor) => (
                <div key={actor.id} style={{ flex: '0 0 auto', textAlign: 'center', width: '90px' }}>
                  <div style={{ width: '90px', height: '90px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(124,58,237,0.5)', marginBottom: '8px', position: 'relative', backgroundColor: '#1a1a2e' }}>
                    {actor.profile_path ? (
                      <Image src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                        alt={actor.name} fill className="object-cover" />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '28px' }}>👤</div>
                    )}
                  </div>
                  <p style={{ color: '#e5e7eb', fontSize: '12px', fontWeight: '600' }}>{actor.name}</p>
                  <p style={{ color: '#9ca3af', fontSize: '11px' }}>{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Content */}
        {similar.length > 0 && (
          <div style={{ marginBottom: '40px' }}>
            <MediaRow
              title="✨ You Might Also Like"
              items={similar.map(s => ({ ...s, media_type: mediaType }))}
              onCardClick={setSelectedItem}
              onCardHover={() => {}}
            />
          </div>
        )}
      </div>

      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </main>
  );
}

export async function getServerSideProps({ params }) {
  const { mediaType, id } = params;

  if (!['movie', 'tv'].includes(mediaType)) {
    return { notFound: true };
  }

  const headers = {
    Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
  };

  const [detailRes, videosRes, creditsRes, providersRes, similarRes] = await Promise.all([
    fetch(`https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`, { headers }),
    fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=en-US`, { headers }),
    fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/credits?language=en-US`, { headers }),
    fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/watch/providers`, { headers }),
    fetch(`https://api.themoviedb.org/3/${mediaType}/${id}/similar?language=en-US&page=1`, { headers }),
  ]);

  const [details, videos, credits, providersData, similarData] = await Promise.all([
    detailRes.json(),
    videosRes.json(),
    creditsRes.json(),
    providersRes.json(),
    similarRes.json(),
  ]);

  const trailer = videos.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  ) || null;

  const providers =
    providersData.results?.IN?.flatrate ||
    providersData.results?.US?.flatrate ||
    [];

  return {
    props: {
      details,
      trailer,
      cast: credits.cast?.slice(0, 12) || [],
      providers,
      similar: similarData.results?.slice(0, 15) || [],
    },
  };
}
