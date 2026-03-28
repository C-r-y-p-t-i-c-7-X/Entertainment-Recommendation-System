import Image from 'next/image';

export default function MovieCard({ movie }) {
  const title = movie.title || movie.name;
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/no-image.png';
  const rating = movie.vote_average?.toFixed(1);
  const year = (movie.release_date || movie.first_air_date || '').slice(0, 4);

  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
      <div className="relative w-full h-72">
        <Image
          src={poster}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-3">
        <h2 className="text-white font-semibold text-sm truncate">{title}</h2>
        <div className="flex justify-between mt-1 text-xs text-gray-400">
          <span>{year}</span>
          <span>⭐ {rating}</span>
        </div>
      </div>
    </div>
  );
}









