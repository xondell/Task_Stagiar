<div align="center">

# ⚖️ Task Stagiar

### Probă tehnică full-stack — generator automat de acte juridice

Un brief de internship pentru construirea unei aplicații care transformă datele introduse de utilizator într-un **act juridic complet formatat și exportabil**.

</div>

---

## Obiectiv

Candidatul trebuie să construiască un flux complet:

```text
Selectează tipul actului
          ↓
Introduce datele
          ↓
Backend-ul validează și structurează
          ↓
Aplicația generează documentul
          ↓
Utilizatorul descarcă rezultatul final
```

Rezultatul așteptat este un document real, tehnoredactat automat — nu doar un formular sau o listă de instrucțiuni.

## Cerințe obligatorii

### 1. Minimum două tipuri de acte

Exemple:

- cerere de chemare în judecată;
- contract;
- procură;
- plângere;
- decizie;
- notificare.

### 2. Introducerea datelor

Poate fi realizată prin:

- câmpuri structurate;
- text liber;
- combinație dintre cele două.

Date tipice:

```text
părți · obiect · temei · conținut · dată · semnături
```

### 3. Generare automată

Aplicația trebuie să aplice singură regulile de tehnoredactare.

### 4. Export

Minimum un format:

- `.docx`
- `.pdf`

## Baseline de tehnoredactare

| Element | Cerință |
|---|---|
| Pagină | A4, portret |
| Margini | ~2 cm sus/jos, 2.5–3 cm stânga, ~1.5 cm dreapta |
| Font | Times New Roman sau echivalent coerent |
| Corp | ~12 pt |
| Titlu | ~14 pt |
| Aliniere | `justify` |
| Interlinie | 1.5 |
| Paragrafe | indentare consecventă |
| Structură | numerotare automată unde este necesar |
| Footer | numerotarea paginilor |
| Final | dată, loc și bloc de semnătură |

> Criteriul principal: rezultatul trebuie să rămână coerent indiferent de conținutul introdus.

## Cerințe tehnice

Proiectul trebuie să includă:

- frontend;
- backend;
- bază de date.

Stack-ul este la alegerea candidatului.

## Bonus

- preview live;
- validări;
- șabloane reutilizabile;
- salvarea actelor;
- editarea formatării;
- mai mult de două tipuri de documente;
- îmbunătățiri proprii de UX / arhitectură.

## Reguli Git

Fiecare candidat lucrează pe propriul branch.

Exemple:

```text
nume-prenume
stagiar-nume
```

Nu se lucrează direct pe `main` / `master`.

## Livrabile

- codul sursă pe branch-ul candidatului;
- `Explicatie.md` cu instrucțiuni de rulare;
- demonstrație funcțională: link, capturi sau video;
- minimum două acte-exemplu generate.

## Evaluare

În ordinea importanței:

1. corectitudinea tehnoredactării;
2. fluxul complet de la date la document final;
3. integrarea frontend + backend + bază de date;
4. calitatea codului;
5. experiența de utilizare;
6. bonusuri și inițiativă.

## Termen din brief

- termen: până pe data de **8**, inclusiv;
- timp de lucru: **5 zile calendaristice**.

## Proiect asociat

O implementare separată construită în jurul aceluiași tip de cerințe poate fi văzută în [**LegalAct Generator**](https://github.com/xondell/LegalAct-Generator).

---

<div align="center">

### Nu construi doar un formular. Construiește un generator de documente utilizabil.

</div>
