import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searching, setSearching] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Back to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [router.pathname]);

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!val.trim()) {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(val)}`);
        const data = await res.json();
        const filtered = (data.results || [])
          .filter((i) => i.media_type !== 'person' && (i.poster_path || i.backdrop_path))
          .slice(0, 6);
        setSuggestions(filtered);
        setShowDropdown(true);
      } catch (err) {
        console.error(err);
      } finally {
        setSearching(false);
      }
    }, 350);
  };

  const handleSuggestionClick = (item) => {
    const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
    setShowDropdown(false);
    setQuery('');
    router.push(`/${mediaType}/${item.id}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowDropdown(false);
    router.push(`/search?q=${encodeURIComponent(query)}`);
    setQuery('');
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Movies', href: '/browse?type=movie' },
    { label: 'TV Shows', href: '/browse?type=tv' },
    { label: 'My Watchlist', href: '/watchlist' },
  ];

  const isActive = (href) => {
    if (href === '/') return router.pathname === '/';
    return router.asPath.startsWith(href.split('?')[0]);
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px', height: '64px',
      backgroundColor: scrolled ? 'rgba(13,13,26,0.98)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(124,58,237,0.15)' : 'none',
      transition: 'all 0.4s ease',
    }}>
      {/* Logo */}
      <div onClick={() => router.push('/')}
        style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}>
        <span style={{ fontSize: '24px' }}>🎬</span>
        <span style={{
          fontSize: '22px', fontWeight: '900', letterSpacing: '-0.5px',
          background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>CineVerse</span>
      </div>

      {/* Nav Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {navLinks.map((link) => (
          <button key={link.href} onClick={() => router.push(link.href)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '8px 16px', borderRadius: '8px', fontSize: '14px',
              fontWeight: isActive(link.href) ? '700' : '500',
              color: isActive(link.href) ? '#ffffff' : '#9ca3af',
              backgroundColor: isActive(link.href) ? 'rgba(124,58,237,0.2)' : 'transparent',
              borderBottom: isActive(link.href) ? '2px solid #a855f7' : '2px solid transparent',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isActive(link.href)) {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.backgroundColor = 'rgba(124,58,237,0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive(link.href)) {
                e.currentTarget.style.color = '#9ca3af';
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
          >{link.label}</button>
        ))}
      </div>

      {/* Search + Sign In */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Live Search */}
        <div ref={searchRef} style={{ position: 'relative' }}>
          <form onSubmit={handleSearchSubmit}
            style={{ display: 'flex', alignItems: 'center', gap: '8px',
              backgroundColor: 'rgba(26,26,46,0.9)',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: '10px', padding: '6px 14px',
              transition: 'border-color 0.2s',
            }}>
            <span style={{ color: '#a855f7', fontSize: '14px' }}>🔍</span>
            <input
              type="text"
              value={query}
              onChange={handleQueryChange}
              onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
              placeholder="Search movies, shows..."
              style={{
                background: 'none', border: 'none', outline: 'none',
                color: 'white', fontSize: '13px', width: '200px',
              }}
            />
            {searching && (
              <div style={{
                width: '14px', height: '14px', borderRadius: '50%',
                border: '2px solid rgba(168,85,247,0.3)',
                borderTop: '2px solid #a855f7',
                animation: 'spin 0.7s linear infinite', flexShrink: 0,
              }} />
            )}
          </form>

          {/* Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              width: '380px', backgroundColor: '#12122a',
              border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: '12px', overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
              zIndex: 600,
            }}>
              {suggestions.map((item, i) => {
                const title = item.title || item.name;
                const year = (item.release_date || item.first_air_date || '').slice(0, 4);
                const mediaType = item.media_type || (item.title ? 'movie' : 'tv');
                const rating = item.vote_average?.toFixed(1);
                const poster = item.poster_path
                  ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                  : null;

                return (
                  <div key={item.id}
                    onClick={() => handleSuggestionClick(item)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '10px 14px', cursor: 'pointer',
                      borderBottom: i < suggestions.length - 1
                        ? '1px solid rgba(124,58,237,0.1)' : 'none',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(124,58,237,0.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {/* Poster */}
                    <div style={{
                      width: '42px', height: '60px', borderRadius: '6px',
                      overflow: 'hidden', flexShrink: 0,
                      backgroundColor: '#1a1a2e', position: 'relative',
                    }}>
                      {poster ? (
                        <Image src={poster} alt={title} fill style={{ objectFit: 'cover' }} />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center',
                          justifyContent: 'center', height: '100%', fontSize: '20px' }}>🎬</div>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: 'white', fontWeight: '600', fontSize: '13px',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {title}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                        <span style={{
                          background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
                          padding: '1px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: '700',
                        }}>{mediaType === 'tv' ? 'TV' : 'Movie'}</span>
                        {year && <span style={{ color: '#9ca3af', fontSize: '11px' }}>{year}</span>}
                        {rating && <span style={{ color: '#facc15', fontSize: '11px' }}>⭐ {rating}</span>}
                      </div>
                    </div>

                    {/* Watchlist Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); }}
                      style={{
                        background: 'rgba(124,58,237,0.2)',
                        border: '1px solid rgba(124,58,237,0.3)',
                        color: '#a855f7', borderRadius: '6px',
                        padding: '4px 8px', fontSize: '11px',
                        cursor: 'pointer', flexShrink: 0,
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(124,58,237,0.4)'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(124,58,237,0.2)'}
                    >+ List</button>
                  </div>
                );
              })}

              {/* View All */}
              <div
                onClick={handleSearchSubmit}
                style={{
                  padding: '10px 14px', textAlign: 'center',
                  color: '#a855f7', fontSize: '13px', fontWeight: '600',
                  cursor: 'pointer', backgroundColor: 'rgba(124,58,237,0.08)',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(124,58,237,0.18)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(124,58,237,0.08)'}
              >
                View all results for "{query}" →
              </div>
            </div>
          )}
        </div>

        {/* Sign In */}
        <button
          onClick={() => router.push('/auth')}
          className="btn-primary"
          style={{ padding: '8px 20px', fontSize: '13px', fontWeight: '700', flexShrink: 0 }}
        >
          Sign In
        </button>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </nav>
  );
}
