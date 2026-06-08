'use server';

import { prisma } from './prisma';

export async function getDocumentTypes() {
  return await prisma.documentType.findMany({
    orderBy: { createdAt: 'asc' },
  });
}

export async function getDocumentTypeByKey(key: string) {
  return await prisma.documentType.findUnique({
    where: { key },
  });
}

export async function saveDocumentRecord(data: {
  documentTypeId: string;
  contentData: string;
  fileName?: string;
}) {
  return await prisma.documentRecord.create({
    data,
  });
}
