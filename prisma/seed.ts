import { prisma } from '../src/lib/prisma';

async function main() {
  const documentTypes = [
    {
      name: 'Contract',
      description: 'Generare contract standard conform prevederilor CC',
      key: 'contract',
    },
    {
      name: 'Procură',
      description: 'Generare procură de reprezentare',
      key: 'procura',
    },
    {
      name: 'Cerere de chemare în judecată',
      description: 'Generare cerere standard pentru intentarea unei acțiuni civile',
      key: 'cerere_chemare',
    },
    {
      name: 'Decizie (Решение)',
      description: 'Generare decizie sau hotărâre oficială',
      key: 'decizie',
    },
    {
      name: 'Notificare (Уведомление)',
      description: 'Generare preaviz sau notificare oficială',
      key: 'notificare',
    },
  ];

  for (const docType of documentTypes) {
    const existing = await prisma.documentType.findUnique({
      where: { key: docType.key }
    });
    if (!existing) {
      await prisma.documentType.create({ data: docType });
      console.log(`Created document type: ${docType.name}`);
    } else {
      console.log(`Document type already exists: ${docType.name}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
