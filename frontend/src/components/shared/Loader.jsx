const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="relative">
        {/* Brutalist pulsing square */}
        <div 
          className="w-16 h-16 border-4 border-black animate-pulse"
          style={{ animationDuration: '1s' }}
        />
        {/* Secondary rotating square */}
        <div 
          className="absolute top-0 left-0 w-16 h-16 border-4 border-black rotate-45 animate-spin"
          style={{ animationDuration: '2s' }}
        />
        {/* Loading text */}
        <p className="mt-8 text-sm font-bold uppercase tracking-widest text-black text-center">
          Loading
        </p>
      </div>
    </div>
  );
};

export default Loader;
