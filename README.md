<div align="center">

# ⚖️ Task Stagiar

### Probă tehnică — aplicație pentru tehnoredactarea automată a actelor juridice

Un challenge full-stack pentru candidații la stagiu: construiește o aplicație care transformă datele introduse de utilizator într-un **act juridic complet formatat și exportabil**.

</div>

---

## 🎯 Obiectiv

Construiește o aplicație în care un jurist poate:

```text
alege tipul actului
        ↓
introduce conținutul
        ↓
genera documentul
        ↓
descărca rezultatul final
```

Rezultatul trebuie să fie un **document real, tehnoredactat**, gata de utilizare — nu o listă de instrucțiuni despre cum ar trebui formatat.

## 🧩 Cerințe obligatorii

### 1. Selectarea tipului de act

Minimum **2 tipuri** de documente, de exemplu:

- cerere de chemare în judecată;
- contract;
- procură;
- plângere;
- decizie;
- notificare.

### 2. Introducerea datelor

Poți folosi:

- câmpuri structurate;
- text liber;
- sau o combinație între cele două.

Date tipice:

```text
părți · obiect · temei · conținut · dată · semnături
```

### 3. Generarea automată

Aplicația trebuie să aplice singură regulile de tehnoredactare și să producă documentul final.

### 4. Export

Cel puțin unul dintre formatele:

- `.docx`
- `.pdf`

## 📐 Baseline de tehnoredactare

Documentul generat trebuie să respecte un set coerent de reguli:

| Element | Cerință |
|---|---|
| Pagină | A4, portret |
| Margini | ~2 cm sus/jos, 2.5–3 cm stânga, ~1.5 cm dreapta |
| Font | Times New Roman sau echivalent coerent |
| Corp | ~12 pt |
| Titlu | ~14 pt |
| Aliniere | `justify` pentru corp |
| Interlinie | 1.5 |
| Paragrafe | indentare coerentă |
| Structură | numerotare automată unde este cazul |
| Footer | numerotarea paginilor |
| Final | dată, loc și bloc de semnătură |

> **Criteriul principal:** indiferent de conținut, rezultatul trebuie să fie formatat automat și consecvent.

## 🏗 Cerințe tehnice

Proiectul trebuie să conțină:

- **frontend**
- **backend**
- **bază de date**

Stack-ul tehnologic este la alegerea candidatului.

## 🌟 Bonus

Implementările suplimentare sunt apreciate:

- preview live;
- validări;
- șabloane reutilizabile;
- salvarea actelor în baza de date;
- editarea manuală a formatării;
- mai mult de două tipuri de documente;
- optimizări proprii de UX sau arhitectură.

## 🌿 Reguli Git

Fiecare candidat lucrează pe **propriul branch**, creat manual.

Exemple:

```text
nume-prenume
stagiar-nume
```

Nu se lucrează direct pe `main` / `master`.

## 📦 Livrabile

- codul sursă pe branch-ul candidatului;
- `Explicatie.md` cu instrucțiuni de rulare;
- demonstrație funcțională: link, capturi sau video;
- minimum **2 acte-exemplu** generate și exportate.

## 🧪 Criterii de evaluare

În ordinea importanței:

1. **Corectitudinea tehnoredactării**
2. Fluxul complet: tip → conținut → document final
3. Integrarea frontend + backend + bază de date
4. Calitatea și structura codului
5. Experiența de utilizare
6. Bonusurile și inițiativa proprie

## ⏱ Termen

Conform brief-ului proiectului:

- termen: **până pe data de 8, inclusiv**;
- timp de lucru: **5 zile calendaristice**.

---

<div align="center">

### Nu construi doar un formular. Construiește un generator de documente utilizabil.

**Succes!**

</div>
