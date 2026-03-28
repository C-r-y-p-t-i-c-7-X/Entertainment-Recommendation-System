import { useRouter } from 'next/router';

export default function Footer() {
  const router = useRouter();

  return (
    <footer style={{
      backgroundColor: '#0a0a18',
      borderTop: '1px solid rgba(124,58,237,0.15)',
      padding: '48px 40px 32px',
      marginTop: '60px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '60px', flexWrap: 'wrap', marginBottom: '40px' }}>

          {/* Brand */}
          <div style={{ flex: '1', minWidth: '200px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span style={{ fontSize: '24px' }}>🎬</span>
              <span style={{
                fontSize: '22px', fontWeight: '900',
                background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>CineVerse</span>
            </div>
            <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: '1.7', maxWidth: '260px' }}>
              Your ultimate entertainment discovery hub. Find movies, TV shows, and web series all in one place.
            </p>
          </div>

          {/* Navigation */}
          <div style={{ minWidth: '140px' }}>
            <h4 style={{ color: '#a855f7', fontWeight: '700', fontSize: '13px',
              marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Browse
            </h4>
            {[
              { label: 'Home', href: '/' },
              { label: 'Movies', href: '/browse?type=movie' },
              { label: 'TV Shows', href: '/browse?type=tv' },
              { label: 'My Watchlist', href: '/watchlist' },
            ].map((link) => (
              <p key={link.href}
                onClick={() => router.push(link.href)}
                style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '10px',
                  cursor: 'pointer', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = '#ffffff'}
                onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
              >{link.label}</p>
            ))}
          </div>

          {/* Data Source */}
          <div style={{ minWidth: '160px' }}>
            <h4 style={{ color: '#a855f7', fontWeight: '700', fontSize: '13px',
              marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Data Source
            </h4>
            <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: '1.7' }}>
              Movie and TV data provided by
            </p>
            <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer"
              style={{ color: '#a855f7', fontSize: '13px', fontWeight: '600',
                textDecoration: 'none', display: 'inline-block', marginTop: '4px' }}>
              🎥 TMDB API →
            </a>
          </div>

          {/* Project Info */}
          <div style={{ minWidth: '160px' }}>
            <h4 style={{ color: '#a855f7', fontWeight: '700', fontSize: '13px',
              marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Project
            </h4>
            <p style={{ color: '#9ca3af', fontSize: '13px', lineHeight: '1.7' }}>
              Built with Next.js, FastAPI, Firebase & TMDB API as an academic project.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(124,58,237,0.1)',
          paddingTop: '24px', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px',
        }}>
          <p style={{ color: '#4b5563', fontSize: '12px' }}>
            © {new Date().getFullYear()} CineVerse. Built for academic purposes.
          </p>
          <p style={{ color: '#4b5563', fontSize: '12px' }}>
            Data © <a href="https://www.themoviedb.org" target="_blank" rel="noopener noreferrer"
              style={{ color: '#7c3aed', textDecoration: 'none' }}>TMDB</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
