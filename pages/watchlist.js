import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

export default function Watchlist() {
  const router = useRouter();

  return (
    <main style={{ backgroundColor: '#0d0d1a', minHeight: '100vh' }}>
      <Navbar />
      <div style={{
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', textAlign: 'center', padding: '40px',
      }}>
        <div style={{ fontSize: '72px', marginBottom: '24px' }}>🎯</div>
        <h1 style={{
          fontSize: '36px', fontWeight: '900', color: 'white',
          marginBottom: '12px',
        }}>
          My Watchlist
        </h1>
        <p style={{ color: '#9ca3af', fontSize: '16px', marginBottom: '32px', maxWidth: '400px' }}>
          Sign in to save movies and TV shows to your personal watchlist and get personalized recommendations.
        </p>
        <button
          className="btn-primary"
          onClick={() => router.push('/auth')}
          style={{ padding: '14px 36px', fontSize: '15px', fontWeight: '700' }}
        >
          Sign In to Continue
        </button>
      </div>
    </main>
  );
}
