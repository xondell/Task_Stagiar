import { getDocumentTypeByKey } from '@/lib/actions';
import { notFound } from 'next/navigation';
import FormBuilder from './FormBuilder';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function DocumentPage({ params }: { params: { key: string } }) {
  // Await the params before using its properties
  const { key } = await params;
  
  const docType = await getDocumentTypeByKey(key);
  
  if (!docType) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-lime-500 selection:text-black">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-12 relative">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-lime-400 transition-colors mb-6 text-sm font-medium tracking-wide uppercase"
          >
            <ArrowLeft size={16} /> Înapoi
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            {docType.name}
          </h1>
          <p className="text-neutral-400 text-lg leading-relaxed">
            {docType.description}
            <br />
            <span className="text-sm mt-2 block">
              Completați câmpurile de mai jos pentru a genera automat un document respectând formatul impus.
            </span>
          </p>
        </header>

        <main className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/5 rounded-full blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2" />
          <FormBuilder documentType={docType} />
        </main>
      </div>
    </div>
  );
}
