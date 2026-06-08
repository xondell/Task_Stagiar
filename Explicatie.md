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

3. Genați structura bazei de date și datele de start (seed):
   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

4. Rulați aplicația:
   ```bash
   npm run dev
   ```

Aplicația va fi disponibilă la `http://localhost:3000`.

## Funcționalități Implementate (Inclusiv Bonusuri)
- **Documente perfect formatate**: Setări adânci de pagină (2cm margini sus/jos, 2.5cm și 1.5cm lateral, font curat Times New Roman 12/14pt, interlinie 1.5, text Justify).
- **Paginare Automată**: Footer generat cu numerotarea paginilor conform normelor.
- **Formulare Dinamice**: Formulare customizate pentru 5 tipuri de documente: 'Contract', 'Procură', 'Cerere', 'Decizie', 'Notificare'.
- **Bază de Date**: Fiecare tip de act este definit în DB, iar documentele completate se salvează sub formă de record-uri JSON.
- **Interfață Bilingvă**: Suport complet pentru Română și Engleză în interfață, configurat local din Navbar.
- **Interfață Premium Adaptabilă**: Design modern cu suport pentru Dark Mode și Light Mode.
- **Exemple pre-generate**: Există 2 fișiere statice extrase în folderul `exemple`.
