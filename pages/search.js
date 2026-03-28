import { useState } from 'react';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import { useRouter } from 'next/router';

export default function Search() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (movie) => {
    const mediaType = movie.media_type || (movie.title ? 'movie' : 'tv');
    router.push(`/${mediaType}/${movie.id}`);
  };

  return (
    <main style={{ backgroundColor: '#0d0d1a', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ paddingTop: '100px', paddingBottom: '60px', maxWidth: '1100px', margin: '0 auto', padding: '100px 32px 60px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'white', marginBottom: '32px' }}>
          🔍 Search
        </h1>

        {/* Search Input */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', marginBottom: '40px' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, TV shows, web series..."
            style={{
              flex: 1, backgroundColor: '#1a1a2e',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: '10px', padding: '14px 20px',
              color: 'white', fontSize: '15px', outline: 'none',
            }}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '14px 28px', fontSize: '15px', fontWeight: '700' }}
          >
            Search
          </button>
        </form>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#9ca3af' }}>
            Searching...
          </div>
        )}

        {/* No Results */}
        {!loading && searched && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎬</div>
            <p style={{ color: 'white', fontSize: '18px', fontWeight: '600' }}>No results found</p>
            <p style={{ color: '#9ca3af', marginTop: '8px' }}>Try a different search term</p>
          </div>
        )}

        {/* Results Grid */}
        {!loading && results.length > 0 && (
          <>
            <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '20px' }}>
              Found <span style={{ color: '#a855f7', fontWeight: '700' }}>{results.length}</span> results for "{query}"
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: '20px',
            }}>
              {results.map((item) => (
                <MovieCard
                  key={item.id}
                  movie={item}
                  onCardClick={handleCardClick}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
