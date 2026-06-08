import { generateContract, generateProcura } from '../src/lib/docGenerator';
import fs from 'fs';
import path from 'path';

async function main() {
  const dir = path.join(process.cwd(), 'exemple');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const contractBlob = await generateContract({
    partyA: 'SC IT Solutions SRL',
    partyB: 'Ion Popescu',
    subject: 'Dezvoltarea unei aplicații web complete full-stack pentru managementul resurselor.',
    amount: '15.000 RON',
    date: '10 Iunie 2026',
    location: 'București'
  });
  
  const contractArrayBuffer = await contractBlob.arrayBuffer();
  fs.writeFileSync(path.join(dir, 'Exemplu_Contract.docx'), Buffer.from(contractArrayBuffer));
  console.log('Generated Exemplu_Contract.docx');

  const procuraBlob = await generateProcura({
    principalName: 'Ion Ionescu',
    principalID: 'XR 441234',
    representativeName: 'SC Juridic SRL',
    representativeID: 'CUI 998877',
    powers: 'Să mă reprezinte în fața tuturor instanțelor judecătorești și să semneze toate documentele necesare în numele meu pentru vânzarea imobilului.',
    date: '10 Iunie 2026',
    location: 'Cluj-Napoca'
  });

  const procuraArrayBuffer = await procuraBlob.arrayBuffer();
  fs.writeFileSync(path.join(dir, 'Exemplu_Procura.docx'), Buffer.from(procuraArrayBuffer));
  console.log('Generated Exemplu_Procura.docx');
}

main().catch(console.error);
