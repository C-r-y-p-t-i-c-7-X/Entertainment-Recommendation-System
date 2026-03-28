import { useState, useEffect } from 'react';

const GENRES = [
  { id: '', name: 'All Genres' },
  { id: '28', name: 'Action' },
  { id: '12', name: 'Adventure' },
  { id: '16', name: 'Animation' },
  { id: '35', name: 'Comedy' },
  { id: '80', name: 'Crime' },
  { id: '99', name: 'Documentary' },
  { id: '18', name: 'Drama' },
  { id: '10751', name: 'Family' },
  { id: '14', name: 'Fantasy' },
  { id: '36', name: 'History' },
  { id: '27', name: 'Horror' },
  { id: '10402', name: 'Music' },
  { id: '9648', name: 'Mystery' },
  { id: '10749', name: 'Romance' },
  { id: '878', name: 'Sci-Fi' },
  { id: '53', name: 'Thriller' },
  { id: '10752', name: 'War' },
  { id: '37', name: 'Western' },
  { id: '10759', name: 'Action & Adventure (TV)' },
  { id: '10762', name: 'Kids (TV)' },
  { id: '10763', name: 'News (TV)' },
  { id: '10764', name: 'Reality (TV)' },
  { id: '10765', name: 'Sci-Fi & Fantasy (TV)' },
  { id: '10766', name: 'Soap (TV)' },
  { id: '10767', name: 'Talk (TV)' },
  { id: '10768', name: 'War & Politics (TV)' },
];

const COUNTRIES = [
  { code: '', name: 'All Countries' },
  { code: 'US', name: 'USA' },
  { code: 'IN', name: 'India' },
  { code: 'GB', name: 'UK' },
  { code: 'KR', name: 'South Korea' },
  { code: 'JP', name: 'Japan' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'ES', name: 'Spain' },
  { code: 'IT', name: 'Italy' },
  { code: 'CN', name: 'China' },
  { code: 'AU', name: 'Australia' },
  { code: 'CA', name: 'Canada' },
  { code: 'MX', name: 'Mexico' },
  { code: 'BR', name: 'Brazil' },
  { code: 'TH', name: 'Thailand' },
  { code: 'TR', name: 'Turkey' },
];

const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Top Rated' },
  { value: 'released.desc', label: 'Newest Released' },
  { value: 'release_date.asc', label: 'Oldest First' },
  { value: 'upcoming', label: '🔜 Upcoming' },
];

const currentYear = new Date().getFullYear();
const YEARS = ['', ...Array.from({ length: 40 }, (_, i) => String(currentYear - i))];

const selectStyle = {
  backgroundColor: '#1a1a2e',
  color: '#e5e7eb',
  border: '1px solid rgba(124,58,237,0.3)',
  borderRadius: '8px',
  padding: '8px 12px',
  fontSize: '13px',
  cursor: 'pointer',
  outline: 'none',
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23a855f7' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  paddingRight: '28px',
  minWidth: '140px',
};

export default function FilterBar({ onFilterChange, viewMode, onViewModeChange, initialFilters }) {
  const [filters, setFilters] = useState(
      initialFilters || {
        type: '',
        genre: '',
        country: '',
        year: '',
        sort: 'popularity.desc',
      }
    );
  
    // Sync if initialFilters changes (e.g. from URL query)
    useEffect(() => {
      if (initialFilters) {
        setFilters(initialFilters);
      }
    }, [JSON.stringify(initialFilters)]);

  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  const handleReset = () => {
    const reset = { type: '', genre: '', country: '', year: '', sort: 'popularity.desc' };
    setFilters(reset);
    onFilterChange(reset);
  };

  const hasActiveFilters = filters.type || filters.genre || filters.country || filters.year;

  return (
    <div style={{
      backgroundColor: 'rgba(26,26,46,0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(124,58,237,0.2)',
      padding: '16px 32px',
      position: 'sticky',
      top: '64px',
      zIndex: 40,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
      }}>

        {/* Filter Icon */}
        <span style={{ color: '#a855f7', fontSize: '16px', fontWeight: '700', marginRight: '4px' }}>
          🎛 Filters
        </span>

        {/* Type */}
        <select style={selectStyle} value={filters.type} onChange={(e) => handleChange('type', e.target.value)}>
          <option value="">All Types</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>

        {/* Genre */}
        <select style={selectStyle} value={filters.genre} onChange={(e) => handleChange('genre', e.target.value)}>
          {GENRES.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        {/* Country */}
        <select style={selectStyle} value={filters.country} onChange={(e) => handleChange('country', e.target.value)}>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>

        {/* Year */}
        <select style={selectStyle} value={filters.year} onChange={(e) => handleChange('year', e.target.value)}>
          {YEARS.map((y) => (
            <option key={y} value={y}>{y || 'All Years'}</option>
          ))}
        </select>

        {/* Sort */}
        <select style={selectStyle} value={filters.sort} onChange={(e) => handleChange('sort', e.target.value)}>
          {SORT_OPTIONS.map((s) => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            style={{
              backgroundColor: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#f87171',
              padding: '8px 14px',
              borderRadius: '8px',
              fontSize: '12px',
              cursor: 'pointer',
              fontWeight: '600',
            }}
          >
            ✕ Reset
          </button>
        )}

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* View Toggle */}
        <div style={{
          display: 'flex',
          border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: '8px',
          overflow: 'hidden',
        }}>
          {['grid', 'rows'].map((mode) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              style={{
                padding: '8px 14px',
                fontSize: '16px',
                cursor: 'pointer',
                border: 'none',
                backgroundColor: viewMode === mode
                  ? 'rgba(124,58,237,0.6)'
                  : 'transparent',
                color: viewMode === mode ? 'white' : '#9ca3af',
                transition: 'background 0.2s',
              }}
            >
              {mode === 'grid' ? '⊞' : '☰'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
