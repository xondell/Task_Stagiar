'use client';
import Link from 'next/link';
import { useLang } from '@/lib/langContext';
import { useTheme } from '@/lib/themeContext';
import { Globe, Sun, Moon } from 'lucide-react';

export default function NavBar() {
  const { t, toggle, lang } = useLang();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="theme-nav sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-white/5 px-6 py-3 flex items-center justify-between transition-colors duration-300">
      <Link href="/" className="text-xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">
        {t.appName}
      </Link>
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="theme-format-btn flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-neutral-400 hover:text-lime-400 hover:border-lime-500 transition-all duration-200 text-sm font-semibold"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        {/* Language toggle */}
        <button
          onClick={toggle}
          className="theme-format-btn flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-neutral-400 hover:text-lime-400 hover:border-lime-500 transition-all duration-200 text-sm font-semibold"
          aria-label="Toggle language"
        >
          <Globe size={15} />
          {lang === 'ro' ? 'EN' : 'RO'}
        </button>
      </div>
    </nav>
  );
}
