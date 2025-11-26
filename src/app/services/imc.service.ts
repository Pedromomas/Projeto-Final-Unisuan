import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImcService {

  constructor() { }

  calcularImc(peso: number, altura: number) {
    // Proteção se a altura vier zerada
    if (!altura || altura === 0) return null;

    // Se o usuário digitou em cm (ex: 175), converte para metros (1.75)
    if (altura > 3) {
      altura = altura / 100;
    }

    const imc = peso / (altura * altura);
    const imcFormatado = parseFloat(imc.toFixed(2));

    let classificacao = '';
    let categoria = ''; // Importante: usar minúsculas para as rotas funcionarem

    if (imc < 18.5) {
      classificacao = 'Abaixo do peso';
      categoria = 'magreza';
    } else if (imc < 24.9) {
      classificacao = 'Peso normal';
      categoria = 'normal';
    } else if (imc < 29.9) {
      classificacao = 'Sobrepeso';
      categoria = 'sobrepeso';
    } else {
      classificacao = 'Obesidade';
      categoria = 'obesidade';
    }

    // Retorna o objeto completo que a página espera
    return {
      valor: imcFormatado,
      classificacao: classificacao,
      categoria: categoria
    };
  }
}