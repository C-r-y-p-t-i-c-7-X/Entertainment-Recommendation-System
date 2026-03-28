import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';
import MediaRow from './MediaRow';
import SkeletonGrid from './SkeletonGrid';

export default function FilteredResults({ filters, viewMode, onCardClick }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPage(1);
    fetchResults(1, filters);
  }, [filters]);

  const fetchResults = async (pageNum, activeFilters) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        type: activeFilters.type || 'movie',
        page: pageNum,
        sort: activeFilters.sort || 'popularity.desc',
        ...(activeFilters.genre && { genre: activeFilters.genre }),
        ...(activeFilters.country && { country: activeFilters.country }),
        ...(activeFilters.year && { year: activeFilters.year }),
      });
      const res = await fetch(`/api/filter?${params}`);
      const data = await res.json();
      if (pageNum === 1) {
        setResults(data.results || []);
      } else {
        setResults((prev) => [...prev, ...(data.results || [])]);
      }
      setTotalPages(data.total_pages || 1);
    } catch (err) {
      console.error('Filter error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchResults(next, filters);
  };

  const mediaType = filters.type || 'movie';

  if (loading && results.length === 0) return <SkeletonGrid count={12} />;

  if (!loading && results.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '80px', color: '#9ca3af' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎬</div>
        <p style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '8px' }}>No results found</p>
        <p style={{ fontSize: '14px' }}>Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ padding: '20px 32px 8px', color: '#9ca3af', fontSize: '13px' }}>
        Showing <span style={{ color: '#a855f7', fontWeight: '700' }}>{results.length}</span> results
      </div>

      {viewMode === 'grid' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '20px', padding: '16px 32px',
        }}>
          {results.map((item) => (
            <MovieCard
              key={item.id}
              movie={{ ...item, media_type: mediaType }}
              onCardClick={onCardClick}
            />
          ))}
          {loading && Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={`sk-${i}`} />
          ))}
        </div>
      )}

      {viewMode === 'rows' && (
        <div style={{ paddingTop: '16px' }}>
          <MediaRow
            title="Results"
            items={results.map((i) => ({ ...i, media_type: mediaType }))}
            onCardClick={onCardClick}
          />
        </div>
      )}

      {page < totalPages && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '32px' }}>
          <button
            onClick={loadMore}
            disabled={loading}
            className="btn-primary"
            style={{ padding: '12px 40px', fontSize: '14px', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
