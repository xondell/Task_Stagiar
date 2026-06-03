# Task_Stagiar
Taskul de proba pentru stagiari, candidati la stagiu. 

# Sarcină de probă — Aplicație de tehnoredactare automată a actelor juridice

## Despre această sarcină

Aceasta este o sarcină de probă pentru candidații la stagiu. Scopul este să realizați o
aplicație care **tehnoredactează automat acte juridice conform normelor de redactare**:
utilizatorul alege tipul de act, introduce conținutul, iar la final primește **documentul
complet formatat** — gata de tipărit/depus, nu o simplă listă de pași.

### Reguli de organizare a lucrului

- Fiecare candidat **își face propriul proiect** într-un **branch separat, pe care îl creează
  manual** (de ex. `nume-prenume` sau `stagiar-nume`). Nu lucrați pe `main`/`master`.
- **Tehnologiile și condițiile le alegeți voi** — folosiți ce vă este comod și ce stăpâniți
  cel mai bine. Nu există stack impus.
- Proiectul trebuie să conțină **frontend**, **backend** și **bază de date**.
- **Aveți voie să adăugați idei proprii** dacă vă vin — funcționalități, îmbunătățiri,
  optimizări. Inițiativa este apreciată.

### Termen limită

- **Până pe data de 8** (inclusiv).
- Timp de lucru: **5 zile calendaristice**.

---

## Obiectiv

Realizați o aplicație care permite unui jurist să genereze acte juridice **tehnoredactate
corect, conform normelor de redactare**, pornind de la conținutul introdus. Rezultatul final
trebuie să fie **documentul complet formatat**, nu o descriere a pașilor.

## Fluxul de bază (obligatoriu)

1. **Selectarea tipului de act** dintr-o listă (minimum 2 tipuri — de exemplu: cerere de
   chemare în judecată, contract, procură, plângere, decizie, notificare).
2. **Introducerea conținutului** prin câmpuri structurate (părți, obiect, temei, conținut,
   dată, semnături) și/sau text liber.
3. **Generarea automată** a documentului complet tehnoredactat, în care toate regulile de
   formatare sunt aplicate automat.
4. **Export** într-un format utilizabil (`.docx` și/sau `.pdf`).

## Norme de tehnoredactare aplicate automat

Aplicația trebuie să respecte un set coerent de reguli (acesta este un baseline tipic —
aliniați-l la normele oficiale aplicabile):

- Format pagină **A4**, orientare portret.
- Margini standard (ex. sus/jos 2 cm, stânga 2,5–3 cm pentru îndosariere, dreapta 1,5 cm).
- Font uniform (ex. **Times New Roman**, 12 pt text / 14 pt titlu), bold doar la titluri.
- Interlinie 1,5; aliniere **justify** pentru corpul textului.
- Indentare prima linie a paragrafelor (ex. 1,25 cm).
- **Numerotare automată** a articolelor / punctelor / alineatelor.
- Antet/subsol unde e cazul, cu **numerotarea paginilor**.
- Bloc de semnătură, dată și loc poziționate corect.
- Diacritice corecte și spațiere uniformă.

**Esențial:** indiferent de tipul de act sau de textul introdus de utilizator, **documentul
rezultat trebuie să fie conform normelor**, în mod automat.

## Cerințe opționale / bonus

- **Editarea manuală a tehnoredactării** peste rezultatul automat (font, dimensiune,
  interlinie, margini, aliniere). Aceasta rămâne **opțională** — formatarea de bază trebuie să
  funcționeze automat.
- Șabloane reutilizabile și salvarea actelor în baza de date.
- Validări (câmpuri obligatorii lipsă, date invalide).
- Mai mult de 2 tipuri de acte.
- Previzualizare live a documentului.

## Livrabile

- Codul sursă pe **branch-ul propriu**, cu instrucțiuni de rulare (`Explicatie.md`).
- O demonstrație funcțională (link sau capturi/video).
- Cel puțin **2 acte-exemplu** generate și exportate.

## Criterii de evaluare

- Corectitudinea tehnoredactării față de norme (**cel mai important**).
- Funcționarea întregului flux: selectare tip → introducere text → document final.
- Prezența și integrarea corectă a celor trei componente: frontend, backend, bază de date.
- Calitatea codului și claritatea structurii.
- Experiența de utilizare.
- Implementarea elementelor opționale și a ideilor proprii (bonus).

---

*Succes! Pentru orice neclaritate, întrebați înainte de a începe implementarea.*
