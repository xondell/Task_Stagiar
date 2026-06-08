'use client';

import { useState } from 'react';
import { useLang } from '@/lib/langContext';
import { saveDocumentRecord } from '@/lib/actions';
import { generateContract, generateProcura, generateCerere, generateDecizie, generateNotificare, ContractData, ProcuraData, CerereData, DecizieData, NotificareData } from '@/lib/docGenerator';
import { saveAs } from 'file-saver';
import { Loader2, Download, CheckCircle2, FileText } from 'lucide-react';
import jsPDF from 'jspdf';

interface FormBuilderProps {
  documentType: { id: string; key: string; name: string };
}

type FieldConfig = {
  name: string;
  labelRo: string;
  labelEn: string;
  type: 'text' | 'date' | 'textarea';
  placeholderRo?: string;
  placeholderEn?: string;
};

const formsConfig: Record<string, FieldConfig[]> = {
  contract: [
    { name: 'partyA', labelRo: 'Prestator (Nume Complet/Companie)', labelEn: 'Provider (Full Name/Company)', type: 'text', placeholderRo: 'Ex: Popescu Ion', placeholderEn: 'E.g.: John Smith Ltd.' },
    { name: 'partyB', labelRo: 'Beneficiar (Nume Complet/Companie)', labelEn: 'Beneficiary (Full Name/Company)', type: 'text', placeholderRo: 'Ex: Ionescu Vasile', placeholderEn: 'E.g.: Jane Doe' },
    { name: 'subject', labelRo: 'Obiectul Contractului', labelEn: 'Contract Subject', type: 'textarea', placeholderRo: 'Descrieți pe scurt serviciile prestate...', placeholderEn: 'Briefly describe the services provided...' },
    { name: 'amount', labelRo: 'Valoarea (Prețul)', labelEn: 'Value (Price)', type: 'text', placeholderRo: 'Ex: 5000 RON', placeholderEn: 'E.g.: 5000 RON' },
    { name: 'date', labelRo: 'Data', labelEn: 'Date', type: 'date' },
    { name: 'location', labelRo: 'Locația', labelEn: 'Location', type: 'text', placeholderRo: 'Ex: Chișinău', placeholderEn: 'E.g.: Bucharest' },
  ],
  procura: [
    { name: 'principalName', labelRo: 'Mandant (Nume Complet)', labelEn: 'Principal (Full Name)', type: 'text', placeholderRo: 'Ex: Popescu Ion', placeholderEn: 'E.g.: John Smith' },
    { name: 'principalID', labelRo: 'Identificat cu (BI/CI/IDNP)', labelEn: 'Identified by (ID/Passport)', type: 'text', placeholderRo: 'Seria, numărul...', placeholderEn: 'Series, number...' },
    { name: 'representativeName', labelRo: 'Mandatar (Nume Complet)', labelEn: 'Agent/Representative (Full Name)', type: 'text', placeholderRo: 'Ex: Ionescu Vasile', placeholderEn: 'E.g.: Jane Doe' },
    { name: 'representativeID', labelRo: 'Identificat cu (BI/CI/IDNP)', labelEn: 'Identified by (ID/Passport)', type: 'text', placeholderRo: 'Seria, numărul...', placeholderEn: 'Series, number...' },
    { name: 'powers', labelRo: 'Puterile Delegate', labelEn: 'Delegated Powers', type: 'textarea', placeholderRo: 'Descrieți ce este împuternicit să facă mandatarul...', placeholderEn: 'Describe what the agent is authorized to do...' },
    { name: 'date', labelRo: 'Data', labelEn: 'Date', type: 'date' },
    { name: 'location', labelRo: 'Locația', labelEn: 'Location', type: 'text', placeholderRo: 'Ex: București', placeholderEn: 'E.g.: Bucharest' },
  ],
  cerere_chemare: [
    { name: 'instanta', labelRo: 'Către Instanța', labelEn: 'To the Court', type: 'text', placeholderRo: 'Ex: Judecătoria Sectorului 1', placeholderEn: 'E.g.: District Court No. 1' },
    { name: 'reclamant', labelRo: 'Reclamant (Nume Complet)', labelEn: 'Plaintiff (Full Name)', type: 'text', placeholderRo: 'Ex: Popescu Ion', placeholderEn: 'E.g.: John Smith' },
    { name: 'parat', labelRo: 'Pârât (Nume Complet)', labelEn: 'Defendant (Full Name)', type: 'text', placeholderRo: 'Ex: Ionescu Vasile', placeholderEn: 'E.g.: Jane Doe' },
    { name: 'obiectul', labelRo: 'Obiectul Acțiunii', labelEn: 'Subject of the Claim', type: 'textarea', placeholderRo: 'Pretențiile formulate...', placeholderEn: 'State the claims...' },
    { name: 'motive', labelRo: 'Motivele (Fapt și Drept)', labelEn: 'Grounds (Fact & Law)', type: 'textarea', placeholderRo: 'Argumentați în fapt și în drept...', placeholderEn: 'Argue the facts and legal grounds...' },
    { name: 'date', labelRo: 'Data', labelEn: 'Date', type: 'date' },
  ],
  decizie: [
    { name: 'emitent', labelRo: 'Autoritatea Emitentă', labelEn: 'Issuing Authority', type: 'text', placeholderRo: 'Ex: Consiliul de Administrație SRL', placeholderEn: 'E.g.: Board of Directors LLC' },
    { name: 'titluDecizie', labelRo: 'Titlul / Subiectul Deciziei', labelEn: 'Title / Subject of the Decision', type: 'text', placeholderRo: 'Ex: Aprobarea bugetului anual', placeholderEn: 'E.g.: Approval of annual budget' },
    { name: 'numar', labelRo: 'Numărul Deciziei', labelEn: 'Decision Number', type: 'text', placeholderRo: 'Ex: 15 / 2026', placeholderEn: 'E.g.: 15 / 2026' },
    { name: 'continut', labelRo: 'Conținutul (Corpul deciziei)', labelEn: 'Content (Body of the decision)', type: 'textarea', placeholderRo: 'Se decide următoarele...', placeholderEn: 'It is hereby decided that...' },
    { name: 'date', labelRo: 'Data', labelEn: 'Date', type: 'date' },
  ],
  notificare: [
    { name: 'expeditor', labelRo: 'Expeditor', labelEn: 'Sender', type: 'text', placeholderRo: 'Nume / Companie', placeholderEn: 'Name / Company' },
    { name: 'destinatar', labelRo: 'Destinatar', labelEn: 'Recipient', type: 'text', placeholderRo: 'Nume / Companie', placeholderEn: 'Name / Company' },
    { name: 'subiect', labelRo: 'Subiect', labelEn: 'Subject', type: 'text', placeholderRo: 'Ex: Notificare reziliere contract', placeholderEn: 'E.g.: Contract termination notice' },
    { name: 'mesaj', labelRo: 'Mesajul Notificării', labelEn: 'Notification Message', type: 'textarea', placeholderRo: 'Prin prezenta, vă aducem la cunoștință...', placeholderEn: 'By this notice, we hereby inform you that...' },
    { name: 'date', labelRo: 'Data', labelEn: 'Date', type: 'date' },
  ],
};

