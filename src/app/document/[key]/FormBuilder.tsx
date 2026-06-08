'use client';

import { useState } from 'react';
import { saveDocumentRecord } from '@/lib/actions';
import { generateContract, generateProcura, generateCerere, generateDecizie, generateNotificare, ContractData, ProcuraData, CerereData, DecizieData, NotificareData } from '@/lib/docGenerator';
import { saveAs } from 'file-saver';
import { Loader2, Download, CheckCircle2 } from 'lucide-react';

interface FormBuilderProps {
  documentType: { id: string; key: string; name: string };
}

type FieldConfig = {
  name: string;
  label: string;
  type: 'text' | 'date' | 'textarea';
  placeholder?: string;
};

const formsConfig: Record<string, FieldConfig[]> = {
  contract: [
    { name: 'partyA', label: 'Prestator (Nume Complet/Companie)', type: 'text', placeholder: 'Ex: Popescu Ion' },
    { name: 'partyB', label: 'Beneficiar (Nume Complet/Companie)', type: 'text', placeholder: 'Ex: Ionescu Vasile' },
    { name: 'subject', label: 'Obiectul Contractului', type: 'textarea', placeholder: 'Descrieți pe scurt serviciile prestate...' },
    { name: 'amount', label: 'Valoarea (Prețul)', type: 'text', placeholder: 'Ex: 5000 RON' },
    { name: 'date', label: 'Data', type: 'date' },
    { name: 'location', label: 'Locația', type: 'text', placeholder: 'Ex: Chișinău' },
  ],
  procura: [
    { name: 'principalName', label: 'Mandant (Nume Complet)', type: 'text', placeholder: 'Ex: Popescu Ion' },
    { name: 'principalID', label: 'Identificat cu (BI/CI/IDNP)', type: 'text', placeholder: 'Seria, numărul...' },
    { name: 'representativeName', label: 'Mandatar (Nume Complet)', type: 'text', placeholder: 'Ex: Ionescu Vasile' },
    { name: 'representativeID', label: 'Identificat cu (BI/CI/IDNP)', type: 'text', placeholder: 'Seria, numărul...' },
    { name: 'powers', label: 'Puterile Delegate', type: 'textarea', placeholder: 'Descrieți ce este împuternicit să facă mandatarul...' },
    { name: 'date', label: 'Data', type: 'date' },
    { name: 'location', label: 'Locația', type: 'text', placeholder: 'Ex: București' },
  ],
  cerere_chemare: [
    { name: 'instanta', label: 'Către Instanța', type: 'text', placeholder: 'Ex: Judecătoria Sectorului 1' },
    { name: 'reclamant', label: 'Reclamant (Nume Complet)', type: 'text', placeholder: 'Ex: Popescu Ion' },
    { name: 'parat', label: 'Pârât (Nume Complet)', type: 'text', placeholder: 'Ex: Ionescu Vasile' },
    { name: 'obiectul', label: 'Obiectul Acțiunii', type: 'textarea', placeholder: 'Pretențiile formulate...' },
    { name: 'motive', label: 'Motivele (Fapt și Drept)', type: 'textarea', placeholder: 'Argumentați în fapt și în drept...' },
    { name: 'date', label: 'Data', type: 'date' },
  ],
  decizie: [
    { name: 'emitent', label: 'Autoritatea Emitentă', type: 'text', placeholder: 'Ex: Consiliul de Administrație SRL' },
    { name: 'titluDecizie', label: 'Titlul / Subiectul Deciziei', type: 'text', placeholder: 'Ex: Aprobarea bugetului anual' },
    { name: 'numar', label: 'Numărul Deciziei', type: 'text', placeholder: 'Ex: 15 / 2026' },
    { name: 'continut', label: 'Conținutul (Corpul deciziei)', type: 'textarea', placeholder: 'Se decide următoarele...' },
    { name: 'date', label: 'Data', type: 'date' },
  ],
  notificare: [
    { name: 'expeditor', label: 'Expeditor', type: 'text', placeholder: 'Nume / Companie' },
    { name: 'destinatar', label: 'Destinatar', type: 'text', placeholder: 'Nume / Companie' },
    { name: 'subiect', label: 'Subiect', type: 'text', placeholder: 'Ex: Notificare reziliere contract' },
    { name: 'mesaj', label: 'Mesajul Notificării', type: 'textarea', placeholder: 'Prin prezenta, vă aducem la cunoștință...' },
    { name: 'date', label: 'Data', type: 'date' },
  ],
};

export default function FormBuilder({ documentType }: FormBuilderProps) {
  const fields = formsConfig[documentType.key] || [];
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setSuccess(false);

    try {
      let blob: Blob;

      if (documentType.key === 'contract') {
        blob = await generateContract(formData as unknown as ContractData);
      } else if (documentType.key === 'procura') {
        blob = await generateProcura(formData as unknown as ProcuraData);
      } else if (documentType.key === 'cerere_chemare') {
        blob = await generateCerere(formData as unknown as CerereData);
      } else if (documentType.key === 'decizie') {
        blob = await generateDecizie(formData as unknown as DecizieData);
      } else if (documentType.key === 'notificare') {
        blob = await generateNotificare(formData as unknown as NotificareData);
      } else {
        throw new Error('Unknown document type');
      }

      const fileName = `${documentType.name.replace(/\s+/g, '_')}_${Date.now()}.docx`;
      saveAs(blob, fileName);

      // Save record to DB
      await saveDocumentRecord({
        documentTypeId: documentType.id,
        contentData: JSON.stringify(formData),
        fileName,
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert('Eroare la generarea documentului');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
      <div className="grid md:grid-cols-2 gap-6">
        {fields.map((field) => (
          <div key={field.name} className={`space-y-2 ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>
            <label htmlFor={field.name} className="block text-sm font-medium text-neutral-300">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                required
                rows={4}
                placeholder={field.placeholder}
                className="w-full bg-neutral-900/50 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                onChange={handleChange}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                required
                placeholder={field.placeholder}
                className="w-full bg-neutral-900/50 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                onChange={handleChange}
              />
            )}
          </div>
        ))}
      </div>

      <div className="pt-8 flex flex-col sm:flex-row items-center gap-4">
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full sm:w-auto px-8 py-4 bg-lime-500 text-neutral-950 font-bold rounded-xl hover:bg-lime-400 focus:ring-4 focus:ring-lime-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin" size={20} /> Generează...
            </>
          ) : (
            <>
              <Download size={20} /> Descarcă Documentul
            </>
          )}
        </button>

        {success && (
          <div className="flex items-center gap-2 text-emerald-400 font-medium animate-in fade-in slide-in-from-left-4 duration-500">
            <CheckCircle2 size={20} /> generat cu succes!
          </div>
        )}
      </div>
    </form>
  );
}
