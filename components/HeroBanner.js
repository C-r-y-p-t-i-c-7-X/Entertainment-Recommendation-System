import Image from 'next/image';

export default function HeroBanner({ item }) {
  if (!item) return null;

  const title = item.title || item.name;
  const backdrop = item.backdrop_path
    ? `https://image.tmdb.org/t/p/original${item.backdrop_path}`
    : null;
  const overview = item.overview?.slice(0, 150) + '...';
  const rating = item.vote_average?.toFixed(1);
  const year = (item.release_date || item.first_air_date || '').slice(0, 4);
  const type = item.media_type === 'tv' ? 'TV Show' : 'Movie';

  return (
    <div className="relative w-full h-[85vh] flex items-end overflow-hidden">
      {backdrop && (
        <Image
          src={backdrop}
          alt={title}
          fill
          className="object-cover object-top"
          priority
        />
      )}
      <div className="hero-gradient absolute inset-0" />
      <div className="relative z-10 px-10 pb-20 max-w-2xl">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
            {type}
          </span>
          <span className="text-yellow-400 text-sm font-semibold">⭐ {rating}</span>
          <span className="text-gray-400 text-sm">{year}</span>
        </div>
        <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight">
          {title}
        </h1>
        <p className="text-gray-300 text-base mb-6 leading-relaxed">
          {overview}
        </p>
        <div className="flex gap-4">
          <button className="btn-primary">▶ Watch Now</button>
          <button className="btn-secondary">+ Watchlist</button>
        </div>
      </div>
    </div>
  );
}
