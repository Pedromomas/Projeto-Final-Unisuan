import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
// IMPORTANTE: Adicionei 'nutrition' aqui para o ícone da dieta funcionar
import { chevronForward, grid, statsChart, person, nutrition } from 'ionicons/icons';
import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [CommonModule, RouterLink, IonContent, IonIcon]
})
export class HomePage implements OnInit {
  userData: any = {};
  biotipo = 'Carregando...'; 
  
  mesAtual: string = '';
  diasCalendario: any[] = [];

  constructor(private auth: Auth, private firestore: Firestore, private router: Router) {
    // Registra todos os ícones usados no HTML
    addIcons({ chevronForward, grid, statsChart, person, nutrition });
  }

  ngOnInit() {
    this.gerarCalendario(); // Adicionado o 'this.'
  }

  // Atualiza os dados sempre que a tela aparece
  ionViewWillEnter() {
    const user = this.auth.currentUser;
    if (user) {
      this.carregarDados(user.uid); // Adicionado o 'this.'
    }
  }

  gerarCalendario() {
    const hoje = new Date();
    const opcoesMes: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    this.mesAtual = hoje.toLocaleDateString('pt-BR', opcoesMes).toUpperCase().replace(' DE ', ' '); 

    const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    for (let i = -2; i <= 3; i++) {
      const data = new Date();
      data.setDate(hoje.getDate() + i);
      this.diasCalendario.push({
        dia: data.getDate(),
        semana: diasSemana[data.getDay()],
        isHoje: i === 0 
      });
    }
  }

  async carregarDados(uid: string) {
    try {
      const docSnap = await getDoc(doc(this.firestore, 'usuarios', uid));
      if (docSnap.exists()) {
        this.userData = docSnap.data();
        
        if (this.userData.biotipo) {
          this.biotipo = this.userData.biotipo;
        } else if (this.userData.peso && this.userData.altura) {
          // Fallback: calcula se não tiver salvo
          const imc = this.userData.peso / (this.userData.altura * this.userData.altura);
          if (imc < 18.5) this.biotipo = 'Ectomorfo';
          else if (imc < 25) this.biotipo = 'Mesomorfo';
          else this.biotipo = 'Endomorfo';
        } else {
          this.biotipo = 'Indefinido';
        }
        
        console.log('Dados atualizados na Home:', this.biotipo);
      }
    } catch (e) {
      console.error('Erro ao carregar dados:', e);
    }
  }

  abrirTreino(tipo: string) {
    this.router.navigate(['/treino-detalhe', tipo, this.biotipo]);
  }
}