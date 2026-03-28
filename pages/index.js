import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import MediaRow from '../components/MediaRow';

export default function Home({ trending, topRated, tvShows, movies }) {
  const featured = trending?.[0];

  return (
    <main style={{ backgroundColor: '#0d0d1a', minHeight: '100vh' }}>
      <Navbar />
      <HeroBanner item={featured} />
      <div className="pt-8">
        <MediaRow title="🔥 Trending This Week" items={trending} />
        <MediaRow title="⭐ Top Rated Movies" items={topRated} />
        <MediaRow title="📺 Popular TV Shows" items={tvShows} />
        <MediaRow title="🎬 Latest Movies" items={movies} />
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const headers = {
    Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
  };

  const [trendingRes, topRatedRes, tvRes, moviesRes] = await Promise.all([
    fetch('https://api.themoviedb.org/3/trending/all/week?language=en-US', { headers }),
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', { headers }),
    fetch('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1', { headers }),
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', { headers }),
  ]);

  const [trending, topRated, tv, movies] = await Promise.all([
    trendingRes.json(),
    topRatedRes.json(),
    tvRes.json(),
    moviesRes.json(),
  ]);

  return {
    props: {
      trending: trending.results || [],
      topRated: topRated.results || [],
      tvShows: tv.results || [],
      movies: movies.results || [],
    },
  };
}
