import { Injectable } from '@angular/core';
import { PdfGeneratorService } from './pdf-generator.service';

@Injectable({
  providedIn: 'root' // Providenciado em 'root' ou no TreinoModule
})
export class TreinoService {
  private planos = [
    {
      tipo: 'Mesomorfo',
      foco: 'Foco em manter a forma e a definição.',
      treino: 'Treino: Médio volume, foco no treino de força e cardio moderado.',
      dieta: 'Dieta: Calórico moderado, TCM para energia.'
    },
    {
      tipo: 'Endomorfo',
      foco: 'Foco em perder gordura.',
      treino: 'Treino: Alto volume, foco no aeróbico e treinos de circuito.',
      dieta: 'Dieta: Deficit calórico, restrição de carboidrato.'
    },
    {
      tipo: 'Ectomorfo',
      foco: 'Foco em ganhar massa e peso.',
      treino: 'Treino: Alto volume, foco hipertrofia com pesos pesados.',
      dieta: 'Dieta: Excedente calórico, alto carboidrato.'
    }
  ];

  constructor(private pdfGenerator: PdfGeneratorService) {}

  getPlanos() {
    return this.planos;
  }

  gerarPdfPlano(plano: any) {
    const content = [
      `Plano: ${plano.tipo}`,
      `Foco: ${plano.foco}`,
      ``,
      'DETALHES DO PLANO DE TREINO:',
      plano.treino,
      ``,
      'DETALHES DO PLANO DE DIETA:',
      plano.dieta,
      ``,
      'Este é um plano de treino gerado pelo Viva Fit. Consulte um profissional.'
    ];

    this.pdfGenerator.generateAndDownloadPdf(
      `Plano de Treino e Dieta - ${plano.tipo}`,
      content,
      `VivaFit_Plano_${plano.tipo}`
    );
  }
}
