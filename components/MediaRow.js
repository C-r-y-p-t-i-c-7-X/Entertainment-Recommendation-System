import MovieCard from './MovieCard';

export default function MediaRow({ title, items, onCardClick }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-white mb-4 px-8 flex items-center gap-2">
        <span className="w-1 h-5 rounded-full inline-block"
          style={{ background: 'linear-gradient(#7c3aed, #a855f7)' }} />
        {title}
      </h2>
      <div className="scroll-row px-8">
        {items.map((item) => (
          <MovieCard
            key={item.id}
            movie={item}
            onCardClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
}
