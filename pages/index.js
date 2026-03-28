import { useState } from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import MediaRow from '../components/MediaRow';
import FilterBar from '../components/FilterBar';
import FilteredResults from '../components/FilteredResults';

export default function Home({ trending, topRated, tvShows, movies }) {
  const [heroItem, setHeroItem] = useState(null);
  const [filters, setFilters] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  const featured = heroItem || trending?.[0];
  const isFiltering = filters && (
    filters.type || filters.genre || filters.country ||
    filters.year || filters.sort !== 'popularity.desc'
  );

  const handleCardClick = (movie) => {
    setHeroItem(movie);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <main style={{ backgroundColor: '#0d0d1a', minHeight: '100vh' }}>
      <Navbar />
      <HeroBanner item={featured} />
      <FilterBar
        onFilterChange={handleFilterChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {isFiltering ? (
        <FilteredResults
          filters={filters}
          viewMode={viewMode}
          onCardClick={handleCardClick}
        />
      ) : (
        <div className="pt-8">
          <MediaRow
            title="🔥 Trending This Week"
            items={trending}
            onCardClick={handleCardClick}
          />
          <MediaRow
            title="⭐ Top Rated Movies"
            items={topRated}
            onCardClick={handleCardClick}
          />
          <MediaRow
            title="📺 Popular TV Shows"
            items={tvShows}
            onCardClick={handleCardClick}
          />
          <MediaRow
            title="🎬 Latest Movies"
            items={movies}
            onCardClick={handleCardClick}
          />
        </div>
      )}
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
