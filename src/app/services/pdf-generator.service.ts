import { Injectable } from '@angular/core';
import jsPDF from 'jspdf'; // Importe após instalar: npm install jspdf

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {

  constructor() { }

  generateAndDownloadPdf(title: string, content: string[], fileName: string) {
    const doc = new jsPDF();
    const primaryColor = [63, 81, 181]; // #3F51B5
    const darkColor = [26, 35, 126]; // #1A237E
    
    // Título Principal
    doc.setFontSize(22);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(title, 14, 20);

    // Conteúdo
    doc.setFontSize(12);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    
    let y = 30;
    content.forEach(line => {
      // Verifica se a linha vai ultrapassar o limite da página
      if (y > 280) {
        doc.addPage();
        y = 10;
      }
      doc.text(line, 14, y);
      y += 7; // Espaçamento entre as linhas
    });

    doc.save(`${fileName}.pdf`);
  }
}