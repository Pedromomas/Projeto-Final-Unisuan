import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  private plans: any = {
    'magreza': {
      treino: [
        '3x/semana: treino de força (foco em ganho de massa)',
        'Exercícios: agachamento, supino, remada',
        'Complementares: bíceps, tríceps e core leves'
      ],
      dieta: [
        'Hipercalórica: +300 a +500 kcal/dia',
        'Proteína em todas as refeições',
        'Carboidratos integrais e gorduras saudáveis'
      ]
    },
    'normal': {
      treino: [
        '3x/semana: Manutenção (circuito 30-40 min)',
        '2x/semana: Treino de força leve',
        'Mistura de cardio e resistência'
      ],
      dieta: [
        'Dieta equilibrada (manutenção calórica)',
        'Macros balanceados: proteína, carbo e gordura'
      ]
    },
    'sobrepeso': {
      treino: [
        '4x/semana: Foco em emagrecimento (HIIT)',
        'Cardio moderado (30-45 min)',
        'Treino de resistência'
      ],
      dieta: [
        'Hipocalórica: -300 a -500 kcal/dia',
        'Priorizar proteínas',
        'Reduzir carboidratos refinados'
      ]
    },
    'obesidade': {
      treino: [
        'Caminhada leve (30 min)',
        'Hidroginástica ou Bike',
        'Baixo impacto nas articulações'
      ],
      dieta: [
        'Reeducação alimentar',
        'Foco em alimentos naturais',
        'Evitar ultraprocessados'
      ]
    }
  };

  constructor() { }

  getPlan(categoria: string) {
    // Garante que busca em minúsculo, e se não achar, devolve o 'normal'
    const cat = categoria ? categoria.toLowerCase() : 'normal';
    
    // Se a categoria for obesidade I, II ou III, joga tudo para 'obesidade'
    if (cat.includes('obesidade')) {
        return this.plans['obesidade'];
    }

    return this.plans[cat] || this.plans['normal'];
  }
}