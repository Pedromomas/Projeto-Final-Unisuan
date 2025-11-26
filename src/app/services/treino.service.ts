import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  private plans: any = {
    'Magreza': {
      treino: [
        '3x/semana: treino de força (foco em ganho de massa) - agachamento, supino, remada',
        'Exercícios complementares: bíceps, tríceps e core leves'
      ],
      dieta: [
        'Hipercalórica: +300 a +500 kcal/dia',
        'Proteína em todas as refeições (ex: ovos, frango), carboidratos integrais e gorduras saudáveis'
      ]
    },
    'Normal': {
      treino: [
        '3x/semana: manutenção — mistura de cardio e resistência (circuito 30-40 min)',
        '2x/semana: treino de força leve'
      ],
      dieta: [
        'Dieta equilibrada — manutenção calórica',
        'Macros balanceados: proteína, carboidrato e gordura'
      ]
    },
    'Sobrepeso': {
      treino: [
        '4x/semana: foco em emagrecimento — HIIT 2x + força 2x',
        'Cardio moderado (30-45 min) e treino de resistência'
      ],
      dieta: [
        'Hipocalórica: -300 a -500 kcal/dia',
        'Priorizar proteínas e reduzir carboidratos refinados'
      ]
    },
    'Obesidade I': { treino: [], dieta: [] },
    'Obesidade II': { treino: [], dieta: [] },
    'Obesidade III': { treino: [], dieta: [] }
  };

  getPlan(categoria: string) {
    return this.plans[categoria] || this.plans['Normal'];
  }
}
