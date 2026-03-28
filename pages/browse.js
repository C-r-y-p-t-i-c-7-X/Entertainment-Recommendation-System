import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import FilteredResults from '../components/FilteredResults';
import HeroBanner from '../components/HeroBanner';

export default function Browse({ featured }) {
  const router = useRouter();
  const [heroItem, setHeroItem] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState(null);

  // Pre-set type filter from URL query (?type=movie or ?type=tv)
  useEffect(() => {
    if (router.query.type) {
      setFilters({
        type: router.query.type,
        genre: '',
        country: '',
        year: '',
        sort: 'popularity.desc',
      });
    }
  }, [router.query.type]);

  const handleCardClick = (movie) => {
    setHeroItem(movie);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayHero = heroItem || featured;

  return (
    <main style={{ backgroundColor: '#0d0d1a', minHeight: '100vh' }}>
      <Navbar />
      {displayHero && <HeroBanner item={displayHero} />}
      <FilterBar
        initialFilters={filters}
        onFilterChange={setFilters}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      {filters && (
        <FilteredResults
          filters={filters}
          viewMode={viewMode}
          onCardClick={handleCardClick}
        />
      )}
    </main>
  );
}

export async function getServerSideProps() {
  const headers = {
    Authorization: `Bearer ${process.env.TMDB_BEARER_TOKEN}`,
  };

  const res = await fetch(
    'https://api.themoviedb.org/3/trending/all/week?language=en-US',
    { headers }
  );
  const data = await res.json();
  const featured = data.results?.[0] || null;

  return {
    props: { featured },
  };
}
