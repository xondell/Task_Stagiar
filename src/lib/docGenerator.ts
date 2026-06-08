import { Document, Packer, Paragraph, TextRun, AlignmentType, convertInchesToTwip, HeadingLevel, Footer, PageNumber } from 'docx';

export interface ContractData {
  partyA: string;
  partyB: string;
  subject: string;
  amount: string;
  date: string;
  location: string;
}

export interface ProcuraData {
  principalName: string;
  principalID: string;
  representativeName: string;
  representativeID: string;
  powers: string;
  date: string;
  location: string;
}

export interface CerereData {
  reclamant: string;
  parat: string;
  instanta: string;
  obiectul: string;
  motive: string;
  date: string;
}

export interface DecizieData {
  emitent: string;
  titluDecizie: string;
  numar: string;
  continut: string;
  date: string;
}

export interface NotificareData {
  expeditor: string;
  destinatar: string;
  subiect: string;
  mesaj: string;
  date: string;
}

function createBaseDocument(children: any[]) {
  return new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Times New Roman',
            size: 24, // 12pt (half-points)
          },
          paragraph: {
            alignment: AlignmentType.JUSTIFIED,
            spacing: {
              line: 360, // 1.5 line spacing (240 is single, 360 is 1.5, 480 is double)
            },
          },
        },
        heading1: {
          run: {
            font: 'Times New Roman',
            size: 28, // 14pt
            bold: true,
          },
          paragraph: {
            alignment: AlignmentType.CENTER,
            spacing: {
              after: 240,
            },
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.79), // ~2cm
              bottom: convertInchesToTwip(0.79), // ~2cm
              left: convertInchesToTwip(0.98), // ~2.5cm
              right: convertInchesToTwip(0.59), // ~1.5cm
            },
            size: {
              // A4 dimensions
              width: 11906,
              height: 16838,
            },
          },
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun("- "),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                  }),
                  new TextRun(" -"),
                ],
              }),
            ],
          }),
        },
        children,
      },
    ],
  });
}

function createIndentedParagraph(text: string) {
  return new Paragraph({
    children: [new TextRun(text)],
    indent: {
      firstLine: convertInchesToTwip(0.49), // ~1.25cm
    },
  });
}

export async function generateContract(data: ContractData): Promise<Blob> {
  const doc = createBaseDocument([
    new Paragraph({
      text: 'CONTRACT DE PRESTĂRI SERVICII',
      heading: HeadingLevel.HEADING_1,
    }),
    createIndentedParagraph(`Încheiat astăzi, ${data.date}, în ${data.location}.`),
    new Paragraph({ text: '' }),
    createIndentedParagraph(`Subsemnatul/a ${data.partyA}, în calitate de Prestator, și subsemnatul/a ${data.partyB}, în calitate de Beneficiar, am convenit următoarele:`),
    new Paragraph({ text: '' }),
    new Paragraph({ children: [new TextRun({ text: '1. Obiectul contractului', bold: true })] }),
    createIndentedParagraph(data.subject),
    new Paragraph({ text: '' }),
    new Paragraph({ children: [new TextRun({ text: '2. Valoarea', bold: true })] }),
    createIndentedParagraph(`Suma convenită pentru prestarea acestor servicii este de ${data.amount}.`),
    new Paragraph({ text: '' }),
    new Paragraph({ text: 'Semnături:', alignment: AlignmentType.CENTER }),
    new Paragraph({ text: '' }),
    new Paragraph({ text: `Prestator: ${data.partyA}                               Beneficiar: ${data.partyB}` }),
  ]);

  return Packer.toBlob(doc);
}

export async function generateProcura(data: ProcuraData): Promise<Blob> {
  const doc = createBaseDocument([
    new Paragraph({
      text: 'PROCURĂ',
      heading: HeadingLevel.HEADING_1,
    }),
    createIndentedParagraph(`Subsemnatul/a ${data.principalName}, identificat(ă) cu ${data.principalID}, prin prezenta împuternicesc pe ${data.representativeName}, identificat(ă) cu ${data.representativeID}, să mă reprezinte și să acționeze în numele meu cu puteri depline în următoarele chestiuni:`),
    new Paragraph({ text: '' }),
    createIndentedParagraph(data.powers),
    new Paragraph({ text: '' }),
    createIndentedParagraph(`Această procură a fost redactată la data de ${data.date}, în ${data.location}.`),
    new Paragraph({ text: '' }),
    new Paragraph({ text: 'Semnătura Mandantului:' }),
    new Paragraph({ text: `________________________` }),
    new Paragraph({ text: data.principalName }),
  ]);

  return Packer.toBlob(doc);
}

