export default function SkeletonCard() {
  return (
    <div style={{
      width: '160px', flexShrink: 0,
      borderRadius: '12px', overflow: 'hidden',
      backgroundColor: '#1a1a2e',
    }}>
      <div style={{
        width: '160px', height: '240px',
        background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a4e 50%, #1a1a2e 75%)',
        backgroundSize: '200% 100%',
        animation: 'shimmer 1.5s infinite',
      }} />
      <div style={{ padding: '10px' }}>
        <div style={{
          height: '12px', borderRadius: '6px', marginBottom: '8px',
          background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a4e 50%, #1a1a2e 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
        <div style={{
          height: '10px', borderRadius: '6px', width: '60%',
          background: 'linear-gradient(90deg, #1a1a2e 25%, #2a2a4e 50%, #1a1a2e 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }} />
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
