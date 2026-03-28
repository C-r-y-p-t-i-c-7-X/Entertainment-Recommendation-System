import Image from 'next/image';

export default function MovieCard({ movie }) {
  const title = movie.title || movie.name;
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  const rating = movie.vote_average?.toFixed(1);
  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);
  const type = movie.media_type === 'tv' ? 'TV Show' : 'Movie';

  if (!poster) return null;

  return (
    <div className="media-card">
      <div className="relative w-40 h-60">
        <Image
          src={poster}
          alt={title}
          fill
          className="object-cover"
          sizes="160px"
        />
      </div>
      <div className="overlay">
        <p className="text-white text-xs font-bold truncate">{title}</p>
        <div className="flex justify-between mt-1">
          <span className="text-purple-400 text-xs">{type}</span>
          <span className="text-yellow-400 text-xs">⭐ {rating}</span>
        </div>
        <p className="text-gray-400 text-xs mt-1">{year}</p>
      </div>
    </div>
  );
}
