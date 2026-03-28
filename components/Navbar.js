export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
      style={{
        background: 'linear-gradient(to bottom, rgba(13,13,26,0.95), transparent)',
        backdropFilter: 'blur(8px)',
      }}>
      <div className="flex items-center gap-3">
        <span className="text-2xl">🎬</span>
        <span className="text-xl font-bold"
          style={{ background: 'linear-gradient(135deg, #a855f7, #7c3aed)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          CineVerse
        </span>
      </div>
      <div className="flex items-center gap-6 text-sm text-gray-300">
        <span className="hover:text-white cursor-pointer transition-colors">Home</span>
        <span className="hover:text-white cursor-pointer transition-colors">Movies</span>
        <span className="hover:text-white cursor-pointer transition-colors">TV Shows</span>
        <span className="hover:text-white cursor-pointer transition-colors">My Watchlist</span>
      </div>
    </nav>
  );
}
