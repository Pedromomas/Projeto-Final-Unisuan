import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonCard, IonCardContent, IonList, IonItem, IonLabel, IonCheckbox, 
  IonBadge, IonProgressBar, IonIcon, IonButton, ToastController, 
  IonSegment, IonSegmentButton, IonChip, IonRange
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { flame, restaurant, fastFood, water, cafe, moon, grid, statsChart, person, nutrition, checkmarkCircle, closeCircle, pizza, happy, sad, barChart } from 'ionicons/icons';

import { Auth } from '@angular/fire/auth';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dieta',
  templateUrl: './dieta.page.html',
  styleUrls: ['./dieta.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonCard, IonCardContent, IonList, IonItem, IonLabel, IonCheckbox, 
    IonBadge, IonProgressBar, IonIcon, IonButton, 
    IonSegment, IonSegmentButton, IonChip, IonRange
  ]
})
export class DietaPage implements OnInit {
  biotipo = '';
  metaCalorias = 2500; // Valor inicial padrão mais alto
  caloriasConsumidas = 0;
  proteinasConsumidas = 0;
  caloriasSimuladas = 0; 

  graficoPizzaStyle = '';

  etapa: 'config' | 'hoje' | 'lixo' = 'config';
  
  preferencias = {
    proteina: 'frango',
    carbo: 'arroz',
    vegetais: true,
    bebida: 'agua',
    doce: false,
    cafe: 'ovos'
  };

  cardapioDoDia: any[] = [];

