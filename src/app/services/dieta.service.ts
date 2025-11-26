import { Injectable } from '@angular/core';
import { PdfGeneratorService } from './pdf-generator.service';

interface Dica {
  nome: string;
  icone: string;
  subtitulo: string;
  detalhes: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DietaService {
  private dicas: Dica[] = [
    {
      nome: 'Alimentação',
      icone: 'apple',
      subtitulo: 'Priorize alimentos integrais',
      detalhes: [
        'Consuma frutas, vegetais e grãos integrais diariamente.',
        'Reduza o consumo de açúcares e alimentos processados.',
        'Use a API de Nutrição para verificar informações de novos alimentos.'
      ]
    },
    {
      nome: 'Sono',
      icone: 'moon',
      subtitulo: 'Durma 7-9 horas por noite',
      detalhes: [
        'O sono adequado é crucial para a recuperação muscular e controle hormonal.',
        'Estabeleça uma rotina de sono e evite telas antes de dormir.',
        'Tente dormir e acordar nos mesmos horários, inclusive nos fins de semana.'
      ]
    },
    {
      nome: 'Hidratação',
      icone: 'water',
      subtitulo: 'Beba 2L de água por dia',
      detalhes: [
        'A água é essencial para o metabolismo e a digestão.',
        'Mantenha uma garrafa de água por perto para monitorar a ingestão.',
        'Aumente a ingestão em dias de treino intenso.'
      ]
    },
    {
      nome: 'Controle',
      icone: 'scale',
      subtitulo: 'Monitore seu progresso',
      detalhes: [
        'Use o cálculo de IMC regularmente para acompanhar sua evolução.',
        'Registre seus treinos e refeições para identificar padrões.',
        'Metas claras ajudam a manter a motivação.'
      ]
    }
  ];

  constructor(private pdfGenerator: PdfGeneratorService) {}

  getDicas(): Dica[] {
    return this.dicas;
  }

  gerarPdfDicas() {
    const content: string[] = [
      'GUIA COMPLETO DE HÁBITOS SAUDÁVEIS VIVAFIT',
      '---'
    ];

    this.dicas.forEach(dica => {
      content.push(`\n${dica.nome.toUpperCase()}: ${dica.subtitulo}`);
      content.push(...dica.detalhes.map(detalhe => `• ${detalhe}`));
    });

    content.push('\nAVISO: As dicas de nutrição e hábitos são sugestivas e não substituem o acompanhamento de um profissional.');

    this.pdfGenerator.generateAndDownloadPdf(
      'VivaFit - Dicas de Saúde e Hábitos',
      content,
      'VivaFit_Dicas_Habitos'
    );
  }
}