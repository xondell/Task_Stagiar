# Explicatie Proiect - LegalAct

Această aplicație este soluția mea pentru proba tehnică. A fost construită folosind un stack modern de tehnologii pentru a asigura stabilitate, viteză și o interfață premium.

## Stack Tehnologic
- **Frontend/Backend:** Next.js (App Router, React 19)
- **Bază de date:** SQLite
- **ORM:** Prisma (v5 pentru stabilitate garantată cu SQLite)
- **Styling:** Tailwind CSS (cu animații și design dark-mode/glassmorphism modern)
- **Generare Documente:** `docx` (Pachet performant care funcționează perfect și la nivel de client, respectând exact formatele juridice).

## Mod de Rulare

1. Asigurați-vă că folosiți o versiune recentă de Node.js (ex: 20+ sau 22).

2. Instalați dependențele:
   ```bash
   npm install
   ```

3. (Opțional) Resetați baza de date integrată și rulați seed-urile din nou (sunt deja create 3 tipuri):
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

4. Rulați aplicația:
   ```bash
   npm run dev
   ```

Aplicația va fi disponibilă la `http://localhost:3000`.

## Funcționalități Implementate
- **Documente perfect formatate**: Setări adânci de pagină (2cm margini sus/jos, 2.5cm și 1.5cm lateral, font curat Times New Roman 12/14pt, interlinie 1.5, text Justify).
- **Formulare Dinamice**: Formulare customizate pentru 'Contract', 'Procură', și 'Cerere'.
- **Bază de Date**: Fiecare tip de act est definit în DB, iar documentele completate se salvează sub formă de record-uri JSON.
- **Interfață Premium**: Design modern "Lime/Dark" conceput pentru UX rapid.
- **Exemple pre-generate**: Există 2 fișiere statice generate ca bonus în folderul `exemple`.
