import MovieCard from '../components/MovieCard';

export default function Home({ movies }) {
  return (
    <main className="min-h-screen bg-[#0a0a0a] px-6 py-10">
      <h1 className="text-4xl font-bold text-white mb-8">
        🎬 Entertainment Hub
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/all/week?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
      },
    }
  );
  const data = await res.json();

  return {
    props: {
      movies: data.results || [],
    },
  };
}
