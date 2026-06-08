'use client';
import { getDocumentTypeByKey } from '@/lib/actions';
import { notFound } from 'next/navigation';
import FormBuilder from './FormBuilder';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useLang } from '@/lib/langContext';
import { useEffect, useState } from 'react';

type DocType = { id: string; key: string; name: string; description: string | null };

export default function DocumentPage({ params }: { params: Promise<{ key: string }> }) {
  const { t } = useLang();
  const [docType, setDocType] = useState<DocType | null>(null);
  const [notFound404, setNotFound404] = useState(false);

  useEffect(() => {
    params.then(({ key }) => {
      getDocumentTypeByKey(key).then(result => {
        if (!result) setNotFound404(true);
        else setDocType(result);
      });
    });
  }, [params]);

  if (notFound404) return notFound();
  if (!docType) return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-lime-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="theme-bg min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-lime-500 selection:text-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-12 relative">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-lime-400 transition-colors mb-6 text-sm font-medium tracking-wide uppercase"
          >
            <ArrowLeft size={16} /> {t.back}
          </Link>
          <h1 className="theme-text-main text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            {t.docTypes[docType.key]?.name ?? docType.name}
          </h1>
          <p className="theme-text-muted text-neutral-400 text-lg leading-relaxed">
            {t.docTypes[docType.key]?.description ?? docType.description}
            <br />
            <span className="text-sm mt-2 block">{t.fillForm}</span>
          </p>
        </header>

        <main className="theme-panel bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm transition-colors duration-300">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
          <FormBuilder documentType={docType} />
        </main>
      </div>
    </div>
  );
}