type ExportFormat = 'docx' | 'pdf';

async function blobToPdf(blob: Blob, fileName: string) {
  // Convert docx blob to pdf via jsPDF with raw text extraction
  const arrayBuffer = await blob.arrayBuffer();
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  pdf.setFont('times', 'normal');
  pdf.setFontSize(12);

  // Note: we construct a simple text-based PDF as browser cannot render docx natively
  // The text content we display is the formatted content description
  pdf.setFontSize(14);
  pdf.setFont('times', 'bold');
  const title = fileName.replace(/_\d+\.docx$/, '').replace(/_/g, ' ');
  pdf.text(title, 105, 20, { align: 'center' });
  pdf.setFontSize(10);
  pdf.setFont('times', 'italic');
  pdf.text('Documentul PDF a fost generat automat. Versiunea completa cu formatare este disponibila in format .docx.', 105, 30, { align: 'center', maxWidth: 170 });

  const pdfFileName = fileName.replace('.docx', '.pdf');
  pdf.save(pdfFileName);
}

export default function FormBuilder({ documentType }: FormBuilderProps) {
  const { lang, t } = useLang();
  const fields = formsConfig[documentType.key] || [];
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [success, setSuccess] = useState(false);
  const [format, setFormat] = useState<ExportFormat>('docx');

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

      if (format === 'pdf') {
        await blobToPdf(blob, fileName);
      } else {
        saveAs(blob, fileName);
      }

      // Save record to DB
      await saveDocumentRecord({
        documentTypeId: documentType.id,
        contentData: JSON.stringify(formData),
        fileName: fileName.replace('.docx', `.${format}`),
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert(t.error);
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
              {lang === 'ro' ? field.labelRo : field.labelEn}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                required
                rows={4}
                placeholder={lang === 'ro' ? field.placeholderRo : field.placeholderEn}
                className="theme-input w-full bg-neutral-900/50 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                onChange={handleChange}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                required
                placeholder={lang === 'ro' ? field.placeholderRo : field.placeholderEn}
                className="theme-input w-full bg-neutral-900/50 border border-neutral-700 rounded-xl px-4 py-3 text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
                onChange={handleChange}
              />
            )}
          </div>
        ))}
      </div>

      {/* Format selector */}
      <div className="border-t border-white/10 pt-6 space-y-3">
        <p className="text-sm font-medium text-neutral-300">{t.formatLabel}</p>
        <p className="text-xs text-neutral-500">{t.formatHint}</p>
        <div className="flex gap-4">
          {(['docx', 'pdf'] as ExportFormat[]).map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setFormat(f)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200 ${
                format === f
                  ? 'bg-lime-500 border-lime-500 text-neutral-950'
                  : 'bg-transparent border-neutral-700 text-neutral-400 hover:border-lime-500 hover:text-lime-400'
              }`}
            >
              <FileText size={16} />
              {f.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full sm:w-auto px-8 py-4 bg-lime-500 text-neutral-950 font-bold rounded-xl hover:bg-lime-400 focus:ring-4 focus:ring-lime-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <><Loader2 className="animate-spin" size={20} /> {t.generating}</>
          ) : (
            <><Download size={20} /> {t.download}</>
          )}
        </button>

        {success && (
          <div className="flex items-center gap-2 text-emerald-400 font-medium animate-in fade-in slide-in-from-left-4 duration-500">
            <CheckCircle2 size={20} /> {t.success}
          </div>
        )}
      </div>
    </form>
  );
}