export async function generateCerere(data: CerereData): Promise<Blob> {
  const doc = createBaseDocument([
    new Paragraph({
      text: ` CĂTRE: ${data.instanta.toUpperCase()}`,
      alignment: AlignmentType.RIGHT,
    }),
    new Paragraph({ text: '' }),
    new Paragraph({
      text: 'CERERE DE CHEMARE ÎN JUDECATĂ',
      heading: HeadingLevel.HEADING_1,
    }),
    createIndentedParagraph(`Subsemnatul/a ${data.reclamant}, în calitate de Reclamant, solicit chemarea în judecată a pârâtului/ei ${data.parat}.`),
    new Paragraph({ text: '' }),
    new Paragraph({ children: [new TextRun({ text: 'Obiectul acțiunii:', bold: true })] }),
    createIndentedParagraph(data.obiectul),
    new Paragraph({ text: '' }),
    new Paragraph({ children: [new TextRun({ text: 'Motivele de fapt și de drept:', bold: true })] }),
    createIndentedParagraph(data.motive),
    new Paragraph({ text: '' }),
    new Paragraph({ children: [new TextRun({ text: `Data: ${data.date}`, bold: true })] }),
    new Paragraph({ text: '' }),
    new Paragraph({ text: 'Semnătura Reclamantului:' }),
    new Paragraph({ text: `________________________` }),
  ]);

  return Packer.toBlob(doc);
}

export interface DecizieData {
  emitent: string;
  titluDecizie: string;
  numar: string;
  continut: string;
  date: string;
}

export interface NotificareData {
  expeditor: string;
  destinatar: string;
  subiect: string;
  mesaj: string;
  date: string;
}

export async function generateDecizie(data: DecizieData): Promise<Blob> {
  const doc = createBaseDocument([
    new Paragraph({
      text: data.emitent.toUpperCase(),
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.HEADING_1,
    }),
    new Paragraph({ text: '' }),
    new Paragraph({
      text: `DECIZIA nr. ${data.numar}`,
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.HEADING_1,
    }),
    new Paragraph({
      text: `din data de ${data.date}`,
      alignment: AlignmentType.CENTER,
    }),
    new Paragraph({ text: '' }),
    new Paragraph({ children: [new TextRun({ text: 'Privind:', bold: true })] }),
    createIndentedParagraph(data.titluDecizie),
    new Paragraph({ text: '' }),
    new Paragraph({ children: [new TextRun({ text: 'DECIDE:', bold: true })] }),
    createIndentedParagraph(data.continut),
    new Paragraph({ text: '' }),
    new Paragraph({ text: 'Semnătura Autorității Emitente:' }),
    new Paragraph({ text: `________________________` }),
  ]);

  return Packer.toBlob(doc);
}

export async function generateNotificare(data: NotificareData): Promise<Blob> {
  const doc = createBaseDocument([
    new Paragraph({
      text: 'NOTIFICARE / PREAVIZ',
      alignment: AlignmentType.CENTER,
      heading: HeadingLevel.HEADING_1,
    }),
    new Paragraph({ text: '' }),
    new Paragraph({ children: [new TextRun({ text: `Către: ${data.destinatar}`, bold: true })] }),
    new Paragraph({ children: [new TextRun({ text: `De la: ${data.expeditor}`, bold: true })] }),
    new Paragraph({ children: [new TextRun({ text: `Data: ${data.date}`, bold: true })] }),
    new Paragraph({ children: [new TextRun({ text: `Subiect: ${data.subiect}`, bold: true })] }),
    new Paragraph({ text: '' }),
    createIndentedParagraph(data.mesaj),
    new Paragraph({ text: '' }),
    new Paragraph({ text: 'Semnătura Expeditorului:' }),
    new Paragraph({ text: `________________________` }),
  ]);

  return Packer.toBlob(doc);
}
