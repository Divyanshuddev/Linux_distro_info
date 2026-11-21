import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07070A] text-white flex flex-col items-center justify-center p-6 text-center font-mono">
      <div className="w-12 h-12 rounded-lg bg-[#FF1E44]/20 border border-[#FF1E44] flex items-center justify-center text-[#FF1E44] text-xl font-black mb-4">
        404
      </div>
      <h2 className="text-xl font-bold uppercase tracking-wider">// SECTOR_NOT_FOUND //</h2>
      <p className="text-xs text-slate-400 mt-2 max-w-sm">
        The requested distribution sector does not exist in the current planetary coordinates.
      </p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 rounded-lg bg-[#FF1E44] text-white text-xs font-bold uppercase tracking-wider"
      >
        [RETURN_TO_BASE]
      </Link>
    </div>
  );
}