  // BANCO DE DADOS COM PORÇÕES DE "GENTE GRANDE"
  alimentosDb: any = {
    cafeManha: {
      'ovos': { nome: 'Ovos Mexidos com Queijo', cal: 450, prot: 28, gramas: '3 ovos + 30g queijo' },
      'panqueca': { nome: 'Panqueca de Banana e Aveia', cal: 400, prot: 15, gramas: '2 unids médias' },
      'mingau': { nome: 'Mingau Proteico (Whey)', cal: 420, prot: 30, gramas: '1 bowl cheio' },
      'fruta': { nome: 'Salada de Frutas + Granola', cal: 350, prot: 8, gramas: '1 tigela grande' }
    },
    proteina: {
      // Baseado em ~150g a 200g cozido
      'frango': { nome: 'Peito de Frango Grelhado', cal: 320, prot: 60, gramas: '200g' },
      'carne': { nome: 'Patinho Moído/Iscas', cal: 400, prot: 55, gramas: '200g' },
      'ovo': { nome: 'Omelete (3 Ovos)', cal: 280, prot: 18, gramas: '3 unids' },
      'peixe': { nome: 'Filé de Tilápia/Peixe', cal: 250, prot: 50, gramas: '200g' }
    },
    carbo: {
      // Baseado em ~200g a 250g cozido (prato de pedreiro saudável)
      'arroz': { nome: 'Arroz Branco/Integral', cal: 260, prot: 5, gramas: '200g (4 colheres cheias)' },
      'batata': { nome: 'Batata Doce/Inglesa', cal: 200, prot: 3, gramas: '200g' },
      'macarrao': { nome: 'Macarrão Integral', cal: 300, prot: 10, gramas: '200g' },
      'pao': { nome: 'Pão (Sanduíche)', cal: 240, prot: 8, gramas: '2 fatias grandes' } 
    }
  };

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private toastCtrl: ToastController
  ) {
    addIcons({ flame, restaurant, fastFood, water, cafe, moon, grid, statsChart, person, nutrition, checkmarkCircle, closeCircle, pizza, happy, sad, barChart });
  }

  async ngOnInit() {
    const user = this.auth.currentUser;
    if (user) {
      await this.carregarBiotipo(user.uid);
      this.verificarResetDiario();
    }
  }

  async carregarBiotipo(uid: string) {
    const docSnap = await getDoc(doc(this.firestore, 'usuarios', uid));
    if (docSnap.exists()) {
      const data = docSnap.data();
      this.biotipo = data['biotipo'] || 'Mesomorfo';
      
      // METAS REAIS PARA QUEM TREINA
      if (this.biotipo === 'Ectomorfo') this.metaCalorias = 3200; // Bulking
      else if (this.biotipo === 'Endomorfo') this.metaCalorias = 2100; // Cutting saudável
      else this.metaCalorias = 2600; // Manutenção atlética

      this.calcularSimulacao(); 
    }
  }

  verificarResetDiario() {
    const hoje = new Date().toDateString();
    const ultimoAcesso = localStorage.getItem('ultima_data_dieta');

    if (ultimoAcesso !== hoje) {
      this.etapa = 'config';
      this.caloriasConsumidas = 0;
      this.proteinasConsumidas = 0;
      this.cardapioDoDia = [];
      localStorage.setItem('ultima_data_dieta', hoje);
    }
  }

  calcularSimulacao() {
    // Estimativa visual para o questionário
    const p = this.preferencias;
    const cafe = this.alimentosDb.cafeManha[p.cafe];
    const prot = this.alimentosDb.proteina[p.proteina];
    const carbo = this.alimentosDb.carbo[p.carbo];
    
    // Fatores de ajuste
    let fator = 1;
    if (this.biotipo === 'Ectomorfo') fator = 1.2; // Come mais
    if (this.biotipo === 'Endomorfo') fator = 0.9; // Come um pouco menos

    let total = 0;
    total += cafe.cal; 
    total += (prot.cal + carbo.cal) * 2; // Almoço e Jantar
    total += 400; // Lanche reforçado
    
    this.caloriasSimuladas = Math.round(total * fator);
  }

  selecionarOpcao(tipo: string, valor: string) {
    if (tipo === 'cafe') this.preferencias.cafe = valor;
    if (tipo === 'proteina') this.preferencias.proteina = valor;
    if (tipo === 'carbo') this.preferencias.carbo = valor;
    this.calcularSimulacao(); 
  }

  gerarCardapio() {
    this.cardapioDoDia = [];
    const p = this.preferencias;
    const alimentos = this.alimentosDb;

    // Fatores de quantidade baseados no biotipo
    let fatorQtd = 1;
    let descFator = '';

    if (this.biotipo === 'Ectomorfo') {
      fatorQtd = 1.3; // Aumenta 30% nas porções
      descFator = ' (Porção Grande)';
    } else if (this.biotipo === 'Endomorfo') {
      fatorQtd = 0.9; // Reduz 10% apenas (para não passar fome)
      descFator = ' (Porção Controlada)';
    } else {
      descFator = ' (Porção Média)';
    }

    const calc = (val: number) => Math.round(val * fatorQtd);

    // --- MONTAGEM DAS REFEIÇÕES ---
    const cafeEscolhido = alimentos.cafeManha[p.cafe];
    
    // Almoço e Jantar usam a base escolhida
    const almocoProt = alimentos.proteina[p.proteina];
    const almocoCarbo = alimentos.carbo[p.carbo];

    this.cardapioDoDia = [
      {
        nome: 'Café da Manhã', icone: 'cafe', horario: '07:00 - 09:00',
        opcoes: [
          { 
            item: cafeEscolhido.nome + (p.carbo === 'pao' && p.cafe === 'ovos' ? ' + Pão Extra' : ''), 
            cal: calc(cafeEscolhido.cal + 100), // +100kcal de margem (manteiga/azeite)
            gramas: cafeEscolhido.gramas,
            prot: calc(cafeEscolhido.prot), 
            checked: false 
          },
          { item: 'Café com Leite ou Suco', cal: 80, gramas: '200ml', prot: 4, checked: false }
        ]
      },
      {
        nome: 'Almoço Reforçado', icone: 'restaurant', horario: '12:00 - 13:30',
        opcoes: [
          { 
            item: `${almocoProt.nome} + ${almocoCarbo.nome}`, 
            cal: calc(almocoProt.cal + almocoCarbo.cal), 
            gramas: `${almocoProt.gramas} prot + ${almocoCarbo.gramas} carbo`,
            prot: calc(almocoProt.prot), 
            checked: false 
          },
          { 
            item: 'Feijão / Leguminosas', // Adicionei feijão fixo pois brasileiro come feijão!
            cal: calc(150), 
            gramas: '1 concha cheia', 
            prot: 8, 
            checked: false 
          },
          { item: p.vegetais ? 'Salada Colorida (Azeite)' : 'Legumes no Vapor', cal: 100, gramas: 'Livre', prot: 2, checked: false }
        ]
      },
      {
        nome: 'Lanche da Tarde', icone: 'fast-food', horario: '16:00 - 17:00',
        opcoes: [
          { 
            item: p.doce ? 'Mingau de Aveia + Chocolate 70%' : 'Sanduíche Natural de Frango', 
            cal: calc(350), 
            gramas: '1 porção média', 
            prot: 20, 
            checked: false 
          },
          { item: 'Fruta (Banana/Maçã)', cal: 80, gramas: '1 unid', prot: 1, checked: false }
        ]
      },
      {
        nome: 'Jantar', icone: 'moon', horario: '20:00 - 21:00',
        opcoes: [
          { 
            // Endomorfo reduz carbo à noite, outros mantêm
            item: this.biotipo === 'Endomorfo' ? `${almocoProt.nome} + Salada Completa + Azeite` : `O mesmo do almoço (Repeteco)`, 
            cal: this.biotipo === 'Endomorfo' ? calc(450) : calc(almocoProt.cal + almocoCarbo.cal + 100), 
            gramas: descFator,
            prot: 35, 
            checked: false 
          }
        ]
      }
    ];

    // Recalcula a meta para bater certinho com o cardápio gerado
    let totalDoPlano = 0;
    this.cardapioDoDia.forEach(ref => {
      ref.opcoes.forEach((op: any) => {
        totalDoPlano += op.cal;
      });
    });
    this.metaCalorias = totalDoPlano;

    this.etapa = 'hoje';
    this.atualizarCalorias(); 
    this.mostrarToast('Dieta montada! Hora de crescer 💪', 'success');
  }

  atualizarCalorias() {
    let cal = 0;
    let prot = 0;
    this.cardapioDoDia.forEach(ref => {
      ref.opcoes.forEach((op: any) => {
        if (op.checked) { cal += op.cal; prot += op.prot; }
      });
    });
    this.caloriasConsumidas = cal;
    this.proteinasConsumidas = prot;

    const meta = this.metaCalorias > 0 ? this.metaCalorias : 1;
    const porcentagem = (this.caloriasConsumidas / meta) * 100;
    
    this.graficoPizzaStyle = `conic-gradient(#2dd36f ${porcentagem}%, #f0f0f0 0)`;
  }

  ativarDiaDoLixo() {
    this.etapa = 'lixo';
  }

  voltarParaDieta() {
    this.etapa = 'hoje';
  }

  mudarOpcoes() {
    this.etapa = 'config';
    this.calcularSimulacao(); 
  }

  async mostrarToast(msg: string, color: string) {
    const t = await this.toastCtrl.create({ message: msg, duration: 2000, color: color });
    t.present();
  }
}