import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { ImcService } from '../../services/imc.service';

@Component({
  selector: 'app-imc',
  templateUrl: './imc.page.html',
  styleUrls: ['./imc.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ImcPage {
  altura!: number;
  peso!: number;
  resultado: any = null;

  constructor(private imcService: ImcService, private router: Router) {}

  calcularIMC() {
    if (!this.altura || !this.peso) {
      alert('Preencha altura e peso corretamente.');
      return;
    }
    this.resultado = this.imcService.calcularImc(this.peso, this.altura);
  }

  verTreino() {
    if (!this.resultado) return;
    this.router.navigate(['/treino'], { queryParams: { categoria: this.resultado.categoria } });
  }

  verDieta() {
    if (!this.resultado) return;
    this.router.navigate(['/dieta'], { queryParams: { categoria: this.resultado.categoria } });
  }
}