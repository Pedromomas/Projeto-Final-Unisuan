import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
// Importamos o PlansService
import { PlansService } from '../../services/plans.service';

@Component({
  selector: 'app-treino',
  templateUrl: './treino.page.html',
  styleUrls: ['./treino.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class TreinoPage implements OnInit {
  treino: string[] = [];
  categoria: string = '';

  constructor(
    private route: ActivatedRoute,
    private plansService: PlansService
  ) {}

  ngOnInit() {
    // AQUI ESTÁ A CORREÇÃO: Adicionei ": any" para parar o erro vermelho
    this.route.queryParams.subscribe((params: any) => {
      this.categoria = params['categoria'];
      
      const planoCompleto = this.plansService.getPlan(this.categoria);
      
      if (planoCompleto && planoCompleto.treino) {
        this.treino = planoCompleto.treino;
      }
    });
  }
}