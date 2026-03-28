import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Movies', href: '/browse?type=movie' },
    { label: 'TV Shows', href: '/browse?type=tv' },
    { label: 'My Watchlist', href: '/watchlist' },
  ];

  const isActive = (href) => {
    if (href === '/') return router.pathname === '/';
    return router.asPath.startsWith(href);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 40px', height: '64px',
          backgroundColor: scrolled ? 'rgba(13,13,26,0.98)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(124,58,237,0.15)' : 'none',
          transition: 'background-color 0.4s ease, backdrop-filter 0.4s ease, border 0.4s ease',
        }}
      >
        {/* Logo */}
        <div
          onClick={() => router.push('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '24px' }}>🎬</span>
          <span style={{
            fontSize: '22px', fontWeight: '900', letterSpacing: '-0.5px',
            background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            CineVerse
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => router.push(link.href)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '8px 16px', borderRadius: '8px',
                fontSize: '14px', fontWeight: isActive(link.href) ? '700' : '500',
                color: isActive(link.href) ? '#ffffff' : '#9ca3af',
                backgroundColor: isActive(link.href)
                  ? 'rgba(124,58,237,0.2)' : 'transparent',
                borderBottom: isActive(link.href)
                  ? '2px solid #a855f7' : '2px solid transparent',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.href)) {
                  e.target.style.color = '#ffffff';
                  e.target.style.backgroundColor = 'rgba(124,58,237,0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.href)) {
                  e.target.style.color = '#9ca3af';
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Search Button */}
          <button
            onClick={() => router.push('/search')}
            style={{
              background: 'rgba(124,58,237,0.15)',
              border: '1px solid rgba(124,58,237,0.3)',
              color: '#a855f7', borderRadius: '8px',
              padding: '8px 12px', cursor: 'pointer',
              fontSize: '16px', transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(124,58,237,0.3)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(124,58,237,0.15)'}
          >
            🔍
          </button>

          {/* Sign In Button */}
          <button
            onClick={() => router.push('/auth')}
            className="btn-primary"
            style={{ padding: '8px 20px', fontSize: '13px', fontWeight: '700' }}
          >
            Sign In
          </button>
        </div>
      </nav>

      <style>{`
        @media (max-width: 768px) {
          nav { padding: 0 16px !important; }
        }
      `}</style>
    </>
  );
}
