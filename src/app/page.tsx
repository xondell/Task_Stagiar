'use client';
import { getDocumentTypes } from '../lib/actions';
import Link from 'next/link';
import { FileText, ArrowRight } from 'lucide-react';
import { useLang } from '@/lib/langContext';
import { useEffect, useState } from 'react';

type DocType = { id: string; key: string; name: string; description: string | null };

export default function Home() {
  const { t } = useLang();
  const [documentTypes, setDocumentTypes] = useState<DocType[]>([]);

  useEffect(() => {
    getDocumentTypes().then(setDocumentTypes);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-lime-500 selection:text-black">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <header className="mb-20 text-center space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 drop-shadow-sm">
            {t.appName}
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto font-light leading-relaxed">
            {t.tagline}
          </p>
        </header>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documentTypes.map((doc: DocType) => (
            <Link
              href={`/document/${doc.key}`}
              key={doc.id}
              className="group relative rounded-3xl bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-lime-500/20 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-lime-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10 flex flex-col h-full space-y-5">
                <div className="h-14 w-14 rounded-2xl bg-white/5 flex items-center justify-center text-lime-400 group-hover:scale-110 group-hover:bg-lime-400 group-hover:text-neutral-950 transition-all duration-300 shadow-inner">
                  <FileText strokeWidth={1.5} size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-lime-300 transition-colors">{doc.name}</h3>
                <p className="text-neutral-400 text-sm flex-grow leading-relaxed">{doc.description}</p>
                <div className="flex items-center text-lime-400 font-medium text-sm pt-4 uppercase tracking-wider">
                  <span className="flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                    {t.generate} <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
