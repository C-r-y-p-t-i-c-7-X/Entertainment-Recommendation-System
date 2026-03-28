import Navbar from '../components/Navbar';

export default function Auth() {
  return (
    <main style={{ backgroundColor: '#0d0d1a', minHeight: '100vh' }}>
      <Navbar />
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', textAlign: 'center', padding: '40px',
      }}>
        <div style={{ fontSize: '72px', marginBottom: '24px' }}>🔐</div>
        <h1 style={{
          fontSize: '36px', fontWeight: '900', color: 'white',
          marginBottom: '12px',
        }}>
          Welcome to CineVerse
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '32px', maxWidth: '400px' }}>
          Sign in to unlock your watchlist, personalized recommendations, and more.
        </p>
        <div style={{
          backgroundColor: '#1a1a2e',
          border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: '16px', padding: '40px',
          width: '100%', maxWidth: '400px',
        }}>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
            Authentication coming in Step 4 — Firebase Auth
          </p>
          <button
            className="btn-primary"
            style={{ width: '100%', padding: '14px', fontSize: '15px', fontWeight: '700' }}
          >
            🔑 Continue with Google
          </button>
        </div>
      </div>
    </main>
  );
}
