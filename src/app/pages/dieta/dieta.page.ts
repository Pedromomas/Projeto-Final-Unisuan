import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DietaService } from '../../services/dieta.service';

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.page.html',
  styleUrls: ['./dieta.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DietaPage implements OnInit {
  dicas: any[] = [];

  constructor(private dietaService: DietaService) {}

  ngOnInit() {
    this.dicas = this.dietaService.getDicas();
  }

  downloadPdf() {
    this.dietaService.gerarPdfDicas();
  }
}